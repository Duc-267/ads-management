import AdminAuthenticationRoutes from './admin-authentication'
import AuthenticationRoutes from './authentication'
import departmentOfCultureRoutes from './department-of-culture'
import fleetManagerRoutes from './fleet-manager'
import superAdminRoutes from './super-admin'

const routes = {
  home: {
    value: '/'
  },
  setPassword: {
    value: `/set-password`
  },
  auth: AuthenticationRoutes,
  adminAuth: AdminAuthenticationRoutes,
  ...fleetManagerRoutes,
  ...superAdminRoutes,
  ...departmentOfCultureRoutes
}

export default routes
