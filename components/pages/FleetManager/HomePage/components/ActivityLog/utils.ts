import { ITableHeader } from 'components/Table'

export function getHeaderList(): ITableHeader[] {
  const headers: ITableHeader[] = [
    {
      Header: 'TIMESTAMP',
      accessor: 'timestamp',
      disableSortBy: true
    },
    {
      Header: 'CASE ID',
      accessor: 'caseId',
      disableSortBy: true
    },
    {
      Header: 'USER',
      accessor: 'user',
      disableSortBy: true
    },
    {
      Header: 'DESCRIPTION',
      accessor: 'description',
      disableSortBy: true
    },
    {
      Header: 'ACTIVITY',
      accessor: 'activity',
      disableSortBy: true
    }
  ]
  return headers
}
