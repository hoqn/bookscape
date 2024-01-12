import type { ReactNode } from "react";

export interface NavItem {
  slug: string;
  icon: string | (() => ReactNode);
  shortName: string;
  fullName: string;
}