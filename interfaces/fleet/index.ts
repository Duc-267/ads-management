import { ICaseDetail } from 'interfaces/case'
import { IContact } from 'interfaces/contact'
import { IUser } from 'interfaces/user'
import { IUserInformation } from 'interfaces/userInformation'
import { IVehicle } from 'interfaces/vehicle'

export interface IFleet
  extends Pick<
    IFleetCompanyView,
    | 'numberOfCloseCase'
    | 'numberOfSubmittedCase'
    | 'numberOfNotSubmittedCase'
    | 'numberOfProcessingCase'
    | 'numberOfProcessedCase'
    | 'numberOfCloseCase'
    | 'numberOfVehicle'
    | 'numberOfFleetAdmin'
    | 'numberOfDrivers'
  > {
  id?: string
  name: string
  logo?: string
  fleetManager: IUserInformation
  contact: IContact
}

export interface ISelectFleetFormData {
  fleet: string
}

export interface IFleetManager {
  email: string
  name: string
  phoneNumber: string
}

export interface IFleetContact {
  name: string
  contactPhone: string
  contactEmail: string
}

export interface IFLeetOptions {
  id: string
  name: string
}

export interface IFleetCompanyView {
  name: string
  numberOfSubmittedCase: number
  numberOfNotSubmittedCase: number
  numberOfProcessingCase: number
  numberOfProcessedCase: number
  numberOfCloseCase: number
  numberOfVehicle: number
  numberOfFleetAdmin: number
  numberOfDrivers: number
  isDeleted: boolean
  id: string
}

export interface IResponseSearchValue {
  vehicles?: IVehicle[]
  drivers?: IUser[]
  cases?: ICaseDetail[]
}

export interface IDataSubmit {
  fleetEmail: string
  fleetManagerEmail: string
  fleetManagerName: string
  fleetManagerPhone: string
  fleetName: string
  fleetPhone: string
  file?: File
  logo?: string
}
