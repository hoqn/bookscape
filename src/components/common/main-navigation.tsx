import clsx from "clsx";
import { NavItem } from "@/types/nav.types";
import { Link, useLocation } from "react-router-dom";

import $ from "./main-navigation.module.css";

import MaterialSymbol from "../ui/material-symbol";

interface Props extends BaseProps {
  navItems: NavItem[];
}

export default function MainNavigation({ className, navItems }: Props) {
  const { pathname } = useLocation();

  return (
    <div className={clsx($["main-nav"], className)}>
      <div className={$["main-nav__inner"]}>
        
        {/* Nav Items */}
        {navItems.map(({ slug, icon: Icon, shortName }) => (
          <Link key={slug} className={clsx($["main-nav__item"], $["item"], (pathname === slug) && $["item--selected"])} to={slug}>

            {/* Icon */}
            <div className={$["item__icon"]}>
              {typeof Icon === "string" ? (
                <MaterialSymbol name={Icon} />
              ) : (
                <Icon />
              )}
            </div>

            {/* Label */}
            <div className={$["item__label"]}>
              <span>{shortName}</span>
            </div>

          </Link>
        ))}

      </div>
    </div>
  );
}
