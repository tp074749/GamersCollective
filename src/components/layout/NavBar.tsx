import { NavLink, useLocation } from "react-router-dom";
import DropDownMenu from "./Dropdown/HoverDropDownMenu";
import { NAV } from "./NavLists";

type MenuItem = { label: string; href: string };

const ddMenu = "absolute left-0 mt-2 min-w-[180px] rounded-xl border border-white/10 bg-[#0b0f15]/95 backdrop-blur z-50 p-1";
const ddItem = "px-3 py-2 rounded-md text-sky-200 hover:text-sky-300 hover:bg-sky-900/40 focus:bg-sky-900/50 focus:text-sky-300 outline-none";
const linkBase = "px-3 py-1 rounded-md text-sm font-medium transition-colors outline-none focus:outline-none";
const linkNormal = "text-[#F8F9FA]/80 hover:text-[#45A29E]";
const linkActive = "text-[#F8F9FA] bg-white/5";

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function Navbar() {
  const { pathname } = useLocation();

  const isGroupActive = (items: MenuItem[]) =>
    items.some(it => pathname === it.href || pathname.startsWith(it.href + "/"));

  return (
    <header className="sticky top-0 z-40 bg-[#1F2833]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-xl font-extrabold tracking-tight">
          <NavLink to="/">
          <span className="text-[#6C63FF]">Gamers</span>
          <span className="text-[#F8F9FA]">Collective</span>
          </NavLink>
        </div>

        <nav className="flex items-center gap-3">
          {Object.entries(NAV).map(([groupId, items]) => {
            const label = titleCase(groupId);
            const btnCls = `${linkBase} ${isGroupActive(items) ? linkActive : linkNormal}`;
            return (
              <DropDownMenu
                key={groupId}
                label={label}
                items={items}
                buttonClassName={btnCls}
                menuClassName={ddMenu}
                itemClassName={ddItem}
              />
            );
          })}

          <NavLink to="/about" className={`${linkBase} ${linkNormal}`}>
            About
          </NavLink>

          <NavLink
            to="/cart"
            className={`${linkBase} ${linkNormal}`}
          >
            Cart
          </NavLink>

          <NavLink
            to="/login"
            className={`${linkBase} ${linkNormal}`}
          >
            Log in
          </NavLink>

          
        </nav>
      </div>
    </header>
  );
}
