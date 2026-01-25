import Fetch from "@/lib/fetch";
import logger from "@/lib/logger";

export default class CloudflareTurnstile {
  readonly VERIFY_URL =
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  async verifyToken(token: string): Promise<boolean> {
    const resp = await Fetch.POST(this.VERIFY_URL, {
      response: token,
      secret: process.env.TURNSTILE_SECRET,
    });

    // If we get a 200 response, then the token is valid...
    if (resp.status === 200) {
      return true;
    }

    // Log verification error messages if we get a non-200 response...
    const respPayload = await resp.json();
    logger.warn(respPayload["error-codes"]);
    return false;
  }
}
