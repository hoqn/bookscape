import clsx from "clsx";
import $ from "./header.module.css";
import MaterialSymbol from "../ui/material-symbol";
import { MouseEventHandler, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

interface Props extends BaseProps {
  withoutLayoutSet?: boolean;
  title?: string;
  leftAction?: "back" | "close" | MouseEventHandler<HTMLButtonElement> | null;
}

function Header({ className, title, withoutLayoutSet = false, leftAction = null }: Props) {
  const { scrollY } = useScroll();

  const [isTop, setTop] = useState<boolean>(scrollY.get() < 16);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isTop && latest < 16) setTop(true);
    else if (isTop && latest > 16) setTop(false);
  });

  return (
    <div className={clsx($["header"], !withoutLayoutSet && $["header--layout"], isTop && $["header--top"], className)}>
      <div className={$["header__inner"]}>
        {!!leftAction && (
          <button className={$["header__back-btn"]}>
            <MaterialSymbol name="arrow_back" />
          </button>
        )}
        <div className={$["header__content"]}>
          <h2 className={$["header__title"]}>{title}</h2>
        </div>
      </div>
    </div>
  );
}

function Placeholder () {
  return <div className={$["header-placeholder"]}></div>
}

export default Object.assign(Header, {
  Placeholder,
});
