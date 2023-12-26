import React from 'react'
import DepartmentOfCultureLayout from 'components/Layout/DepartmentOfCultureLayout'
import SurfacesPage from 'components/pages/DepartmentOfCulture/SpacePage'

const DepartmentOfCultureAccountsPage = () => {
  return (
    <DepartmentOfCultureLayout title={`Ad Management`}>
      <SurfacesRequestPage />
    </DepartmentOfCultureLayout>
  )
}

export default DepartmentOfCultureAccountsPage
