// Navbar.tsx
import DropDownMenu, { type MenuItem } from "./Dropdown/HoverDropDownMenu";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { storeItems, categoriesItems, recommendationsItems } from "./NavLists";





// Tailwind styles (same as before)
const ddMenu =
  "absolute left-0 mt-2 min-w-[180px] rounded-xl border border-white/10 bg-[#0b0f15]/95 shadow-lg backdrop-blur z-50 p-1";
const ddItem =
  "px-3 py-2 rounded-md text-sky-200 hover:text-sky-300 hover:bg-sky-900/40 focus:bg-sky-900/50 focus:text-sky-300 outline-none";

const linkBase = 
  "px-3 py-1 rounded-md text-sm font-medium transition-colors outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6C63FF] focus-visible:ring-offset-[#1F2833] [-webkit-tap-highlight-color:transparent]";
const linkNormal = "text-[#F8F9FA]/80 hover:text-[#45A29E]";
const linkActive = "text-[#F8F9FA] bg-white/5";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Helper: a menu is “active” if current path matches one of its items
  const isMenuActive = (items: MenuItem[]) =>
    items.some(
      (it) =>
        "href" in it &&
        (pathname === it.href || pathname.startsWith(it.href + "/"))
    );

  // Compute button classes using the same active/normal scheme
  const storeBtnCls = `${linkBase} ${
    isMenuActive(storeItems) ? linkActive : linkNormal
  }`;
  const categoriesBtnCls = `${linkBase} ${
    isMenuActive(categoriesItems) ? linkActive : linkNormal
  }`;
  const recsBtnCls = `${linkBase} ${
    isMenuActive(recommendationsItems) ? linkActive : linkNormal
  }`;

  return (
    <header className="sticky top-0 z-40 bg-[#1F2833]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <div className="text-xl font-extrabold tracking-tight">
          <span className="text-[#6C63FF]">Gamers</span>
          <span className="text-[#F8F9FA]">Collective</span>
        </div>

        {/* Menus + links */}
        <nav className="flex items-center gap-3">
          <DropDownMenu
            label="Store"
            items={storeItems}
            buttonClassName={storeBtnCls}
            menuClassName={ddMenu}
            itemClassName={ddItem}
          />
          <DropDownMenu
            label="Categories"
            items={categoriesItems}
            buttonClassName={categoriesBtnCls}
            menuClassName={ddMenu}
            itemClassName={ddItem}
          />
          <DropDownMenu
            label="Library"
            items={recommendationsItems}
            buttonClassName={recsBtnCls}
            menuClassName={ddMenu}
            itemClassName={ddItem}
          />

          {/* Plain link stays the same */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkNormal}`
            }
          >
            About
          </NavLink>

          <button
            className={`${linkBase} ${linkNormal}`}
            onClick={() => navigate("/login")}
            type="button"
          >
            Log in
          </button>
        </nav>
      </div>
    </header>
  );
}
