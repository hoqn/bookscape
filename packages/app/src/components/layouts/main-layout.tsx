import type { PropsWithChildren } from "react";
import MainNavigation from "../common/main-navigation";

import $ from "./main-layout.module.css";

interface Props extends PropsWithChildren {}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <div className={$["safe-area"]}>{children}</div>
      <MainNavigation className={$["main-nav"]} navItems={[
        {
          slug: "/",
          icon: "feed",
          shortName: "피드",
          fullName: "홈 피드",
        },
        {
          slug: "/search",
          icon: "search",
          shortName: "검색",
          fullName: "책 검색",
        },
        {
          slug: "/shelf",
          icon: "shelves",
          shortName: "책장",
          fullName: "나의 책장",
        },
      ]} />
    </>
  );
}
