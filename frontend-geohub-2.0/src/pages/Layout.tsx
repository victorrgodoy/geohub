import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { Menu } from "lucide-react";

function Layout() {
  return (
    <div className="drawer lg:drawer-open min-h-screen max-w-[1400px] mx-auto">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="drawer-content flex flex-col overflow-hidden">
        <label
          htmlFor="main-drawer"
          className="btn drawer-button lg:hidden m-4 w-fit "
        >
          <Menu />
        </label>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
