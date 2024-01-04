import { Card, CardHeader, CardBody, Heading, Flex, CardFooter, Button, HStack } from '@chakra-ui/react'
import { get } from 'lodash'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { DriverProfileStatusEnum } from 'enums/driverProfileStatus'
import { useStores } from 'hooks/useStores'
import { IDriverProfile } from 'interfaces/driver'
import AccountDetailForm from '../AccountDetailForm'

interface IAccountDetailProps {
  driverID: string
  fleetID: string
  handleSubmit: (params: Partial<IDriverProfile>, cb?: UseFormSetError<Partial<IDriverProfile>>) => void
}

const AccountDetail = (props: IAccountDetailProps) => {
  const { handleSubmit } = props
  const formRef = useRef<HTMLFormElement>(null)
  const { driverStore } = useStores()
  // const { driverDetail } = driverStore
  const [driverStatus, setDriverStatus] = useState(DriverProfileStatusEnum.ACTIVE)
  const router = useRouter()
  const currentFleetId: string = get(router, 'query.fleetId')
  const currentDriverId: string = get(router, 'query.driverId')
  // useEffect(() => {
  //   if (driverDetail?.driverProfile?.status) {
  //     setDriverStatus(driverDetail?.driverProfile?.status)
  //   }
  // }, [driverDetail?.driverProfile?.status])

  return (
    <HStack spacing={4} paddingX={4} paddingY={6} alignItems="flex-start">
      <Card width={'full'}>
        <CardHeader borderBottom={'1px'} borderColor={'gray.300'}>
          <Flex justifyContent={'space-between'}>
            <Heading size="md">Thông tin tài khoản</Heading>
          </Flex>
        </CardHeader>

        <CardBody>
          <AccountDetailForm/>
        </CardBody>
      </Card>
    </HStack>
  )
}

export default observer(AccountDetail)
