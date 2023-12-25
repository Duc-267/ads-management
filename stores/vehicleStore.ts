import { makeAutoObservable } from 'mobx'
import { getVehicleDetail, getVehicles, updateVehicle } from 'API/vehicle'
import { IVehicle } from 'interfaces/vehicle'
import { IFilter, IPaginationList } from 'types/common'
import { RootStore } from '.'

class FleetStore {
  vehicles: IPaginationList<IVehicle> = {
    results: [],
    totalCount: 0
  }
  vehicle: IVehicle = {}
  isLoading: boolean = false
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  async fetchVehicles(fleetId: string, filter: IFilter<IVehicle> = {}): Promise<void> {
    try {
      this.isLoading = true
      const vehicles: IPaginationList<IVehicle> = await getVehicles(fleetId, filter)
      this.vehicles = vehicles
      this.isLoading = false
    } catch (error) {
      this.isLoading = false
      throw error
    }
  }

  async fetchVehicleDetail(vehicleID: string) {
    try {
      this.isLoading = true
      const result = await getVehicleDetail(vehicleID)
      if (result) {
        this.vehicle = result
      }
      this.isLoading = false
    } catch (err) {
      this.isLoading = false
      throw err
    }
  }

  async storeUpdateVehicle(params: IVehicle, vehicleID: string) {
    try {
      this.isLoading = true
      const result: IVehicle = await updateVehicle(params, vehicleID)
      this.isLoading = false
      return result
    } catch (err) {
      this.isLoading = false
      throw err
    }
  }

  resetVehicle(vehicle: IVehicle) {
    this.vehicle = { ...vehicle }
    if (vehicle) {
    }
  }
}

export default FleetStore
