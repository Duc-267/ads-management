import { DriverProfileStatusEnum } from 'enums/driverProfileStatus'
import { UserRoleEnum } from 'enums/userRole'

export interface IDriver {
  id?: string
  role?: UserRoleEnum
  email?: string
  driverProfile?: IDriverProfile
}

export interface IDriverProfile {
  phone?: string
  name?: string
  address?: string
  dateOfBirth?: Date | string
  profileImage?: string
  drivingLicenseNumber: string
  nationalInsuranceNumber: string
  insurer: string
  policyNumber: string
  fleetInsuredNumber: string
  status: DriverProfileStatusEnum
  email?: string
  file?: File
}
export enum EDriverRole {
  DRIVER = 'Driver'
}
export interface IDriverCreateParams {
  email: string
  role?: EDriverRole
  driverProfile: Partial<IDriverProfile>
  fleetId?: string
}
