import clsx from "clsx";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { MouseEventHandler, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialSymbol from "../ui/material-symbol";
import $ from "./header.module.css";

const HEADER_TOP_THRESHOLD = 64;

interface Props extends BaseProps {
  withoutLayoutSet?: boolean;
  title?: string;
  leadingAction?: "back" | "close" | null;
  trailingActions?: never[];
  largeTitle?: boolean;

  subHeader?: ReactNode;
}

export default function Header({ className, title, withoutLayoutSet = false, leadingAction = null, largeTitle = false, subHeader }: Props) {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const [isTop, setTop] = useState<boolean>(scrollY.get() < HEADER_TOP_THRESHOLD);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isTop && latest < HEADER_TOP_THRESHOLD) setTop(true);
    else if (isTop && latest > HEADER_TOP_THRESHOLD) setTop(false);
  });

  const doOnClickLeadingIcon: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <>
      <header className={clsx($["header"], !withoutLayoutSet && $["header--layout"], largeTitle && $["header--large-title"], isTop && $["header--top"], className)} role="navigation">
        <div className={$["header__inner"]}>
          {!!leadingAction && (
            <button className={$["header__back-btn"]} onClick={doOnClickLeadingIcon}>
              <MaterialSymbol name={leadingAction === "back" ? "arrow_back" : "close"} />
            </button>
          )}
          <div className={$["header__content"]}>
            <h2 className={$["header__title"]}>{title}</h2>
          </div>
        </div>
        {subHeader && (
          <div className={$["header__sub"]}>
            {subHeader}
          </div>
        )}
      </header>
    </>
  );
}
