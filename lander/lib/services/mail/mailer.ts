import { EmailDetails } from "@/app/api/mail/types";
import logger from "@/lib/logger";
import { SMTPMailAdapter } from "@/lib/services/mail/adapters/smtp";
import * as utils from "@/lib/utils";

const EMAIL_SUBJECT = "chrysg.com - Email Form Submission";

export class Mailer {
  public static async sendMail(emailDetails: EmailDetails): Promise<void> {
    await SMTPMailAdapter.send(
      EMAIL_SUBJECT,
      this.formatMailMessage(emailDetails),
    );
    logger.info(`Email Sent Successfully -- Sender: ${emailDetails.email}`);
  }

  private static formatMailMessage(emailDetails: EmailDetails): string {
    return `
Date: ${utils.getCurrentDateTimeAsLocaleString()}
From: ${emailDetails.email}
Name: ${emailDetails.name}
---

${emailDetails.message}
    `;
  }
}
