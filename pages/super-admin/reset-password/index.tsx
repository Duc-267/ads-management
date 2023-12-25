import React, { useState } from 'react'
import AuthenticationLayout from 'components/Layout/AuthenticationLayout'
import AuthenticatePage from 'components/pages/AuthenticatePage'
import { EAuthenticatePageName, EAuthenticatePageType } from 'components/pages/AuthenticatePage/constant'

const OwnerResetPasswordPage = () => {
  const [namePage, setNamePage] = useState(EAuthenticatePageName.SUPER_ADMIN_RESET_PASSWORD)

  return (
    <AuthenticationLayout title={`${namePage}`}>
      <AuthenticatePage type={EAuthenticatePageType.SUPER_ADMIN_RESET_PASSWORD} setNamePage={setNamePage} />
    </AuthenticationLayout>
  )
}

export default OwnerResetPasswordPage
