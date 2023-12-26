import { ITableHeader } from 'components/Table'

export function getHeaderList(): ITableHeader[] {
  const headers: ITableHeader[] = [
    {
      Header: 'ID',
      accessor: 'id',
      disableSortBy: true
    },
    {
      Header: 'EMAIL',
      accessor: 'email',
      disableSortBy: true
    },
    {
      Header: 'PHONE',
      accessor: 'phone',
      disableSortBy: true
    },
    {
      Header: 'BIRTHDAY',
      accessor: 'birthday',
      disableSortBy: true
    },
    {
      Header: 'NAME',
      accessor: 'name',
      disableSortBy: true
    },
    {
      Header: 'ROLE',
      accessor: 'role',
      disableSortBy: true
    }
  ]
  return headers
}
