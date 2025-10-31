import { NavLink } from "react-router-dom";
//icons
import { LayoutDashboard } from "lucide-react";
import { Building2 } from "lucide-react";
import { Flag } from "lucide-react";
import { Earth } from "lucide-react";

//components
import Toggle from "./toggle";

const items = [
  {
    id: 1,
    label: "Dashboard",
    path: "/",
    icon: <LayoutDashboard size={18} strokeWidth={2} />,
  },
  {
    id: 2,
    label: "City",
    path: "/city",
    icon: <Building2 size={18} strokeWidth={2} />,
  },
  {
    id: 3,
    label: "Country",
    path: "/country",
    icon: <Flag size={18} strokeWidth={2} />,
  },
  {
    id: 4,
    label: "Continent",
    path: "/continent",
    icon: <Earth size={18} strokeWidth={2} />,
  },
];

function Sidebar() {
  return (
    <div className="drawer-side">
      <label
        htmlFor="main-drawer"
        aria-label="close sidebar"
        className="drawer-overlay "
      />

      {/* sidebar container */}
      <aside className="min-h-full p-7 w-64 flex flex-col justify-between bg-(--color-bg-secondary) text-(--color-text-secondary)">
        <div>
          <div className="flex mb-10 font-bold">
            <p className="text-(--color-primary-700) text-lg">GEOHUB</p>
          </div>

          <p className="font-normal text-xs mb-2.5">MANAGE</p>
          <div className="flex mb-10">
            <ul className="menu flex-1 gap-2 px-0 font-medium text-(--color-text)/70">
              {items.map((i) => (
                <li key={i.id}>
                  <NavLink
                    to={i.path}
                    className={({ isActive }) =>
                      `py-2 flex items-center hover:bg-(--color-hover) active:text-(--color-text-primary)
                      ${isActive ? "bg-(--color-hover)" : " "}`
                    }
                  >
                    {i.icon}
                    {i.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* ------ */}
          <p className="font-normal text-xs mb-5">OTHER</p>
          <div className="flex items-center gap-2">
            <Toggle />
            <p className="text-sm">Dark mode</p>
          </div>
        </div>
        <footer className="text-sm">© 2025 Geohub </footer>
      </aside>
    </div>
  );
}

export default Sidebar;
