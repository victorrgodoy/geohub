// Layout.tsx (simplificado)
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/appSidebar";
import { AppBreadcrumb } from "../components/appBreadcrumb";
import { usePageTitle } from "../context/pageTitle/pageTitleProvider";

function Layout() {
  const location = useLocation();
  const { pageTitle } = usePageTitle(); 

 function generateBreadcrumbs() {
  const path = location.pathname;

  const breadcrumbs = [{ name: 'Overview', href: '/' }];
  if (location.pathname.startsWith('/continent')) {
    breadcrumbs.push({ name: "Continent", href: path });
  } 

  if (location.pathname.endsWith('/city')) {
    breadcrumbs.push({ name: "Country", href: path });
  } 

  return breadcrumbs;
}

  const breadcrumbs = generateBreadcrumbs();

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 max-w-7xl mx-auto p-8 flex flex-col gap-10">
        <header>
          <div className="flex items-center gap-19 justify-between mb-3">
            <h1 className="text-3xl font-bold bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              {pageTitle}
            </h1>
            <SidebarTrigger variant="outline" className="cursor-pointer p-2 rounded-lg hover:bg-accent transition-colors duration-200" />
          </div>
          <AppBreadcrumb links={breadcrumbs} />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Layout;