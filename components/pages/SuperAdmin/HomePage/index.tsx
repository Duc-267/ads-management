import { VStack, HStack, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { archiveFleetCompany, createFleet, editFleet, getFleetById, postImageFleet } from 'API/fleet'
import ButtonWithIcon from 'components/ButtonWithIcon'
import { ModalCustom } from 'components/pages/SuperAdmin/HomePage/components/CommonModal'
import FleetForm from 'components/pages/SuperAdmin/HomePage/components/FleetForm'
import { IFleetCreateParam } from 'components/pages/SuperAdmin/HomePage/components/FleetForm/types'
import Tabs, { ITabData } from 'components/pages/SuperAdmin/HomePage/components/Tabs'
import { useStores } from 'hooks/useStores'
import { IDataSubmit, IFleet } from 'interfaces/fleet'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import routes from 'routes'
import ArchiveTable from './components/ArchiveTable'
import OverviewTable from './components/OverviewTable'
import { ModalWrapper } from './homePage.styles'

const HomePage = () => {
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isFleetDetail, setIsFleetDetail] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()

  const [selectedFleetId, setSelectedFleetId] = useState<string>('')
  const [selectedFleet, setSelectedFleet] = useState<IFleet | undefined>(undefined)
  const { superAdminStore } = useStores()
  const router = useRouter()

  const handleRowClick = (value: string) => {
    setIsLoading(true)
    setSelectedFleetId(value)
    setIsFleetDetail(true)
    onOpenEdit()
  }

  const toast = useToast()
  const tabsData: ITabData[] = [
    {
      label: 'Overview',
      content: <OverviewTable handleRowClick={handleRowClick} />
    },
    {
      label: 'Archive',
      content: <ArchiveTable />
    }
  ]

  const handleCreateFleet = async (data: IDataSubmit) => {
    const postImageResult = data?.file ? await postImageFleet({ file: data.file }) : ''
    const createFleeBody: IFleetCreateParam = {
      logo: postImageResult,
      name: data.fleetName,
      contact: {
        name: data.fleetName,
        contactEmail: data.fleetEmail,
        contactPhone: data.fleetPhone
      },
      fleetManager: {
        email: data.fleetManagerEmail,
        name: data.fleetManagerName,
        phoneNumber: data.fleetManagerPhone
      }
    }
    const result = await createFleet(createFleeBody)
    if (result.id) {
      toast({
        description: 'Create Fleet successfully',
        status: 'success'
      })
      onClose()
    } else if (result.status !== 200) {
      toast({
        description: get(result, 'message', 'Create Fleet failed'),
        status: 'error'
      })
      onClose()
    }

    superAdminStore.getFleetCompany()
  }

  const handleEditFleet = async (data: IDataSubmit) => {
    setIsLoading(true)
    let logoUrl = data?.logo || ''
    if (data?.file) {
      const postImageResult = await postImageFleet({ file: data.file })
      if (!postImageResult) {
        toast({
          description: get(postImageResult, 'message', 'Update Fleet failed'),
          status: 'error',
          duration: 2000,
          isClosable: true
        })
        onCloseEdit()
        return
      }
      logoUrl = postImageResult
    }
    const editFleeBody: IFleetCreateParam = {
      logo: logoUrl,
      name: data.fleetName,
      contact: {
        name: data.fleetName,
        contactEmail: data.fleetEmail,
        contactPhone: data.fleetPhone
      },
      fleetManager: {
        email: data.fleetManagerEmail,
        name: data.fleetManagerName,
        phoneNumber: data.fleetManagerPhone
      }
    }
    try {
      await editFleet(selectedFleetId, editFleeBody)
      toast({
        description: 'Update Fleet successfully',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
      onCloseEdit()
    } catch (error) {
      console.error(error)
      toast({
        description: 'Update Fleet failed',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
      onCloseEdit()
    }

    superAdminStore.getFleetCompany()
    setIsLoading(false)
  }

  const onTriggerSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }
  }

  const onTriggerEdit = () => {
    if (isFleetDetail) {
      setIsFleetDetail(false)
    } else {
      if (formEditRef.current) {
        formEditRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
      }
    }
  }

  const handleArchiveFleet = async () => {
    await archiveFleetCompany(selectedFleetId)
    toast({
      title: 'Fleet archived.',
      description: 'We’ve archived the fleet for you.',
      status: 'success',
      duration: 2000,
      isClosable: true
    })
    onCloseEdit()
    superAdminStore.getFleetCompany()
  }

  useEffect(() => {
    const fetchFleetDetail = async () => {
      if (selectedFleetId) {
        const fleetDetail = await getFleetById(selectedFleetId)
        if (fleetDetail?.id) {
          setSelectedFleet(fleetDetail)
        } else {
          toast({
            title: 'Fleet created.',
            description: 'This Fleet doesnt exist.',
            status: 'warning',
            duration: 2000,
            isClosable: true
          })
        }
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    }
    fetchFleetDetail()
  }, [selectedFleetId])

  const formRef = useRef<HTMLFormElement>(null)
  const formEditRef = useRef<HTMLFormElement>(null)

  return (
    <VStack width="full" paddingX={4} paddingTop={8} paddingBottom="59px" overflow="hidden">
      <ModalWrapper>
        <HStack width="full" margin={0} marginBottom={4} justifyContent="space-between">
          <Text fontSize="18px" fontWeight="bold">
            Overview Table
          </Text>
          <ButtonWithIcon
            size={16}
            label="Add Fleet"
            iconName="ic-add.svg"
            onClick={() => {
              onOpen()
            }}
          />
        </HStack>
        <Tabs data={tabsData} tabIndex={tabIndex} onChange={setTabIndex} />
      </ModalWrapper>

      <ModalCustom
        isOpen={isOpen}
        onClose={onClose}
        title={'Add fleet'}
        onSecondaryClick={onTriggerSubmit}
        secondaryText={'Add'}
      >
        <FleetForm formRef={formRef} onSubmit={handleCreateFleet} />
      </ModalCustom>

      <ModalCustom
        isFleetDetail={isFleetDetail}
        isOpen={isOpenEdit}
        onClose={() => {
          setSelectedFleetId('')
          onCloseEdit()
        }}
        title={isFleetDetail ? 'Fleet company' : 'Edit fleet'}
        onSecondaryClick={onTriggerEdit}
        secondaryText={'Edit'}
        tertiaryText="Archive"
        onTertiaryClick={handleArchiveFleet}
        isLoading={isLoading}
      >
        <FleetForm
          formRef={formEditRef}
          onSubmit={handleEditFleet}
          initFleetData={selectedFleet}
          isFleetDetail={isFleetDetail}
          setIsFleetDetail={setIsFleetDetail}
          onHeaderButtonClick={() => {
            if (isFleetDetail && selectedFleetId) {
              router.push(routes.fleetManager.home.value)
            }
          }}
        />
      </ModalCustom>
    </VStack>
  )
}

export default HomePage
