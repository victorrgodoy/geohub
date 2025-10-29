import { NavLink } from "react-router-dom";
//icons
import { LayoutDashboard } from "lucide-react";
import { Building2 } from "lucide-react";
import { Flag } from "lucide-react";
import { Earth } from "lucide-react";
import { Moon } from 'lucide-react';

//components
import Toggle from "./toggle";

const items = [
  {
    id: 1,
    label: "Dashboard",
    path: "/",
    icon: <LayoutDashboard size={18} strokeWidth={1.5} />,
  },
  {
    id: 2,
    label: "City",
    path: "/city",
    icon: <Building2 size={18} strokeWidth={1.5} />,
  },
  {
    id: 3,
    label: "Country",
    path: "/country",
    icon: <Flag size={18}  strokeWidth={1.5} />,
  },
  {
    id: 4,
    label: "Continent",
    path: "/continent",
    icon: <Earth size={18}  strokeWidth={1.5} />,
  },
];

function Sidebar() {
  return (
    <div className="drawer-side border-r border-(--color-text)/10">
      <label
        htmlFor="main-drawer"
        aria-label="close sidebar"
        className="drawer-overlay "
      />

      {/* sidebar container */}
      <aside className="min-h-full p-6 w-64 flex flex-col justify-between bg-(--color-background)">
        <div>
          <div className="flex mb-10 items-center justify-between text-xl font-bold">
            <p className="text-(--color-primary)">GEOHUB</p>
          </div>
          <div className="flex mb-10">
            <ul className="menu flex-1 gap-2 px-0 font-medium text-(--color-text)/70">
              {items.map((i) => (
                <li key={i.id}>
                  <NavLink
                    to={i.path}
                    className={({ isActive }) =>
                      `py-2 flex items-center 
                                    rounded-md
                                    hover:bg-(--color-primary)
                                    hover:text-(--color-background)
                                    ${isActive ? "bg-(--color-primary) text-(--color-background)" : " "}`
                    }
                  >
                    {i.icon}
                    {i.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex px-3 items-center justify-between font-medium text-(--color-text)/70">
            <div className="flex items-center gap-2">
              <Moon size={18} strokeWidth={1.5}/><p className="text-sm">Dark mode</p>
            </div>
            <Toggle />
          </div>
        </div>
        <footer className="text-sm">© 2025 Geohub </footer>
      </aside>
    </div>
  );
}

export default Sidebar;
