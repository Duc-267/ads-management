const fleetManagerRoutes = {
  fleetManager: {
    value: '/fleet-manager',
    home: {
      value: `/fleet-manager/home`
    },
    cases: {
      value: `/fleet-manager/cases`
    },
    vehicles: {
      value: `/fleet-manager/vehicles`
    },
    drivers: {
      value: `/fleet-manager/drivers`
    },
    activity: {
      value: `/fleet-manager/activity`
    },
    reports: {
      value: `/fleet-manager/reports`
    },
    admin: {
      value: `/fleet-manager/admin`
    },
    setFleet: {
      value: '/fleet-manager/set-fleet'
    },
    vehicleDetail: {
      value: (fleetId: string, vehicleId: string) => `/fleet-manager/${fleetId}/vehicles/${vehicleId}`
    }
  }
}

export default fleetManagerRoutes
