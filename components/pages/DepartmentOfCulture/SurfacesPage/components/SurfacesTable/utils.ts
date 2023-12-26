import { ITableHeader } from 'components/Table'

export function getHeaderList(): ITableHeader[] {
  const headers: ITableHeader[] = [
    {
      Header: 'ID',
      accessor: 'id',
      disableSortBy: true
    },
    {
      Header: 'FORMAT',
      accessor: 'format',
      disableSortBy: true
    },
    {
      Header: 'WIDTH',
      accessor: 'width',
      disableSortBy: true
    },
    {
      Header: 'HEIGHT',
      accessor: 'height',
      disableSortBy: true
    },
    {
      Header: 'SPACE ID',
      accessor: 'spaceId',
      disableSortBy: true
    }
  ]
  return headers
}
