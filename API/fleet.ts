import { api, auth, errorHandler } from 'API'
import { EValueFilter, IDataChart } from 'components/BarChart'
import { IFleetCreateParam, IPostImageFleetForm } from 'components/pages/SuperAdmin/HomePage/components/FleetForm/types'
import { FlagEnum } from 'enums/flag'
import { IActivityLog } from 'interfaces/activityLog'
import { ICaseDetail } from 'interfaces/case'
import { IFleet, IFleetCompanyView, IResponseSearchValue } from 'interfaces/fleet'
import { get } from 'lodash'
import { CommonError } from 'types'

export async function getAllFleet(): Promise<IFleet[]> {
  try {
    const response = await api.get(`/fleets`, {
      headers: auth()
    })
    const data: IFleet[] = response?.data ?? []
    return data
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return [] as IFleet[]
  }
}

export async function getAllIncidents(fleetID: string, stage: EValueFilter): Promise<IDataChart[]> {
  try {
    const response = await api.get(`/fleets/${fleetID}/incidents/stage/${stage}`, {
      headers: auth()
    })
    const data: IDataChart[] = response?.data ?? []
    return data
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return [] as IDataChart[]
  }
}

export async function getCasesDetail(fleetID: string, priorityColor: FlagEnum): Promise<ICaseDetail[]> {
  try {
    const response = await api.get(`/fleets/${fleetID}/cases/${priorityColor}`, {
      headers: auth()
    })
    const data: ICaseDetail[] = response?.data ?? []
    return data
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return [] as ICaseDetail[]
  }
}

export async function getActivityLogs(fleetID: string): Promise<IActivityLog[]> {
  try {
    const response = await api.get(`/fleets/${fleetID}/activity-logs`, {
      headers: auth()
    })
    const data: IActivityLog[] = response?.data ?? []
    return data
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return [] as IActivityLog[]
  }
}

export async function getFleetCompaniesView(): Promise<IFleetCompanyView[]> {
  try {
    const response = await api.get(`/fleets/companies`, {
      headers: auth()
    })
    const data: IFleetCompanyView[] = response?.data ?? []
    return data
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return [] as IFleetCompanyView[]
  }
}

export async function searchFleetView(fleetID: string, searchString: string): Promise<IResponseSearchValue> {
  try {
    const response = await api.get(`/fleets/${fleetID}/search/${searchString}`, {
      headers: auth()
    })
    const data: IResponseSearchValue = response?.data ?? {}
    return data
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return {} as IResponseSearchValue
  }
}

export async function createFleet(params: IFleetCreateParam) {
  try {
    const response = await api.post(`/fleets`, params, {
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

export async function postImageFleet(params: IPostImageFleetForm) {
  try {
    const formData = new FormData()
    formData.append('file', get(params, 'file') as File)
    const response = await api.post(`/fleets/upload-logo`, formData, {
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

export async function unarchiveFleetCompany(fleetId: string): Promise<void> {
  try {
    await api.post(
      `/fleets/unarchive/${fleetId}`,
      {},
      {
        headers: auth()
      }
    )
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    throw new Error(error)
  }
}

export async function archiveFleetCompany(fleetId: string): Promise<void> {
  try {
    await api.delete(`/fleets/${fleetId}`, {
      headers: auth()
    })
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    throw new Error(error)
  }
}

export async function getFleetById(fleetID: string): Promise<IFleet> {
  try {
    const response = await api.get(`/fleets/${fleetID}`, {
      headers: auth()
    })
    const data: IFleet = response?.data ?? {}
    return data
  } catch (err) {
    const error = (<CommonError>err)?.response?.data?.error
    errorHandler(error)
    return {} as IFleet
  }
}

export async function editFleet(fleetId: string, params: IFleetCreateParam) {
  try {
    const response = await api.put(`/fleets/${fleetId}`, params, {
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
