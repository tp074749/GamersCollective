import { NavLink } from "react-router-dom";

const linkBase =
  "px-3 py-1 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6C63FF] focus:ring-offset-[#1F2833]";
const linkNormal = "text-[#F8F9FA]/80 hover:text-[#45A29E]";
const linkActive = "text-[#F8F9FA] bg-white/5";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#1F2833]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <div className="text-xl font-extrabold tracking-tight">
          <span className="text-[#6C63FF]">Gamers</span>
          <span className="text-[#F8F9FA]">Collective</span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkNormal}`
            }
          >
            Store
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkNormal}`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/recommendations"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkNormal}`
            }
          >
            Recommendations
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkNormal}`
            }
          >
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
