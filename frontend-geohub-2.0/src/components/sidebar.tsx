import { Link } from "react-router-dom";
//icons
import { LayoutDashboard } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { Flag } from 'lucide-react';
import { Earth } from 'lucide-react';

//components
import ThemeController from "./theme-controller";

const items = [
  { id: 1, label: "Overview", path: "/", icon: <LayoutDashboard size={18} strokeWidth={1}/>},
  { id: 2, label: "City", path: "/", icon: <Building2 size={18} strokeWidth={1}/> },
  { id: 3, label: "Country", path: "/" , icon: <Flag size={18} strokeWidth={1}/>},
  { id: 4, label: "Continent", path: "/" , icon: <Earth size={18} strokeWidth={1}/>},
];

function Sidebar(){
    return(
        <div className="drawer-side border-r-[0.5px] border-(--color-division)">
            <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"/>

            {/* sidebar container */}
            <aside className="bg-(--color-background) min-h-full w-60">
                <div className="flex items-center justify-between py-8 px-4 text-lg font-bold">
                    <p>GEOHUB</p>
                    <ThemeController/>
                </div>
                <p className="text-xs px-4 text-(--color-primary)">Menu</p>  
                <div className="flex px-4 mt-3">
                    <div className="ml-3 w-[0.5px] bg-(--color-division)"/>
                    <ul className="menu flex-1">
                    {items.map((i) => (
                        <li key={i.id}>
                            <Link to={i.path } className="hover:bg-(--color-sidebar-hover)">
                                {i.icon}{i.label}
                            </Link>
                        </li>    
                    ))}
                    </ul>
                </div>
            </aside>

        </div>
    )
}

export default Sidebar;