import React from "react";

import MatIcon from "./MatIcon";

export default function PrimaryButton({
  contentText,
  iconName,
  onClick,
  className,
  disabled,
}: {
  contentText: string;
  iconName: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & React.HTMLProps<HTMLButtonElement>): React.ReactElement<HTMLButtonElement> {
  return (
    <button
      className={
        className +
        " bg-primary cursor-pointer rounded-md px-3 pt-1.5 pb-2 text-[15px] font-semibold text-white" +
        " disabled:bg-dim enabled:hover:bg-zinc-700 disabled:cursor-not-allowed"
      }
      onClick={onClick}
      disabled={disabled}
    >
      {contentText}
      <MatIcon iconName={iconName} className="top-[4px] pl-1 text-[20px]!" />
    </button>
  );
}
