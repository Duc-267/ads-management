import AuthenticationLayout from 'components/Layout/AuthenticationLayout'
import AuthenticatePage from 'components/pages/AuthenticatePage'
import { EAuthenticatePageName, EAuthenticatePageType } from 'components/pages/AuthenticatePage/constant'
import React, { useState } from 'react'

const OwnerLogin = () => {
  const [namePage, setNamePage] = useState(EAuthenticatePageName.LOGIN)
  return (
    <AuthenticationLayout title={`${namePage}`}>
      <AuthenticatePage type={EAuthenticatePageType.LOGIN} setNamePage={setNamePage} />
    </AuthenticationLayout>
  )
}

export default OwnerLogin
