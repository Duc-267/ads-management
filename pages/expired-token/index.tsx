import AuthenticationLayout from 'components/Layout/AuthenticationLayout'
import AuthenticatePage from 'components/pages/AuthenticatePage'
import { EAuthenticatePageName, EAuthenticatePageType } from 'components/pages/AuthenticatePage/constant'
import React, { useState } from 'react'

const OwnerExpiredToken = () => {
  const [namePage, setNamePage] = useState(EAuthenticatePageName.EXPIRED_LINK)
  return (
    <AuthenticationLayout title={`${namePage}`}>
      <AuthenticatePage type={EAuthenticatePageType.EXPIRED_LINK} setNamePage={setNamePage} />
    </AuthenticationLayout>
  )
}

export default OwnerExpiredToken
