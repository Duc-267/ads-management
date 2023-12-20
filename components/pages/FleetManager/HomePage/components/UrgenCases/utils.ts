import { ITableHeader } from 'components/Table'

export function getHeaderList(): ITableHeader[] {
  const headers: ITableHeader[] = [
    {
      Header: 'FLAG',
      accessor: 'flag',
      disableSortBy: true
    },
    {
      Header: 'CASE ID',
      accessor: 'caseId',
      disableSortBy: true
    },
    {
      Header: 'REG NUMBER',
      accessor: 'regNumber',
      disableSortBy: true
    },
    {
      Header: 'DATE OF INCIDENT',
      accessor: 'dateOfIncident',
      disableSortBy: true
    },
    {
      Header: 'TIME OF INCIDENT',
      accessor: 'timeOfIncident',
      disableSortBy: true
    },
    {
      Header: 'DRIVER NAME',
      accessor: 'driverName',
      disableSortBy: true
    }
  ]
  return headers
}
