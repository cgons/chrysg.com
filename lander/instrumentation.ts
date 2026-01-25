import logger from "./lib/logger";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    logger.info("Loading Environment Variables...");
    logger.info(
      `NEXT_PUBLIC_TURNSTILE_SITE_KEY: ${process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}`,
    );
    logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
    logger.info(`MAIL_HOST: ${process.env.MAIL_HOST}`);
  }
}
