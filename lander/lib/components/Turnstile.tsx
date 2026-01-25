"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile: Turnstile.Turnstile;
  }
}

const ELEMENT_ID = "cf-turnstile-comp";

export default function Turnstile() {
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
