import clsx from "clsx";
import { HTMLAttributes } from "react";

import $ from "./material-symbol.module.css";

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
    <span className={clsx(`material-symbols-${type}`, $["mat-symbol"], className)} style={inheritedSize ? { fontSize: "inherit" } : undefined} {...restProps}>
      {name || children}
    </span>
  );
}
