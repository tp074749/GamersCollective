// NavLists.ts

import type { MenuItem } from "./NavType";
import type { Props } from "./NavType";



export const storeItems: MenuItem[] = [
  { label: "Featured",  href: "/" },
  { label: "Wishlist",  href: "/wishlist" },
  { label: "Stats",     href: "/stats" },
];

export const categoriesItems: MenuItem[] = [
  { label: "Souls Game", href: "/categories" },
  { label: "Survival",   href: "/categories/survival" },
];

export const recommendationsItems: MenuItem[] = [
  { label: "All Games", href: "/recommendations" },
  { label: "Installed", href: "/installed" },
];