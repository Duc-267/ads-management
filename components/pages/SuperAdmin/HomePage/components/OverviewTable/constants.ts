export interface IOverviewTableData {
  name: string
  numberOfSubmittedCase: number
  numberOfNotSubmittedCase: number
  numberOfProcessingCase: number
  numberOfProcessedCase: number
  numberOfCloseCase: number
  numberOfVehicle: number
  numberOfFleetAdmin: number
  numberOfDrivers: number
  onClick?: () => void
}
