import React from "react";

export default function MatIcon({
  iconName,
  className,
}: {
  iconName: string;
} & React.HTMLProps<HTMLSpanElement>): React.ReactElement {
  return (
    <span className={"material-symbols-outlined relative " + className}>
      {iconName}
    </span>
  );
}
