import { makeAutoObservable } from 'mobx'
import { getActivityLogs, getAllFleet, getCasesDetail } from 'API/fleet'
import { FlagEnum } from 'enums/flag'
import { IActivityLog } from 'interfaces/activityLog'
import { ICaseDetail } from 'interfaces/case'
import { IFleet } from 'interfaces/fleet'
import { RootStore } from '.'

class FleetStore {
  fleets: IFleet[] = [] as IFleet[]
  cases: ICaseDetail[] = [] as ICaseDetail[]
  activityLogs: IActivityLog[] = [] as IActivityLog[]
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  async fetchFleets(): Promise<void> {
    try {
      const fleets: IFleet[] = await getAllFleet()
      this.fleets = fleets
    } catch (error) {
      throw error
    }
  }

  async fetchUrgentCases(fleetId: string): Promise<void> {
    try {
      const cases: ICaseDetail[] = await getCasesDetail(fleetId, FlagEnum.RED)
      this.cases = cases
    } catch (error) {
      throw error
    }
  }

  async fetchActivityLogs(fleetId: string): Promise<void> {
    try {
      const activityLogs: IActivityLog[] = await getActivityLogs(fleetId)
      this.activityLogs = activityLogs
    } catch (error) {
      throw error
    }
  }
}

export default FleetStore
