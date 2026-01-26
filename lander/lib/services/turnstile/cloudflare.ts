import Fetch from "@/lib/fetch";
import logger from "@/lib/logger";

interface TurnstileVerifyResponse {
  success?: boolean;
  "error-codes"?: string[];
}

export default class CloudflareTurnstile {
  readonly VERIFY_URL =
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  async verifyToken(token: string): Promise<boolean> {
    const resp = await Fetch.POST(this.VERIFY_URL, {
      response: token,
      secret: process.env.TURNSTILE_SECRET,
    });

    let respPayload: TurnstileVerifyResponse | null = null;
    try {
      respPayload = await resp.json();
    } catch {
      logger.warn("Turnstile verify response was not JSON");
      return false;
    }

    if (resp.ok && respPayload?.success === true) {
      return true;
    }

    logger.warn(
      `Turnstile verification failed: ${respPayload?.["error-codes"]}`,
    );
    return false;
  }
}
