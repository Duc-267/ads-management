import FleetManagerLayout from 'components/Layout/FleetManagerLayout'
import VehiclePage from 'components/pages/FleetManager/VehiclePage'
import React from 'react'

const FleetManagerVehiclePage = () => {
  return (
    <FleetManagerLayout title={`ONO | Vehicle`}>
      <VehiclePage />
    </FleetManagerLayout>
  )
}

export default FleetManagerVehiclePage
