// AppBreadcrumb.tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "../components/ui/breadcrumb";
import { ChevronRight, Home } from "lucide-react";

type Link = {
  name: string;
  href: string;
};

type Props = {
  links: Link[];
};

export function AppBreadcrumb({ links }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center gap-2">
        {links.map((link, index) => {
          const isLast = index === links.length - 1;
          const isFirst = index === 0;
          
          return (
            <BreadcrumbItem key={index} className="flex items-center gap-2">
              {isFirst ? (
                <Home className="size-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="size-4 text-muted-foreground/60" />
              )}
              
              {isLast ? (
                <BreadcrumbPage className="text-foreground font-semibold">
                  {link.name}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink 
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1"
                >
                  {link.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}