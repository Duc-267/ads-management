import { get } from 'lodash'
import { api, auth, errorHandler } from 'API'
import { IFilterChartDate, IGetVehicleParams, IVehicle } from 'interfaces/vehicle'
import { CommonError } from 'types'
import { IFilter, IPaginationList } from 'types/common'

export async function getVehicles(fleetId: string, filter: IFilter<IVehicle>): Promise<IPaginationList<IVehicle>> {
  try {
    const response = await api.post(`/vehicles/list?filter=${JSON.stringify(filter)}`, fleetId, {
      headers: auth()
    })
    const data: IPaginationList<IVehicle> = response?.data ?? []
    return data
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return {} as IPaginationList<IVehicle>
  }
}

export async function createVehicle(params: IVehicle) {
  try {
    const response = await api.post(`/vehicles`, params, {
      headers: auth()
    })
    const data = response?.data ?? []
    return data
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return error
  }
}

export async function getVehicleReport(params: IGetVehicleParams, filter: IFilter<IFilterChartDate>) {
  try {
    const response = await api.post(
      `/vehicles/${get(params, 'vehicleID', '')}/report?filter=${JSON.stringify(filter)}`,
      get(params, 'fleetID', ''),
      {
        headers: auth()
      }
    )
    const data = response?.data ?? []
    return data
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return []
  }
}

export async function getVehicleDetail(vehicleID: string): Promise<IVehicle> {
  try {
    const response = await api.get(`/vehicles/${vehicleID}`, {
      headers: auth()
    })
    const data: IVehicle = response?.data ?? []
    return data
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return {} as IVehicle
  }
}

export async function updateVehicle(params: IVehicle, vehicleID: string) {
  try {
    const response = await api.put(`/vehicles/${vehicleID}`, params, {
      headers: auth()
    })
    if (response.status === 204) {
      const data: IVehicle = params ?? {}
      return data
    }
    return {}
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return {} as IVehicle
  }
}
