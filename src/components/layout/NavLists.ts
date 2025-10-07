// NavLists.ts
export type SimpleItem = { label: string; href: string };

// Single export: keys are the group ids → arrays of items
export const NAV: Record<string, SimpleItem[]> = {
  store: [
    { label: "Featured",  href: "/" },
    { label: "Wishlist",  href: "/wishlist" },
    { label: "Stats",     href: "/stats" },
  ],
  categories: [
    { label: "Souls Game", href: "/categories" },
    { label: "Survival",   href: "/categories/survival" },
  ],
  library: [
    { label: "All Games", href: "/recommendations" },
    { label: "Installed", href: "/installed" },
  ],
} as const;

