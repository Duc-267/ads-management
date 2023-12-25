import { get } from 'lodash'
import { api, auth, errorHandler } from 'API'
import { UserRoleEnum } from 'enums/userRole'
import { IDriver, IDriverCreateParams } from 'interfaces/driver'
import { CommonError } from 'types'
import { IFilter, IPaginationList } from 'types/common'

export async function getDrivers(fleetId: string, filter: IFilter<IDriver>): Promise<IPaginationList<IDriver>> {
  try {
    const role: UserRoleEnum = UserRoleEnum.DRIVER
    const response = await api.post(`/users/${role}/list?filter=${JSON.stringify(filter)}`, fleetId, {
      headers: auth()
    })
    const data: IPaginationList<IDriver> = response?.data ?? []
    return data
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return {} as IPaginationList<IDriver>
  }
}

export async function createDriver(params: IDriverCreateParams) {
  try {
    const response = await api.post(`/users`, params, {
      headers: auth()
    })
    const data = response?.data ?? {}
    return data
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return error
  }
}

interface IUploadImage {
  file: File
  fleetID?: string
  userID?: string
}

export async function uploadFile(params: IUploadImage) {
  try {
    const formData = new FormData()
    formData.append('file', get(params, 'file') as File)
    const response = await api.post(`/upload-file`, formData, {
      headers: auth()
    })
    const data: any[] = response?.data ?? []
    return data
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return error
  }
}
