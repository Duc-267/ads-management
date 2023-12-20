import { ITableHeader } from 'components/Table'

export function getHeaderList(): ITableHeader[] {
  const headers: ITableHeader[] = [
    {
      Header: 'FULL NAME',
      accessor: 'name',
      disableSortBy: true
    },
    {
      Header: 'NOT SUBMITTED CASES',
      accessor: 'numberOfNotSubmittedCase',
      disableSortBy: true
    },
    {
      Header: 'SUBMITTED CASES',
      accessor: 'numberOfSubmittedCase',
      disableSortBy: true
    },
    {
      Header: 'Processing cases',
      accessor: 'numberOfProcessingCase',
      disableSortBy: true
    },
    {
      Header: 'PROCESSED CASES',
      accessor: 'numberOfProcessedCase',
      disableSortBy: true
    },
    {
      Header: 'CLOSED CASES',
      accessor: 'numberOfCloseCase',
      disableSortBy: true
    },
    {
      Header: 'VEHICLES',
      accessor: 'numberOfVehicle',
      disableSortBy: true
    },
    {
      Header: 'FLEET ADMIN',
      accessor: 'numberOfFleetAdmin',
      disableSortBy: true
    },
    {
      Header: 'DRIVERS',
      accessor: 'numberOfDrivers',
      disableSortBy: true
    }
  ]
  return headers
}
