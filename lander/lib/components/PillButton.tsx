import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const ButtonVariants = cva(
  "inline-block bg-zinc-200 font-semibold rounded-full hover:bg-zinc-300",
  {
    variants: {
      size: {
        large: "btn-lg",
        medium: "btn-md",
      },
    },
  },
);

type ButtonProps = VariantProps<typeof ButtonVariants> &
  React.HTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  };

export default function PillButton({ children, size, className }: ButtonProps) {
  return (
    <button className={ButtonVariants({ size, className })}>{children}</button>
  );
}
