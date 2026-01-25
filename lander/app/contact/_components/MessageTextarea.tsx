"use client";

import { useState } from "react";

export default function MessageTextarea() {
  const [messageAreaSize, setMessageAreaSize] = useState<number>(4);
  const [messageExpanded, setMessageExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setMessageAreaSize(8);
    setMessageExpanded(true);
  };

  return (
    <div>
      <p className="mb-1.5 flex items-end justify-between px-1.5 text-sm">
        <span>
          Your Message
          <span className="text-secondary pl-1 text-xs">(required)</span>
        </span>
        {!messageExpanded && (
          <button
            className="text-dim hover:text-primary text-xs"
            onClick={handleExpandClick}
          >
            Expand{" "}
            <span className="material-symbols-outlined relative top-1 text-[19px]!">
              keyboard_arrow_down
            </span>
          </button>
        )}
      </p>
      <textarea
        rows={messageAreaSize}
        name="message"
        required
        className="border-bprimary text-primary block w-full rounded-lg border p-2.5 text-sm focus:ring-2 focus:ring-zinc-300 focus:outline-none"
      ></textarea>
    </div>
  );
}
