import { ITableHeader } from 'components/Table'

export function getHeaderList(): ITableHeader[] {
  const headers: ITableHeader[] = [
    {
      Header: '',
      accessor: 'avatar',
      disableSortBy: true
    },
    {
      Header: 'DRIVER NAME',
      accessor: 'driverName',
      disableSortBy: true
    },
    {
      Header: 'DRIVER PHONE',
      accessor: 'driverPhone',
      disableSortBy: true
    },
    {
      Header: 'DRIVER EMAIL',
      accessor: 'driverEmail',
      disableSortBy: true
    },
    {
      Header: 'STATUS',
      accessor: 'status',
      disableSortBy: true
    },
    {
      Header: '',
      accessor: 'action',
      disableSortBy: true
    }
  ]
  return headers
}
