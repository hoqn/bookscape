import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import $ from "./safearea.module.css";

interface Props extends BaseProps, ComponentPropsWithoutRef<"div"> {
  hasHeader?: boolean;
  hasNavigation?: boolean;
}

export default function SafeArea({ className, hasHeader, hasNavigation, children, ...restProps }: Props) {
  return (
    <div
      className={clsx(
        $["safearea"],
        hasHeader && $["safearea--with-header"],
        hasNavigation && $["safearea--with-nav"],
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}
