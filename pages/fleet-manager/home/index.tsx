import React from 'react'
import FleetManagerLayout from 'components/Layout/FleetManagerLayout'
import HomePage from 'components/pages/FleetManager/HomePage'

const FleetManagerHomePage = () => {
  return (
    <FleetManagerLayout title={`ONO | Home`}>
      <HomePage />
    </FleetManagerLayout>
  )
}

export default FleetManagerHomePage
