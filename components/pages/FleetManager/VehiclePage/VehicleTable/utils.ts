import { ITableHeader } from 'components/Table'

export function getHeaderList(): ITableHeader[] {
  const headers: ITableHeader[] = [
    {
      Header: 'REGISTRATION NUMBER',
      accessor: 'registrationNumber',
      disableSortBy: true
    },
    {
      Header: 'VEHICLE MAKE',
      accessor: 'make',
      disableSortBy: true
    },
    {
      Header: 'MODEL',
      accessor: 'model',
      disableSortBy: true
    },
    {
      Header: 'YEAR',
      accessor: 'yearOfManufacture',
      disableSortBy: true
    },
    {
      Header: 'VIN NUMBER',
      accessor: 'vinNumber',
      disableSortBy: true
    },
    {
      Header: 'STATUS',
      accessor: 'status',
      disableSortBy: true
    },
    {
      Header: 'DASH CAM',
      accessor: 'dashCam',
      disableSortBy: true
    },
    {
      Header: 'ACTION',
      accessor: 'action',
      disableSortBy: true
    }
  ]
  return headers
}
