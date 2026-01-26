"use client";

import PrimaryButton from "@/lib/components/PrimaryButton";
import Turnstile from "@/lib/components/Turnstile";
import React, { useState } from "react";

import MessageTextarea from "../MessageTextarea";
import EmailFailedContent from "./content/EmailFailedContent";
import EmailPendingContent from "./content/EmailPendingContent";
import EmailSentContent from "./content/EmailSentContent";
import { FormFieldErrors } from "./types";

export default function EmailForm() {
  enum EmailFormStatus {
    ENTRY = 1, // default state - empty form
    SENT,
    PENDING,
    FAILED,
  }

  const [emailFormStatus, setEmailFormStatus] = useState(EmailFormStatus.ENTRY);
  const [emailFormErrors, setEmailFormErrors] = useState<FormFieldErrors>({});
  const [isTurnstileFailed, setIsTurnstileFailed] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailFormStatus(EmailFormStatus.PENDING);

    const formData = new FormData(e.target as HTMLFormElement);

    storeFormState(formData);

    try {
      const payload = JSON.stringify(Object.fromEntries(formData.entries()));
      const resp = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: payload,
      });
      if (resp.status === 204) {
        setEmailFormStatus(EmailFormStatus.SENT);
        clearFormSate();
      } else {
        setEmailFormStatus(EmailFormStatus.FAILED);
        const respPayload = await resp.json();
        setEmailFormErrors(respPayload["field_errors"]);
      }
    } catch (e) {
      setEmailFormStatus(EmailFormStatus.FAILED);
      console.error(e);
    }
  }

  function handleReturnToForm(restoreForm: boolean = false) {
    setEmailFormStatus(EmailFormStatus.ENTRY);

    if (restoreForm) {
      setTimeout(() => restoreFormState(), 150);
    }
  }

  function storeFormState(formData: FormData) {
    for (const [k, v] of formData.entries()) {
      if (k !== "cf-turnstile-response") {
        sessionStorage.setItem(k, v as string);
      }
    }
  }

  function restoreFormState() {
    const nameInput = document.querySelector(
      "#contact-form input[name='name']",
    ) as HTMLInputElement;
    const emailInput = document.querySelector(
      "#contact-form input[name='email']",
    ) as HTMLInputElement;
    const messageTextArea = document.querySelector(
      "#contact-form textarea[name='message']",
    ) as HTMLTextAreaElement;

    nameInput.value = sessionStorage.getItem("name") || "";
    emailInput.value = sessionStorage.getItem("email") || "";
    messageTextArea.value = sessionStorage.getItem("message") || "";
  }

  function clearFormSate() {
    sessionStorage.clear();
  }

  function renderEmailForm() {
    return (
      <form
        id="contact-form"
        method="POST"
        className="font-medium"
        onSubmit={handleSubmit}
      >
        <div>
          <p className="mb-1.5 flex justify-between px-1.5 text-sm">
            <label htmlFor="name">
              Your Name
              <span className="text-secondary pl-1 text-xs">(required)</span>
            </label>
          </p>
          <input
            type="text"
            name="name"
            required
            placeholder="John Doe"
            className="border-bprimary text-primary block w-full rounded-lg border p-2.5 text-sm focus:ring-2 focus:ring-zinc-300 focus:outline-none"
          />
        </div>

        <div className="h-5"></div>

        <div>
          <p className="mb-1.5 flex justify-between px-1.5 text-sm">
            <label htmlFor="email">
              Your Email
              <span className="text-secondary pl-1 text-xs">(required)</span>
            </label>
          </p>
          <input
            type="email"
            name="email"
            required
            placeholder="johndoe@example.com"
            className="border-bprimary text-primary block w-full rounded-lg border p-2.5 text-sm focus:ring-2 focus:ring-zinc-300 focus:outline-none"
          />
        </div>

        <div className="h-5"></div>
        <MessageTextarea />
        <div className="h-5"></div>

        <div className="text-center md:flex md:justify-between">
          <div className="mb-3">
            <Turnstile
              onVerify={() => setIsTurnstileFailed(false)}
              onError={() => setIsTurnstileFailed(true)}
              onExpire={() => setIsTurnstileFailed(true)}
              onUnsupported={() => setIsTurnstileFailed(true)}
            />
          </div>

          <div className="md:text-right">
            <p className="mb-3">
              <PrimaryButton
                contentText="Send Email"
                iconName="send"
                className="px-8"
                disabled={isTurnstileFailed}
              />
            </p>

            <p className="text-secondary text-xs italic">
              Note: Emails are sent via{" "}
              <a
                href="https://aws.amazon.com/ses/"
                target="_blank"
                className="primary-link"
              >
                Amazon SES
              </a>
            </p>
          </div>
        </div>
      </form>
    );
  }

  return (
    <>
      {/* Display horizontal border/line separator */}
      <div className="relative flex items-center py-5">
        <div className="border-bprimary grow border-t"></div>
        <span className="text-dim shrink text-xl font-extrabold">
          {emailFormStatus == EmailFormStatus.ENTRY ? (
            <span className="mx-4">OR</span>
          ) : (
            ""
          )}
        </span>
        <div className="border-bprimary grow border-t"></div>
      </div>
      {emailFormStatus === EmailFormStatus.ENTRY && renderEmailForm()}
      {emailFormStatus === EmailFormStatus.PENDING && <EmailPendingContent />}
      {emailFormStatus === EmailFormStatus.SENT && <EmailSentContent />}
      {emailFormStatus === EmailFormStatus.FAILED && (
        <EmailFailedContent
          handleReturnToForm={handleReturnToForm}
          formErrors={emailFormErrors}
        />
      )}
    </>
  );
}
