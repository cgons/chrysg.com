"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile: Turnstile.Turnstile;
  }
}

const ELEMENT_ID = "cf-turnstile-comp";

interface TurnstileProps {
  onVerify?: (token: string) => void;
  onError?: (errorCode?: string) => void;
  onExpire?: () => void;
  onUnsupported?: () => void;
}

export default function Turnstile({
  onVerify,
  onError,
  onExpire,
  onUnsupported,
}: TurnstileProps) {
  const turnstileRef = useRef(null);

  function renderTurnstile() {
    if (turnstileRef.current) {
      // Since the Turnstile is rendered within a container, we check to see if the container has any child nodes...
      const isTurnstileRendered = document
        .querySelector("#" + ELEMENT_ID)
        ?.hasChildNodes();

      // Only render the Turnstile if it doesn't already exist.
      if (!isTurnstileRendered) {
        window.turnstile.render("#" + ELEMENT_ID, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
          theme: "light",
          callback: (token: string) => onVerify?.(token),
          "error-callback": (errorCode?: string) => onError?.(errorCode),
          "expired-callback": () => onExpire?.(),
          "unsupported-callback": () => onUnsupported?.(),
        });
      }
    }
  }

  function handleScriptLoad() {
    renderTurnstile();
  }

  useEffect(() => {
    if (turnstileRef.current && window.turnstile) renderTurnstile();
  });

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        key="cf-turnstile-script"
        onLoad={handleScriptLoad}
      />
      <div ref={turnstileRef} id={ELEMENT_ID} />
    </>
  );
}
