import { HStack, VStack, useToast } from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import ButtonWithIcon from 'components/ButtonWithIcon'
import withAuth from 'HOCs/withAuth'
import { useStores } from 'hooks/useStores'
import AccountsTable from './components/AccountsTable'
import AddAccountForm from './components/AddAccountForm'
import { AddAccountModal } from './components/AddAccountModal'

const AccountPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const { fleetStore } = useStores()
  const router = useRouter()
  const { fleets } = fleetStore
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)
  // async function fetchFleets(): Promise<void> {
  //   try {
  //     setIsLoading(true)
  //     await fleetStore.fetchFleets()
  //     await fleetStore.fetchUrgentCases(currentFleetId)
  //     await fleetStore.fetchActivityLogs(currentFleetId)
  //     setIsLoading(false)
  //   } catch (error) {
  //     toast({
  //       description: 'Something went wrong',
  //       status: 'error',
  //       duration: 2000,
  //       isClosable: true
  //     })
  //   }
  // }

  // useEffect(
  //   function fetchData() {
  //     if (currentFleetId) {
  //       fetchFleets()
  //     }
  //   },
  //   [currentFleetId]
  // )

  // if (isLoading) {
  //   return (
  //     <Stack width="full" minH="100vh" height="full" alignItems="center" justifyContent="center">
  //       <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
  //     </Stack>
  //   )
  // }
  function handleSubmit(data: any): void {
    console.log(data)
  }

  return (
    <VStack marginLeft={0} width="full" paddingX={4} paddingTop={6}>
      <ButtonWithIcon
        size={16}
        label="Thêm tài khoản"
        iconName="ic-add.svg"
        onClick={() => {
          setIsOpenModal(true)
        }}
      />
      <VStack width="full" spacing={4}>
        <HStack width="full" spacing={5} margin={0} justifyContent="space-between">
          <AccountsTable />
        </HStack>
      </VStack>
      <AddAccountModal
        isLoading={isSubmitting}
        title="Thêm tài khoản"
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false)
        }}
        secondaryText="Thêm"
        onSecondaryClick={() => {
          formRef.current && formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
        }}
      >
        <AddAccountForm formRef={formRef} onSubmit={handleSubmit} />
      </AddAccountModal>
    </VStack>
  )
}

export default observer(withAuth(AccountPage))
