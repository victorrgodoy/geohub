type Column<T = any> = {
  key: string;
  label: string;
  render?: (row:T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: (T & { flag?: string })[];
};

export const TableView = <T extends object>({ columns, data }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto pb-6 text-xs lg:text-sm rounded-sm">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 font-normal text-(--color-text)/70 bg-(--color-text)/10 w-1/2"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-(--color-text)/10 last:border-0"
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-6 ${
                    col.key === "name" && row.flag
                      ? "flex gap-2 items-center"
                      : ""
                  }`}
                >
                  {col.render ? col.render(row) : col.key === "name" && row.flag ? 
                    ( 
                    <>
                      <img
                        src={row.flag}
                        alt={`${String(row[col.key as keyof T])} flag`}
                        className="w-8 rounded-sm"
                      />
                      {String(row[col.key as keyof T]) }
                    </>
                    )
                  : String(row[col.key as keyof T])} 
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

