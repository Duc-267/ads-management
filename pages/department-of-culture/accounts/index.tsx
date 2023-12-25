import React from 'react'
import DepartmentOfCultureLayout from 'components/Layout/DepartmentOfCultureLayout'
import AccountPage from 'components/pages/DepartmentOfCulture/AccountPage'

const DepartmentOfCultureAccountsPage = () => {
  return (
    <DepartmentOfCultureLayout title={`Ad Management`}>
      <AccountPage />
    </DepartmentOfCultureLayout>
  )
}

export default DepartmentOfCultureAccountsPage
