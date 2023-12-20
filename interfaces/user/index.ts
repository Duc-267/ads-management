export interface IUser {
  email: string
  createdAt?: Date
  updatedAt?: Date
  id?: string
  username?: string
  role?: string
  name?: string
  phone?: string
  dateOfBirth?: Date
  address?: string
  driverProfile?: IDriverProfile
  profileImage?: string
  isInactive?: boolean
  resetPasswordToken?: string
  sendInvitationEmailCount?: number
  fleetIds?: string[]
}

export interface IDriverProfile {}

export interface IVerifyTokenResponse {
  isValidToken: boolean
}
