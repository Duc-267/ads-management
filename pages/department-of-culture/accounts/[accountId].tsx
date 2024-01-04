import React from 'react'
import DepartmentOfCultureLayout from 'components/Layout/DepartmentOfCultureLayout'
import AccountDetailPage from 'components/pages/DepartmentOfCulture/AccountDetailPage'

const DepartmentOfCultureAccountsPage = () => {
  return (
    <DepartmentOfCultureLayout title={`Ad Management`}>
      <AccountDetailPage />
    </DepartmentOfCultureLayout>
  )
}

export default DepartmentOfCultureAccountsPage
