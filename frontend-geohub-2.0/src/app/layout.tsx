import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { Menu } from 'lucide-react';

function Layout() {
    
  const location = useLocation();
   const page_title = (() => {
    switch (location.pathname) {
      case "/": return "Dashboard";
      case "/city": return "City";
      case "/country": return "Country";
      case "/continent": return "Continent";
      default: return "";
    }
  })();


  return (
    <div className="drawer lg:drawer-open min-h-screen font-poppins max-w-[1400px] mx-auto">

      <input id="main-drawer" type="checkbox" className="drawer-toggle" />
       {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="drawer-content flex flex-col overflow-hidden">
        <label
          htmlFor="main-drawer"
          className="btn drawer-button lg:hidden m-4 w-fit "
        >
          <Menu/>
        </label>

        <main className="flex-1">
          <header className="p-8">
            <h1 className="font-medium text-3xl">{page_title}</h1>
            <p className="mt-2 text-(--color-text-subtitle) font-normal leading-7">
              This is a dashboard where you can view an overview of global population data.
            </p>
          </header>
          <Outlet/>
        </main>
      </div>

    
    </div>
  );
}

export default Layout;