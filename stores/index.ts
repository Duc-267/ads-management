import AuthStore from 'stores/authStore'
import SpinnerStore from 'stores/spinnerStore'
import TestStore from 'stores/testStore'
import DriverStore from './driverStore'
import FleetStore from './fleetStore'
import SuperAdminStore from './superAdminStore'
import VehicleStore from './vehicleStore'

export class RootStore {
  testStore: TestStore
  authStore: AuthStore
  spinnerStore: SpinnerStore
  fleetStore: FleetStore
  vehicleStore: VehicleStore
  driverStore: DriverStore
  superAdminStore: SuperAdminStore

  constructor() {
    this.testStore = new TestStore(this)
    this.authStore = new AuthStore(this)
    this.spinnerStore = new SpinnerStore(this)
    this.vehicleStore = new VehicleStore(this)
    this.fleetStore = new FleetStore(this)
    this.driverStore = new DriverStore(this)
    this.superAdminStore = new SuperAdminStore(this)
  }
}

export const rootStore = new RootStore()
