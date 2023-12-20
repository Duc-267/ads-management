import FleetManagerLayout from 'components/Layout/FleetManagerLayout'
import HomePage from 'components/pages/FleetManager/HomePage'
import React from 'react'

const FleetManagerHomePage = () => {
  return (
    <FleetManagerLayout title={`ONO | Home`}>
      <HomePage />
    </FleetManagerLayout>
  )
}

export default FleetManagerHomePage
