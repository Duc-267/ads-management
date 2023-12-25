import React from 'react'
import FleetManagerLayout from 'components/Layout/FleetManagerLayout'
import VehiclePage from 'components/pages/FleetManager/VehiclePage'

const FleetManagerVehiclePage = () => {
  return (
    <FleetManagerLayout title={`ONO | Vehicle`}>
      <VehiclePage />
    </FleetManagerLayout>
  )
}

export default FleetManagerVehiclePage
