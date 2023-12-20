const superAdminRoutes = {
  superAdmin: {
    value: '/super-admin',
    home: {
      value: (fleetId: string) => `/super-admin/${fleetId}/home`
    },
    cases: {
      value: (fleetId: string) => `/super-admin/${fleetId}/cases`
    },
    vehicles: {
      value: (fleetId: string) => `/super-admin/${fleetId}/vehicles`
    },
    drivers: {
      value: (fleetId: string) => `/super-admin/${fleetId}/drivers`
    },
    activity: {
      value: (fleetId: string) => `/super-admin/${fleetId}/activity`
    },
    reports: {
      value: (fleetId: string) => `/super-admin/${fleetId}/reports`
    },
    admin: {
      value: (fleetId: string) => `/super-admin/${fleetId}/admin`
    },
    setFleet: {
      value: '/super-admin/set-fleet'
    }
  }
}

export default superAdminRoutes
