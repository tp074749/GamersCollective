// DropdownMenu.tsx
import { useRef, useState, type ReactNode } from "react"; // React hooks + ReactNode type
import { useNavigate } from "react-router-dom";                       // client-side navigation

// ----- Item types -----
type BaseItem = { label?: string; disabled?: boolean; icon?: ReactNode };        // common fields
type NavItem = BaseItem & { href: string; external?: boolean; replace?: boolean }; // navigation item
type ActionItem = BaseItem & { onSelect: () => void };                            // callback item
type SeparatorItem = { kind: "separator" };                                      // visual separator
type HeadingItem = { kind: "heading"; label: string };                           // non-clickable heading


export type MenuItem = NavItem | ActionItem | SeparatorItem | HeadingItem;       // union of all items

// ----- Component props -----
type Props = {
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

export default function DropDownMenu({
  label,                         // destructure: button label
  items,                         // destructure: items array
  closeSiblings,                 // destructure: sibling closer
  buttonClassName,               // destructure: button class
  menuClassName,                 // destructure: menu class
  itemClassName,                 // destructure: item class
}: Props) {
  const [open, setOpen] = useState(false);                   // whether the menu is open
  const ref = useRef<HTMLDivElement>(null);                  // ref to wrapper div for outside-click
  const hoverTimer = useRef<number | null>(null);            // small delay timer to avoid flicker
  const navigate = useNavigate();                            // router navigation function

  const clearHoverTimer = () => {                            // clear any pending hover timer
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current);               // cancel timeout
      hoverTimer.current = null;                             // reset handle
    }
  };

  const openMenu = () => {                                   // open the menu
    setOpen(true);                                           // set open state
    closeSiblings?.();                                       // optionally close other menus
  };
  const closeMenu = () => setOpen(false);                    // close the menu

  // Hover open/close (with tiny delay)
  const onMouseEnter = () => {                               // when pointer enters wrapper
    clearHoverTimer();                                       // cancel previous timers
    hoverTimer.current = window.setTimeout(openMenu, 80);    // open after 80ms
  };
  const onMouseLeave = () => {                               // when pointer leaves wrapper
    clearHoverTimer();                                       // cancel previous timers
    hoverTimer.current = window.setTimeout(closeMenu, 120);  // close after 120ms
  };


  // Select (nav or action)
  const selectItem = (item: MenuItem) => {                   // handle item activation
    if ("kind" in item && (item.kind === "separator" || item.kind === "heading")) return; // ignore non-action items
    if ("disabled" in item && item.disabled) return;         // ignore disabled items

    closeMenu();                                             // close the menu first

    if ("onSelect" in item) {                                // action item: run callback
      item.onSelect();
      return;
    }

    const { href, external } = item as NavItem;     // navigation item: get fields
    if (external) window.open(href, "_blank", "noopener,noreferrer"); // external link → new tab
    else navigate(href);                           // internal nav push
  };


  // Default classes if none provided
  const btnCls = buttonClassName ?? "px-3 py-1 rounded-md";                // fallback button classes
  const menuCls =
    menuClassName ??
    "absolute left-0 mt-2 min-w-[180px] rounded-xl border border-white/10 bg-black/90 backdrop-blur p-1 z-50"; // fallback menu classes
  const itemCls = 
  itemClassName ?? "px-3 py-2 rounded-md hover:bg-white/10 cursor-pointer";

  return (
    <div
      ref={ref}                                              // attach ref to wrapper
      className="relative inline-block"                      // positioning context for popover
      onMouseEnter={onMouseEnter}                            // open on hover
      onMouseLeave={onMouseLeave}                            // close on un-hover
    >
      <button
        type="button"                                        // do not submit forms
        aria-haspopup="listbox"                              // accessibility: popup type
        aria-expanded={open}                                 // accessibility: open state
        className={btnCls}                                   // styling classes
      >
        {label}                                              {/* trigger text */}
      </button>

      {open && (                                             // render popover only when open
        <ul role="listbox" aria-label={label} className={menuCls}>  {/* popup container */}
          {items.map((item, i) => {                          // render each item
            if ("kind" in item && item.kind === "separator") {
              return <li key={`sep-${i}`} aria-hidden className="my-1 border-t border-white/10" />; // separator rule
            }
            if ("kind" in item && item.kind === "heading") {
              return (
                <li
                  key={`head-${i}`}                          // unique key
                  aria-disabled                               // non-interactive
                  className="px-3 py-2 text-xs uppercase tracking-wide opacity-70"
                >
                  <strong>{item.label}</strong>               {/* heading text */}
                </li>
              );
            }

            const disabled = !!(item as any).disabled;       // is this item disabled?
            const key = ("href" in item && item.href)        // build a stable key
                      || (item as any).label
                      || String(i);

            return (
              <li
                key={key}                                     // unique key
                role="option"                                 // accessibility role
                tabIndex={disabled ? -1 : 0}                  // focusable unless disabled
                aria-disabled={disabled || undefined}         // screen reader disabled state
                onClick={() => !disabled && selectItem(item)} // click to activate
                className={`${itemCls} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} // visual state
                style={{
                  padding: "8px 14px",
                  cursor: "pointer",     // use "default" if you want the arrow instead of the hand
                  userSelect: "none",    // prevent text selection (no I-beam)
                }}
              >
                {"icon" in item && (item as any).icon}
                {"label" in item ? (item as any).label : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
