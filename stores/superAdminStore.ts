import { makeAutoObservable } from 'mobx'
import { getFleetCompaniesView, unarchiveFleetCompany } from 'API/fleet'
import { IFleetCompanyView } from 'interfaces/fleet'
import { RootStore } from '.'

class SuperAdminStore {
  rootStore: RootStore
  fleetCompanies: IFleetCompanyView[] = [] as IFleetCompanyView[]

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  async getFleetCompany(): Promise<void> {
    try {
      const fleetCompany: IFleetCompanyView[] = await getFleetCompaniesView()
      this.fleetCompanies = fleetCompany
    } catch (error) {
      throw error
    }
  }

  async unarchiveFleetCompany(id: string): Promise<void> {
    try {
      await unarchiveFleetCompany(id)
    } catch (error) {
      throw error
    }
  }
}

export default SuperAdminStore
