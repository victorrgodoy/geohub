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
    icon: <LayoutDashboard size={20} strokeWidth={1} />,
  },
  {
    id: 2,
    label: "City",
    path: "/city",
    icon: <Building2 size={20} strokeWidth={1} />,
  },
  {
    id: 3,
    label: "Country",
    path: "/country",
    icon: <Flag size={20} strokeWidth={1} />,
  },
  {
    id: 4,
    label: "Continent",
    path: "/continent",
    icon: <Earth size={20} strokeWidth={1} />,
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
          <div className="flex mb-6 items-center justify-between text-2xl font-semibold">
            <p className="text-(--color-primary)">GEOHUB</p>
            <Toggle />
          </div>
          <hr className="mb-8 text-(--color-text)/20" />
          <div className="flex ">
            <ul className="menu flex-1 gap-1 px-0">
              {items.map((i) => (
                <li key={i.id}>
                  <NavLink
                    to={i.path}
                    className={({ isActive }) =>
                      `py-2 flex items-center 
                                    rounded-md
                                    hover:bg-(--color-hover)
                                    hover:text-(--color-background)
                                    ${isActive ? "bg-(--color-hover) text-(--color-background)" : " "}`
                    }
                  >
                    {i.icon}
                    {i.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <footer className="text-sm px-5 py-8">© 2025 Geohub </footer>
      </aside>
    </div>
  );
}

export default Sidebar;
