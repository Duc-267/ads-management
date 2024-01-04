import React from 'react'
import DepartmentOfCultureLayout from 'components/Layout/DepartmentOfCultureLayout'
import SurfacesRequestPage from 'components/pages/DepartmentOfCulture/SurfacesRequestPage'

const DepartmentOfCultureAccountsPage = () => {
  return (
    <DepartmentOfCultureLayout title={`Ad Management`}>
      <SurfacesRequestPage />
    </DepartmentOfCultureLayout>
  )
}

export default DepartmentOfCultureAccountsPage
