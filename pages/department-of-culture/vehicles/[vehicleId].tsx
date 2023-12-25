import React from 'react'
import FleetManagerLayout from 'components/Layout/FleetManagerLayout'
import VehicleDetailPage from 'components/pages/FleetManager/VehicleDetailPage'

const FleetManagerVehiclePage = () => {
  return (
    <FleetManagerLayout title={`ONO | Vehicle detail`}>
      <VehicleDetailPage />
    </FleetManagerLayout>
  )
}

export default FleetManagerVehiclePage
