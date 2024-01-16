import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

import $ from "./loading-indicator.module.css";

interface Props extends BaseProps, ComponentPropsWithoutRef<"div"> {}

export default function LoadingIndicator({
  className,
  ...restProps
}: Props) {
  return <div className={clsx($["loading-indicator"], className)} role="progressbar" {...restProps}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
}
