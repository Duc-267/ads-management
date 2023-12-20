import SuperAdminLayout from 'components/Layout/SuperAdminLayout'
import HomePage from 'components/pages/SuperAdmin/HomePage'

const SuperAdminPage = () => {
  return (
    <SuperAdminLayout title={`ONO | Super admin`}>
      <HomePage />
    </SuperAdminLayout>
  )
}

export default SuperAdminPage
