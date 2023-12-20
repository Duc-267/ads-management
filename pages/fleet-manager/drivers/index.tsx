import FleetManagerLayout from 'components/Layout/FleetManagerLayout'
import DriverPage from 'components/pages/FleetManager/DriverPage'
import React from 'react'

const FleetManagerDriverPage = () => {
  return (
    <FleetManagerLayout title={`ONO | Driver`}>
      <DriverPage />
    </FleetManagerLayout>
  )
}

export default FleetManagerDriverPage
