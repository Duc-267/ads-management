export interface ISpaceTableData {
  id: string
  address: string
  long: number
  lat: number
  format: string
  isPlanned: boolean
  wardId: string
  onClick?: () => void
}
