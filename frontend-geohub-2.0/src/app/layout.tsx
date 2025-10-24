import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { Menu } from 'lucide-react';

function Layout() {
    
  const location = useLocation();
   const page_title = (() => {
    switch (location.pathname) {
      case "/": return "Overview";
      case "/city": return "City";
      case "/country": return "Country";
      case "/continent": return "Continent";
      default: return "";
    }
  })();


  return (
    <div className="drawer lg:drawer-open min-h-screen font-poppins bg-background">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN */}
      <div className="drawer-content flex flex-col">
        <label
          htmlFor="main-drawer"
          className="btn drawer-button lg:hidden m-4 w-fit "
        >
          <Menu/>
        </label>

        <main className="flex-1 ">
          <header className="p-8">
            <h1 className="font-medium text-2xl text-(--color-primary)">{page_title}</h1>
          </header>
          <hr className="border-[0.5px] text-(--color-division)"/>
          <Outlet/>
        </main>
      </div>

      {/* SIDEBAR */}
      <Sidebar />
    </div>
  );
}

export default Layout;