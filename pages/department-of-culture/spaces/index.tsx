import React from 'react'
import DepartmentOfCultureLayout from 'components/Layout/DepartmentOfCultureLayout'
import SpacesPage from 'components/pages/DepartmentOfCulture/SpacesPage'

const DepartmentOfCultureSpacesPage = () => {
  return (
    <DepartmentOfCultureLayout title={`Ad Management`}>
      <SpacesPage />
    </DepartmentOfCultureLayout>
  )
}

export default DepartmentOfCultureSpacesPage
