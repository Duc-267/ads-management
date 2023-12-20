import { VehicleStatusEnum } from 'enums/vehicleStatus'

export interface IVehicleQueryParams {
  date?: string | string[]
  insuredBy?: string
  status?: VehicleStatusEnum
  model?: string
  make?: string
  yearOfManufacture?: number
}
