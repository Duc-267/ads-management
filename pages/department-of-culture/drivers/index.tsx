import React from 'react'
import FleetManagerLayout from 'components/Layout/FleetManagerLayout'
import DriverPage from 'components/pages/FleetManager/DriverPage'

const FleetManagerDriverPage = () => {
  return (
    <FleetManagerLayout title={`ONO | Driver`}>
      <DriverPage />
    </FleetManagerLayout>
  )
}

export default FleetManagerDriverPage
