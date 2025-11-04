import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

type Column<T> = {
  key: number;
  name: string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

type Props<T> = {
  caption?: string;
  columns: Column<T>[];
  data: T[];
};

export function AppTable<T>({ caption, columns, data }: Props<T>) {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((c) => (
            <TableHead
              key={c.key}
              className="h-10 px-4 text-xs font-medium text-muted-foreground/60"
            >
              {c.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((d, i) => (
          <TableRow 
            key={i}
            className="hover:bg-muted/50 transition-colors"
          >
            {columns.map((c, j) => (
              <TableCell
                key={j}
                className="px-4 py-3"
              >
                <span className="text-sm font-medium text-foreground/80">
                  {c.render
                    ? c.render(d)
                    : ((d as any)[c.name] as React.ReactNode)}
                </span>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
