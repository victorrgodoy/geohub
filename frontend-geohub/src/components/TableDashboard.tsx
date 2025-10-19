import { Table } from 'antd'
import type { TableProps } from 'antd'

type TableDashboardProps<T> = {
   data: T[]
   columns: TableProps<T>['columns']
}

const TableDashboard = <T extends object>({ columns, data }: TableDashboardProps<T>) => {
   return <Table<T> columns={columns} dataSource={data} className="" />
}

export default TableDashboard
