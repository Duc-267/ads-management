import React, { useState } from 'react'
import AuthenticationLayout from 'components/Layout/AuthenticationLayout'
import AuthenticatePage from 'components/pages/AuthenticatePage'
import { EAuthenticatePageName, EAuthenticatePageType } from 'components/pages/AuthenticatePage/constant'

const OwnerSetPasswordPage = () => {
  const [namePage, setNamePage] = useState(EAuthenticatePageName.SET_PASSWORD)

  return (
    <AuthenticationLayout title={`${namePage}`}>
      <AuthenticatePage type={EAuthenticatePageType.SET_PASSWORD} setNamePage={setNamePage} />
    </AuthenticationLayout>
  )
}

export default OwnerSetPasswordPage
