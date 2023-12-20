import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, TabIndicator, Card, CardBody } from '@chakra-ui/react'
import { getVehicleReport } from 'API/vehicle'
import BarChart, { EValueFilter, IDataChart } from 'components/BarChart'
import NavigateBar from 'components/NavigateBar'
import withAuth from 'HOCs/withAuth'
import { useStores } from 'hooks/useStores'
import get from 'lodash/get'
import { observer } from 'mobx-react'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import VehicleDetail from '../components/VehicleDetail'

const generateFilterDataChart = () => {
  const startDate = new Date()
  startDate.setDate(1) // Set the day of the month to 1

  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() + 12) // Set the day of the month to 1
  return {
    startDate: moment(startDate).format('YYYY-MM-DD'),
    endDate: moment(endDate).format('YYYY-MM-DD')
  }
}

const VehicleDetailPage = () => {
  const router = useRouter()
  const [vehicleReport, setVehicleReport] = useState<IDataChart[]>([])
  const { vehicleStore } = useStores()
  const currentFleetId: string = get(router, 'query.fleetId')
  const currentVehicleId: string = get(router, 'query.vehicleId')
  useEffect(() => {
    const fetch = async () => {
      const result = await getVehicleReport(
        { vehicleID: currentVehicleId, fleetID: currentFleetId },
        {
          where: generateFilterDataChart()
        }
      )
      setVehicleReport(result)

      await vehicleStore.fetchVehicleDetail(currentVehicleId)
    }

    if (currentVehicleId && currentFleetId) {
      fetch()
    }
  }, [currentFleetId, currentVehicleId])

  return (
    <>
      <Box margin={0} width="full" paddingBottom={12}>
        {/* Navigate Bar */}
        <NavigateBar
          title="Vehicle details"
          handleBack={() => {
            router.back()
          }}
        />
        {/*  */}
        <Tabs position="relative" variant="unstyled">
          <TabList background={'#fff'}>
            <Tab _selected={{ color: '#EF7A37' }}>Vehicle information</Tab>
            <Tab _selected={{ color: '#EF7A37' }}>Vehicle report</Tab>
          </TabList>
          <TabIndicator mt="-1.5px" height="2px" bg="#EF7A37" borderRadius="1px" />
          <TabPanels>
            <TabPanel>
              <Box m="0 auto" w="80%">
                <VehicleDetail vehicleID={currentVehicleId} fleetID={currentFleetId} />
              </Box>
            </TabPanel>

            <TabPanel>
              <Card width={'80%'} margin="0 auto">
                <CardBody>
                  <BarChart valueFilter={EValueFilter.Year} dataChart={vehicleReport} />
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export default observer(withAuth(VehicleDetailPage))
