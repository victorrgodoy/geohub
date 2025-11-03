import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../components/ui/breadcrumb";

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
      <BreadcrumbList>
        {links.map((link, index) => {
          const isLast = index === links.length - 1;
          return (
            <BreadcrumbItem key={index}>
              {isLast ? (
                <BreadcrumbPage>{link.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={link.href}>{link.name}</BreadcrumbLink>
              )}
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
