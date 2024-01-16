import MaterialSymbol from "./ui/material-symbol";

import clsx from "clsx";
import { ComponentPropsWithoutRef, InputHTMLAttributes } from "react";
import $ from "./search-input.module.css";

interface Props
  extends Omit<ComponentPropsWithoutRef<"div">, "children" | "onChange" | "onSubmit">,
    Pick<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "onSubmit"> {}

export default function SearchInput({ className, value, onChange, ...restProps }: Props) {
  return (
    <div className={clsx($["search-input"], className)} {...restProps}>
      <MaterialSymbol className={$["search-input__icon"]} name="search" inheritedSize />
      <input
        type="search"
        className={$["search-input__input"]}
        placeholder="제목, 글쓴이 ..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
