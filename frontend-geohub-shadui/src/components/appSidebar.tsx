import { LayoutDashboard} from "lucide-react";
import { AppSwitch } from "./appSwitch";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    title: "Overview",
    url: "/",
    icon: LayoutDashboard,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar variant="floating">
      <SidebarContent className="flex flex-col justify-between ">
        <div>
          <SidebarHeader className="px-4 py-6 border-b border-border/30">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xl font-bold">GEOHUB</p>
                <p className="text-xs text-muted-foreground">Global Platform</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarGroup className="px-3 py-4">
            <SidebarGroupLabel className="text-xs tracking-wider mb-2">
              Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {items.map((item) => {
                  const isActive = currentPath === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        data-active={isActive}
                        className="data-[active=true]:bg-sidebar  hover:bg-accent transition-colors"
                      >
                        <Link
                          to={item.url}
                          className="flex items-center gap-3 px-3 py-2"
                        >
                          <item.icon className="size-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <div>
          <SidebarGroup className="px-3 py-4">
            <SidebarGroupLabel className="text-xs tracking-wider mb-2">
              Config
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="px-2">
                  <AppSwitch />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarFooter className="px-4 py-4 border-t">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>© 2025 Geohub</span>
              <span className="font-medium">v1.0</span>
            </div>
          </SidebarFooter>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}