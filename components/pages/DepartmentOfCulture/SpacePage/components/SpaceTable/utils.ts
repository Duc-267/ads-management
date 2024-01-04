import { ITableHeader } from 'components/Table'

export function getHeaderList(): ITableHeader[] {
  const headers: ITableHeader[] = [
    {
      Header: 'ID',
      accessor: 'id',
      disableSortBy: true
    },
    {
      Header: 'Hình thức quảng cáo',
      accessor: 'format',
      disableSortBy: true
    },
    {
      Header: 'Địa chỉ',
      accessor: 'address',
      disableSortBy: true
    },
    {
      Header: 'Được quy hoạch',
      accessor: 'planned',
      disableSortBy: true
    },
  ]
  return headers
}
