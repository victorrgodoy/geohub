import { Outlet, useLocation, useParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/appSidebar";
import { AppBreadcrumb } from "../components/appBreadcrumb";

function Layout() {
  const location = useLocation();
  const params = useParams();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Overview";


    const segments = path.split("/").filter(Boolean);
    const firstSegment = segments[0] ?? "";

    return  firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);
  };

  const links = [
    {
      name: "Overview",
      href: "/",
    },
  ];

   if (params.continentId) {
    links.push({
      name: "Continent", 
      href: `/continent/${params.continentId}/country`,
    });
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 max-w-7xl mx-auto p-8 flex flex-col gap-10">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <SidebarTrigger className="cursor-pointer" />
            <h1 className="text-2xl">{getPageTitle()}</h1>
          </div>
          <AppBreadcrumb links={links} />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
