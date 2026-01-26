import { constants as httpstatus } from "node:http2";

import { NextResponse } from "next/server";

import { EmailDetails, EmailDetailsSchema } from "@/app/api/mail/types";
import logger from "@/lib/logger";
import { Mailer } from "@/lib/services/mail/mailer";
import CloudflareTurnstile from "@/lib/services/turnstile/cloudflare";
import { parseAndValidateRequestPayload } from "@/lib/validation";

export async function POST(request: Request): Promise<NextResponse> {
  const result = await parseAndValidateRequestPayload<EmailDetails>(
    request,
    EmailDetailsSchema,
  );

  if (result.success && result.data) {
    const emailDetails = result.data;

    // 1. Verify Turnstile
    const turnstile = new CloudflareTurnstile();
    const isTokenValid = await turnstile.verifyToken(
      emailDetails["cf-turnstile-response"],
    );

    if (!isTokenValid) {
      logger.warn("Turnstile verification failed.");
      return NextResponse.json(
        {
          field_errors: {
            turnstile: "Could not verify you are human. Please try again.",
          },
        },
        { status: httpstatus.HTTP_STATUS_FORBIDDEN },
      );
    }

    // 2. Send Email
    try {
      await Mailer.sendMail(emailDetails);
      return new NextResponse(null, {
        status: httpstatus.HTTP_STATUS_NO_CONTENT,
      });
    } catch (error) {
      logger.error("Unable to send email.");
      logger.error(error);
    } // Server error will be returned below
  } else if (result.errorResponse) {
    // Since we have an error response, there was an error parsing the request payload...
    const errorPayload = await result.errorResponse.json();
    return NextResponse.json(errorPayload, {
      status: result.errorResponse.status,
    });
  }

  return new NextResponse(null, {
    status: httpstatus.HTTP_STATUS_INTERNAL_SERVER_ERROR,
  });
}
