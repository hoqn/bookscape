import { ComponentPropsWithoutRef } from "react";

import $ from "./subsection.module.css"
import clsx from "clsx";

interface Props extends BaseProps, ComponentPropsWithoutRef<"section"> {
  title?: string;
}

export default function SubSection({
  className,
  title,
  children,
  ...restProps
}: Props) {
  return (
    <section className={clsx($["section"], className)} {...restProps}>
      <div className={`${$["section__header"]} ${$["header"]}`}>
        { title && <h4 className={$["header__title"]}>{title}</h4> }
      </div>
      <div className={`${$["section__body"]} ${$["body"]}`}>
        {children}
      </div>
    </section>
  )
}