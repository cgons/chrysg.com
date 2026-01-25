"use client";

import React from "react";

import MatIcon from "./MatIcon";

export default function TertiaryButton({
  contentText,
  iconName,
  onClick,
  className,
}: {
  contentText: string;
  iconName: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & React.HTMLProps<HTMLButtonElement>): React.ReactElement<HTMLButtonElement> {
  return (
    <button
      className={
        className +
        " cursor-pointer rounded-md border border-zinc-300 px-3 pt-0.5 pb-1.5 text-xs font-semibold hover:bg-zinc-100"
      }
      onClick={onClick}
    >
      <MatIcon iconName={iconName} className="top-[4px] pr-0.75 text-[18px]!" />
      {contentText}
    </button>
  );
}
