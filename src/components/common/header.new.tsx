import { ReactNode, useMemo, useState } from "react";

import $ from "./header.new.module.css";
import clsx from "clsx";
import MaterialSymbol from "../ui/material-symbol";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Props extends BaseProps {
  title?: string;
  largeTitle?: boolean;
  transparent?: boolean;
  leadingAction?: "close" | "back" | ((props: { width: number, height: number }) => ReactNode) | null;
  trailingActions?: ((props: { width: number, height: number }) => ReactNode)[] | null;
  subHeader?: ReactNode;
}

export default function Header({
  className,
  title,
  largeTitle = false,
  transparent = false,
  leadingAction: LeadingAction,
  trailingActions,
  subHeader,
}: Props) {

  const navigate = useNavigate();

  const leadingActionNode = useMemo(() => LeadingAction ? (
    typeof LeadingAction === "string" ? (
      <MaterialSymbol name={LeadingAction === "close" ? "close" : "arrow_back"} onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }} />
    ) : (
      <LeadingAction width={24} height={24} />
    )
  ) : null, [LeadingAction, navigate]);

  const { scrollY } = useScroll();

  const [collapsing, setCollapsing] = useState<number>(scrollY.get() / 64);
  const [scrollTop, setScrollTop] = useState<boolean>(scrollY.get() === 0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 64)
      setCollapsing(1);
    else if (latest <= 0)
      setCollapsing(0);
    else
      setCollapsing(latest / 64);

    if (scrollTop && latest > 64)
      setScrollTop(false);
    else if (!scrollTop && latest <= 64)
      setScrollTop(true);
  });

  return (
    <>
      <header className={clsx(
        $["header"], 
        transparent && $["header--transparent"], 
        scrollTop && $["header--top"], 
        className,
        )}>

        
        {/* Main Part */}
        <div className={$["main"]}>
          <div className={$["main__inner"]}>
            { leadingActionNode && (
              <div className={$["main__lead"]}>
                <button className={$["main__lead-action"]}>
                  {leadingActionNode}
                </button>
              </div>
            )}
            <div className={$["main__content"]}>
              <motion.h2 className={$["main__title"]} style={{
                translateX: (largeTitle && leadingActionNode) ? (-40 * (1 - collapsing)) : undefined,
                translateY: (largeTitle) ? (64 * (1 - collapsing)) : undefined,
                fontSize: largeTitle ? `${1.25 + 0.5 * (1 - collapsing)}rem` : undefined,
              }}>{title}</motion.h2>
            </div>
            { trailingActions?.length && (
              <div className={$["main__trail"]}>
                {trailingActions?.map(Action => (
                  <span className={$["main__trail-action"]}>
                    <Action width={24} height={24} />
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Expanded Part */}
        {/* { largeTitle && (
          <div className={$["exp"]} style={{ height: `${4 * (1 - collapsing)}rem` }}></div> 
        )} */}

      </header>
      <div className={$["scrollable"]}>
        {/* SubHeader Part */}
        { subHeader && (
          <div className={$["sub"]}>
            {subHeader}
          </div>
        )}
      </div>
    </>
  );
}