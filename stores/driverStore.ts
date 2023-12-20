import { getDrivers } from 'API/driver'
import { IDriver } from 'interfaces/driver'
import { makeAutoObservable } from 'mobx'
import { IFilter, IPaginationList } from 'types/common'
import { RootStore } from '.'

class DriverStore {
  drivers: IPaginationList<IDriver> = {
    results: [],
    totalCount: 0
  }
  isLoading: boolean = false
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  async fetchDrivers(fleetId: string, filter: IFilter<IDriver> = {}): Promise<void> {
    try {
      const drivers: IPaginationList<IDriver> = await getDrivers(fleetId, filter)
      this.drivers = drivers
    } catch (error) {
      throw error
    }
  }
}

export default DriverStore
