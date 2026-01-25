"use client";

import TertiaryButton from "@/lib/components/TertiaryButton";
import { delay } from "@/lib/utils";
import React, { useState } from "react";

export default function CopyButton({
  copyText,
}: {
  copyText: string;
}): React.ReactNode {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    await delay(2000);
    setCopied(false);
  };

  return (
    <TertiaryButton
      contentText={(copied && "Copied") || "Copy Email Address"}
      iconName={(copied && "check_circle") || "content_copy"}
      onClick={onClick}
      className="min-w-[164px]"
    />
  );
}
