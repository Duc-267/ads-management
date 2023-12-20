import AuthenticationLayout from 'components/Layout/AuthenticationLayout'
import AuthenticatePage from 'components/pages/AuthenticatePage'
import { EAuthenticatePageName, EAuthenticatePageType } from 'components/pages/AuthenticatePage/constant'
import React, { useState } from 'react'

const SuperAdminSetPasswordPage = () => {
  const [namePage, setNamePage] = useState(EAuthenticatePageName.SUPER_ADMIN_SET_PASSWORD)

  return (
    <AuthenticationLayout title={`${namePage}`}>
      <AuthenticatePage type={EAuthenticatePageType.SUPER_ADMIN_SET_PASSWORD} setNamePage={setNamePage} />
    </AuthenticationLayout>
  )
}

export default SuperAdminSetPasswordPage
