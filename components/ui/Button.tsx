import type { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "outline";
  size?: "sm" | "md";
};

export default function Button({ variant = "primary", size = "md", className = "", ...rest }: Props) {
  const sizing = size === "sm" ? "px-3 py-1.5 text-sm" : "px-5 py-2.5 text-sm";
  return (
    <button
      type="button"
      className={`btn-${variant} inline-flex items-center justify-center gap-2 rounded-(--radius-sm) font-semibold cursor-pointer ${sizing} ${className}`}
      {...rest}
    />
  );
}
