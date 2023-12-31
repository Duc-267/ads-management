import React, { useState } from 'react'
import AuthenticationLayout from 'components/Layout/AuthenticationLayout'
import AuthenticatePage from 'components/pages/AuthenticatePage'
import { EAuthenticatePageName, EAuthenticatePageType } from 'components/pages/AuthenticatePage/constant'

const OwnerForgotPassword = () => {
  const [namePage, setNamePage] = useState(EAuthenticatePageName.FORGOT_PASSWORD)
  return (
    <AuthenticationLayout title={`${namePage}`}>
      <AuthenticatePage type={EAuthenticatePageType.FORGOT_PASSWORD} setNamePage={setNamePage} />
    </AuthenticationLayout>
  )
}

export default OwnerForgotPassword
