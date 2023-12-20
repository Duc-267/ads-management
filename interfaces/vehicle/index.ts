import { VehicleStatusEnum } from 'enums/vehicleStatus'

export interface IVehicle {
  createdAt?: Date
  updatedAt?: Date
  id?: string
  status?: VehicleStatusEnum
  registrationNumber?: string
  firstRegisteredDate?: Date
  make?: string
  model?: string
  yearOfManufacture?: number
  vinNumber?: string
  engineCC?: string
  colour?: string
  paintCode?: string
  fuelType?: string
  description?: string
  insuredByFleet?: boolean
  hasDashCam?: boolean
  fleetIds?: string[]
}

export interface IGetVehicleParams {
  vehicleID: string
  fleetID: string
}

export interface IFilterChartDate {
  startDate: string
  endDate: string
}

export enum EDiesel {
  DIESEL = 'Diesel',
  ELECTRIC = 'Electric',
  GASOLINE = 'Gasoline',
  HYBRID = 'Hybrid',
  GAS = 'Gas',
  HYDROGEN = 'Hydrogen',
  BIO_DIESEL = 'Biodiesel',
  ETHANOL = 'Ethanol',
  PROPANE = 'Propane',
  OTHER = 'Other'
}
