import clsx from "clsx";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  type?: "outlined" | "rounded" | "sharp";
  name?: string;
  inheritedSize?: boolean;
}

export default function MaterialSymbol({
  className,
  type = "rounded",
  name,
  children,
  inheritedSize = false,
  ...restProps
}: Props) {
  return (
    <span className={clsx(`material-symbols-${type}`, className)} style={inheritedSize ? { fontSize: "inherit" } : undefined} {...restProps}>
      {name || children}
    </span>
  );
}
