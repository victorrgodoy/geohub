import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
  caption: string;
  columns: Column<T>[];
  data: T[];
};

export function AppTable<T>({ caption, columns, data }: Props<T>) {
  return (
    <Table className="table-fixed w-full"> 
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow className="w-full">
          {columns.map((c, i) => (
            <TableHead
              key={c.key}
              className={i === columns.length - 1 ? "text-right" : undefined}
            >
              {c.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((d, i) => (
          <TableRow key={i} className={i % 2 === 0 ? "bg-secondary" : ""}>
            {columns.map((c, j) => (
              
              <TableCell
                key={j}
                className={j === columns.length - 1 ? "text-right" : undefined}
              >
                {c.render ? c.render(d) : (d as any)[c.name] as React.ReactNode}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {/* <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow> */}
      </TableFooter>
    </Table>
  );
}
