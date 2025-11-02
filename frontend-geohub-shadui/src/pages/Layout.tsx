import { Outlet } from "react-router-dom";

function Layout() {
  return (
      <main className="flex-1 p-9 max-w-7xl mx-auto min-h-screen">
        <Outlet />
      </main>
  );
}

export default Layout;
