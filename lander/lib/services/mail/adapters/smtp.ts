import * as nodemailer from "nodemailer";

import logger from "@/lib/logger";

export class SMTPMailAdapter {
  public static async send(subject: string, message: string): Promise<void> {
    // --- Configuration Variables ---
    const MAIL_HOST = process.env.MAIL_HOST;
    const MAIL_USER = process.env.MAIL_USER;
    const MAIL_PASS = process.env.MAIL_PASS;

    const MAIL_FROM = process.env.MAIL_FROM;
    const MAIL_TO = process.env.MAIL_TO;

    // Basic validation to ensure environment variables are present
    if (!MAIL_HOST || !MAIL_USER || !MAIL_PASS || !MAIL_FROM || !MAIL_TO) {
      logger.error(
        "ERROR: Mail (SMTP) environment variables are not fully configured.",
      );
      throw new Error(
        "Missing Mail SMTP configuration. Check .env.production file.",
      );
    }

    // 1. Create Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: 587,
      secure: false, // Using TLS (STARTTLS), so secure is false
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
      requireTLS: true,
      // Optionally, enable logging for debugging:
      // logger: true,
    });

    // 2. Define Mail Options
    const mailOptions = {
      from: MAIL_FROM, // Note: This email MUST be verified in SES
      to: MAIL_TO,
      subject: subject,
      text: message,
    };

    // 3. Send Email
    logger.info("Attempting to send email");
    try {
      const resp = await transporter.sendMail(mailOptions);
      logger.info(`Message ID: ${resp.messageId}`);
    } catch (error) {
      logger.error(`Error sending email - ${error}`);
      throw new Error("Failed to send email.", error as Error);
    }
  }
}
