// NavigationType.ts
import type { ReactNode } from "react";

type BaseItem = { label?: string; disabled?: boolean; icon?: ReactNode };        // common fields
type NavItem = BaseItem & { href: string; external?: boolean; replace?: boolean }; // navigation item
type ActionItem = BaseItem & { onSelect: () => void };                            // callback item
type SeparatorItem = { kind: "separator" };                                      // visual separator
type HeadingItem = { kind: "heading"; label: string };                           // non-clickable heading


export type MenuItem = NavItem | ActionItem | SeparatorItem | HeadingItem;       // union of all items

// ----- Component props -----
export type Props = {
  label: string;                 // button text
  items: MenuItem[];             // items to render
  closeSiblings?: () => void;    // optional: close other open menus
  buttonClassName?: string;      // optional custom class for the trigger button
  menuClassName?: string;        // optional custom class for the popover menu
  itemClassName?: string;        // optional custom class for each item
  open?: boolean;                          // parent controls visibility if provided
  onOpenChange?: (open: boolean) => void;  // tell parent when we try to open/close
  hoverEnabled?: boolean;                  
};