import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';
import { EditableRow } from './editableRow';

type Column<T> = {
  key: keyof T | "actions";
  label: string;
  render?: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export const TableView = <T extends object>({ columns, data }: TableProps<T>) => {
  const columnHelper = createColumnHelper<T>();

  const tableColumns = columns.map(col => 
    columnHelper.accessor(col.key as any, {
      header: col.label,
      cell: (info) => {
        if (col.render) {
          return col.render(info.row.original);
        }
        return String(info.getValue());
      },
    })
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto pb-6 text-xs lg:text-sm rounded-sm">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 font-semibold text-(--color-text)/70 bg-(--color-text)/10"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="border-b border-(--color-text)/10 last:border-0"
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-6"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};