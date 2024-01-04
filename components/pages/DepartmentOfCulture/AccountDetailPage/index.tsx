import { Box, useToast } from '@chakra-ui/react'
import get from 'lodash/get'
import { observer } from 'mobx-react'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { UseFormSetError } from 'react-hook-form'
import NavigateBar from 'components/NavigateBar'
import withAuth from 'HOCs/withAuth'
import { useStores } from 'hooks/useStores'
import { EDriverRole, IDriverCreateParams, IDriverProfile } from 'interfaces/driver'
import AccountDetail from './components/AccountDetail'

const AccountDetailPage = () => {
  const router = useRouter()
  const { driverStore } = useStores()
  const currentAccountId: string = get(router, 'query.accountId')
  console.log("🚀 ~ file: index.tsx:19 ~ DriverDetailPage ~ currentAccountId:", currentAccountId)
  const toast = useToast()
  // useEffect(() => {
  //   if (currentDriverId && currentFleetId) {
  //     driverStore.fetchDriverDetail(currentFleetId, currentDriverId)
  //   }
  // }, [currentDriverId, currentFleetId])

  const handleSubmit = async (data: Partial<IDriverProfile>, cb?: UseFormSetError<Partial<IDriverProfile>>) => {
    try {
      const createDriverBody: IDriverCreateParams = {
        email: data.email as string,
        role: EDriverRole.DRIVER,
        driverProfile: {
          address: data?.address,
          phone: data?.phone,
          name: data?.name,
          dateOfBirth: moment(data?.dateOfBirth ? new Date(data?.dateOfBirth) : new Date(), 'DD/MM/YYYY').toISOString(),
          drivingLicenseNumber: data?.drivingLicenseNumber,
          nationalInsuranceNumber: data?.nationalInsuranceNumber,
          status: data.status,
          insurer: data?.insurer,
          policyNumber: data?.policyNumber,
          fleetInsuredNumber: data?.fleetInsuredNumber
        }
      }
      toast({
        description: 'Update Driver successfully',
        status: 'success'
      })
    } catch (error) {
      toast({
        description: get(error, 'message') ?? 'Update Driver failed',
        status: 'error'
      })
    }
  }
  return (
    <>
      <Box margin={0} width="full" paddingBottom={5}>
        {/* Navigate Bar */}
        <NavigateBar
          title="Thông tin tài khoản"
          handleBack={() => {
            router.back()
          }}
        />
        <AccountDetail driverID={'currentDriverId'} fleetID={'currentFleetId'} handleSubmit={handleSubmit} />
      </Box>
    </>
  )
}

export default observer(withAuth(AccountDetailPage))
