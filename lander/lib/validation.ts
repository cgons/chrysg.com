import { constants as httpstatus } from "node:http2";

import { ZodObject } from "zod";

import logger from "@/lib/logger";

export interface Result<T> {
  success: boolean;
  data?: T;
  errorResponse?: Response;
}

const BAD_REQUEST_MESSAGE = "Request body (JSON) was empty or malformed.";
const INTERNAL_ERROR_MESSAGE = "Internal error occurred.";
const PAYLOAD_VALIDATION_FAILED_MESSAGE = "Payload validation failed.";

/**
 * Parses the request body as JSON and validates it against a Zod schema.
 *
 * @param request - The incoming Request object.
 * @param schema - The Zod schema to validate the payload against.
 * @returns An object containing either the validated payload or an error Response.
 */
export async function parseAndValidateRequestPayload<T>(
  request: Request,
  schema: ZodObject,
): Promise<Result<T>> {
  try {
    // 1. Parse the JSON payload
    const payload = await request.json();

    // 2. Validate the payload
    const result = schema.safeParse(payload);

    // 3. Handle Validation Error
    if (!result.success) {
      logger.warn(PAYLOAD_VALIDATION_FAILED_MESSAGE);
      return {
        success: false,
        errorResponse: _errorResponse(
          PAYLOAD_VALIDATION_FAILED_MESSAGE,
          httpstatus.HTTP_STATUS_BAD_REQUEST,
          result.error.issues, // Expose Zod issues for better client debugging
        ),
      };
    }

    // 4. Success
    return { success: true, data: result.data as T };
  } catch (error: unknown) {
    // 5. Handle JSON Parsing Error (e.g., empty body, malformed JSON)
    if (error instanceof SyntaxError) {
      logger.warn(`${BAD_REQUEST_MESSAGE} ${error.message}`);
      return {
        success: false,
        errorResponse: _errorResponse(
          BAD_REQUEST_MESSAGE,
          httpstatus.HTTP_STATUS_BAD_REQUEST,
        ),
      };
    }

    // 6. Handle other unexpected errors
    logger.error(`${INTERNAL_ERROR_MESSAGE} ${error}`);
    return {
      success: false,
      errorResponse: _errorResponse(INTERNAL_ERROR_MESSAGE),
    };
  }
}

function _errorResponse(
  message: string,
  statusCode: number = httpstatus.HTTP_STATUS_INTERNAL_SERVER_ERROR,
  extra: object = {},
): Response {
  return new Response(JSON.stringify({ error: message, extra: extra }), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}
