type Column = {
  key: string;
  label: string;
};

type TableProps<T> = {
  columns: Column[];
  data: T[];
};

function Table<T extends object>({ columns, data }: TableProps<T>) {
  return (
    <div className="overflow-x-auto pb-6 text-xs lg:text-sm">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 font-normal text-(--color-text-subtitle)">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-(--color-border) last:border-0 ">
              {columns.map((col, colIndex) => (
               <td key={colIndex} 
                className={`px-6 ${col.key === "name" && (row as any).flag ? "flex gap-2 items-center" : ""}`}>
                  {col.key === "name" && (row as any).flag && (
                    <img
                      src={(row as any).flag}
                      alt={`${row[col.key as keyof T]} flag`}
                      className="w-8 rounded-sm"
                    />
                  )}
                  {String(row[col.key as keyof T])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;