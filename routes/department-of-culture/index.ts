const departmentOfCultureRoutes = {
  departmentOfCulture: {
    value: '/department-of-culture',
    accounts: {
      value: `/department-of-culture/accounts`
    },
    accountDetails: {
      value: (id: string) => `/department-of-culture/accounts/${id}`
    },
    spaces: {
      value: `/department-of-culture/spaces`
    },
    surfaces: {
      value: `/department-of-culture/surfaces`
    },
    surfacesRequests: {
      value: `/department-of-culture/surfaces-requests`
    }
  }
}

export default departmentOfCultureRoutes
