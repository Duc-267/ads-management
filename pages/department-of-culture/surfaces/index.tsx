import React from 'react'
import DepartmentOfCultureLayout from 'components/Layout/DepartmentOfCultureLayout'
import SurfacesPage from 'components/pages/DepartmentOfCulture/SurfacesPage'

const DepartmentOfCultureAccountsPage = () => {
  return (
    <DepartmentOfCultureLayout title={`Ad Management`}>
      <SurfacesPage />
    </DepartmentOfCultureLayout>
  )
}

export default DepartmentOfCultureAccountsPage
