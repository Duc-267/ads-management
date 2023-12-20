import FleetManagerLayout from 'components/Layout/FleetManagerLayout'
import { EAuthenticatePageName } from 'components/pages/AuthenticatePage/constant'
import SetFleetPage from 'components/pages/FleetManager/SetFleetPage'
import withAuth from 'HOCs/withAuth'
import { observer } from 'mobx-react'
import React, { useState } from 'react'

const OwnerSetFleetPage = () => {
  const [namePage, setNamePage] = useState(EAuthenticatePageName.SELECT_FLEET)
  return (
    <FleetManagerLayout title={`${namePage}`} isAuthLayout={true}>
      <SetFleetPage setNamePage={setNamePage} />
    </FleetManagerLayout>
  )
}

export default observer(withAuth(OwnerSetFleetPage))
