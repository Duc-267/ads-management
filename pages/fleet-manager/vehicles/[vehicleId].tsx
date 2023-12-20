import FleetManagerLayout from 'components/Layout/FleetManagerLayout'
import VehicleDetailPage from 'components/pages/FleetManager/VehicleDetailPage'
import React from 'react'

const FleetManagerVehiclePage = () => {
  return (
    <FleetManagerLayout title={`ONO | Vehicle detail`}>
      <VehicleDetailPage />
    </FleetManagerLayout>
  )
}

export default FleetManagerVehiclePage
