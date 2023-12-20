import AuthenticationLayout from 'components/Layout/AuthenticationLayout'
import AuthenticatePage from 'components/pages/AuthenticatePage'
import { EAuthenticatePageName, EAuthenticatePageType } from 'components/pages/AuthenticatePage/constant'
import React, { useState } from 'react'

const OwnerResetPasswordPage = () => {
  const [namePage, setNamePage] = useState(EAuthenticatePageName.RESET_PASSWORD)

  return (
    <AuthenticationLayout title={`${namePage}`}>
      <AuthenticatePage type={EAuthenticatePageType.RESET_PASSWORD} setNamePage={setNamePage} />
    </AuthenticationLayout>
  )
}

export default OwnerResetPasswordPage
