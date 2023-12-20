import { Box, Text, VStack, useToast, Flex, Button } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import FormInput from 'components/FormInput'
import { IFleet } from 'interfaces/fleet'
import { get } from 'lodash'
import React, { Dispatch, memo, RefObject, SetStateAction, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { FleetFormSchema } from './types'
import AvatarUpload from '../AvatarUpload'

interface IAddFleetForm {
  formRef: RefObject<HTMLFormElement>
  onSubmit: (data: IDataSubmit) => void
  initFleetData?: IFleet
  isFleetDetail?: boolean
  setIsFleetDetail?: Dispatch<SetStateAction<boolean>>
  onHeaderButtonClick?: () => void
}

export interface IDataSubmit {
  fleetEmail: string
  fleetManagerEmail: string
  fleetManagerName: string
  fleetManagerPhone: string
  fleetName: string
  fleetPhone: string
  phone: string
  file?: File
}

const StructureFleetInfoData = [
  {
    label: 'Fleet name',
    inputType: 'text',
    name: 'fleetName'
  },
  {
    label: 'Fleet email',
    inputType: 'email',
    name: 'fleetEmail'
  },
  {
    label: 'Phone',
    inputType: 'text',
    name: 'fleetPhone'
  }
]

const StructureFleetManagerData = [
  {
    label: 'Fleet’s manager name',
    inputType: 'text',
    name: 'fleetManagerName'
  },
  {
    label: 'Fleet’s manager email',
    inputType: 'email',
    name: 'fleetManagerEmail'
  },
  {
    label: 'Fleet’s manager phone',
    inputType: 'text',
    name: 'fleetManagerPhone'
  }
]

const StructureFleetActivityData = [
  {
    label: 'Number of not submitted cases',
    inputType: 'text',
    name: 'numberOfNotSubmitted'
  },
  {
    label: 'Number of submitted cases',
    inputType: 'text',
    name: 'numberOfSubmitted'
  },
  {
    label: 'Number of processing cases',
    inputType: 'text',
    name: 'numberOfProcessing'
  },
  {
    label: 'Number of closed cases',
    inputType: 'text',
    name: 'numberOfClosed'
  },
  {
    label: 'Number of vehicles',
    inputType: 'text',
    name: 'numberOfVehicles'
  },
  {
    label: 'Number of fleet admin',
    inputType: 'text',
    name: 'numberOfFleetAdmin'
  },
  {
    label: 'Number of drivers',
    inputType: 'text',
    name: 'numberOfDrivers'
  }
]

const mapDefaultValueForm = (selectedFleet: IFleet) => {
  return {
    fleetEmail: get(selectedFleet, 'contact.contactEmail'),
    fleetManagerEmail: get(selectedFleet, 'fleetManager.email', ''),
    fleetManagerName: get(selectedFleet, 'fleetManager.name', ''),
    fleetManagerPhone: get(selectedFleet, 'fleetManager.phoneNumber', ''),
    fleetName: get(selectedFleet, 'name', ''),
    fleetPhone: get(selectedFleet, 'contact.contactPhone', ''),
    logo: get(selectedFleet, 'logo', ''),
    // TODO Map activity data
    numberOfNotSubmitted: get(selectedFleet, 'numberOfNotSubmitted', 0),
    numberOfSubmitted: get(selectedFleet, 'numberOfSubmitted', 0),
    numberOfProcessing: get(selectedFleet, 'numberOfProcessing', 0),
    numberOfClosed: get(selectedFleet, 'numberOfClosed', 0),
    numberOfVehicles: get(selectedFleet, 'numberOfVehicles', 0),
    numberOfFleetAdmin: get(selectedFleet, 'numberOfFleetAdmin', 0),
    numberOfDrivers: get(selectedFleet, 'numberOfDrivers', 0)
  }
}

const AddFleetForm = (props: IAddFleetForm) => {
  const { formRef, onSubmit, initFleetData } = props
  const [fileUpload, setFileUpload] = useState<File>()
  const method = useForm<IDataSubmit>({
    reValidateMode: 'onChange',
    mode: 'all',
    resolver: yupResolver(FleetFormSchema)
  })
  const toast = useToast()

  const { handleSubmit, reset } = method

  useEffect(() => {
    if (initFleetData) {
      reset(mapDefaultValueForm(initFleetData))
    }
  }, [initFleetData])

  const handleUploadFile = (file: File) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024 && !['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
        toast({
          status: 'error',
          title: 'File size must be less than 5MB and type: png, jpg, jpeg',
          duration: 2000,
          isClosable: true
        })
      } else {
        setFileUpload(file)
      }
    }
  }

  const isFleetDetail = get(props, 'isFleetDetail', false)

  return (
    <FormProvider {...method}>
      <form ref={formRef} onSubmit={handleSubmit(dataSubmit => onSubmit({ ...dataSubmit, file: fileUpload }))}>
        <Box w="586px" minW="fit-content" p="1.5">
          <VStack w="100%" justifyContent={'flex-start'} alignItems={'flex-start'} gap="16px">
            <Flex justifyContent={'space-between'} alignItems="center" width="100%">
              <AvatarUpload
                src={get(initFleetData, 'logo', '')}
                handleUploadFile={handleUploadFile}
                isDisable={isFleetDetail}
              />
              {isFleetDetail && (
                <Button
                  onClick={() => {
                    props?.onHeaderButtonClick && props?.onHeaderButtonClick()
                  }}
                >
                  Open portal site
                </Button>
              )}
            </Flex>

            {StructureFleetInfoData.map((temp, index) => {
              return (
                <FormInput
                  disabled={isFleetDetail}
                  label={get(temp, 'label')}
                  key={index}
                  name={temp.name}
                  type={temp.inputType}
                />
              )
            })}

            <Divider margin={'20px 0'} color="gray.300" h="1px" />
            <Text fontSize="lg" fontWeight={'bold'} marginBottom="12px">
              Fleet Manager
            </Text>

            {StructureFleetManagerData.map((temp, index) => {
              return (
                <FormInput
                  disabled={isFleetDetail}
                  label={get(temp, 'label')}
                  key={index}
                  name={temp.name}
                  type={temp.inputType}
                />
              )
            })}

            {isFleetDetail && (
              <>
                <Divider margin={'20px 0'} color="gray.300" h="1px" />
                {StructureFleetActivityData.map((temp, index) => {
                  return (
                    <FormInput
                      disabled={isFleetDetail}
                      label={get(temp, 'label')}
                      key={index}
                      name={temp.name}
                      type={temp.inputType}
                    />
                  )
                })}
              </>
            )}
          </VStack>
        </Box>
      </form>
    </FormProvider>
  )
}

export default memo(AddFleetForm)
