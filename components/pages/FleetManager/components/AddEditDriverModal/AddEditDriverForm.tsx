import { Box, Grid, GridItem, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { get } from 'lodash'
import { observer } from 'mobx-react'
import React, { memo, RefObject, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from 'components/FormInput'
import AvatarUpload from 'components/pages/SuperAdmin/HomePage/components/AvatarUpload'
import { IDriverProfile } from 'interfaces/driver'
import { driverFormSchema } from './types'

interface IDriverFormProps {
  formRef: RefObject<HTMLFormElement>
  onSubmit: (data: Partial<IDriverProfile>) => void
  initDriver?: IDriverProfile
  isEdit?: boolean
}

const StructureDriverFormData = [
  {
    label: 'Name',
    inputType: 'Text',
    name: 'driverName',
    grid: 6
  },
  {
    label: 'Date of birth',
    inputType: 'Text',
    name: 'dateOfBirth',
    grid: 6
  },
  {
    label: 'Address',
    inputType: 'Text',
    name: 'address',
    grid: 12
  },
  {
    label: 'Phone',
    inputType: 'Text',
    name: 'phone',
    grid: 6
  },
  {
    label: 'Email',
    inputType: 'Text',
    name: 'email',
    grid: 6
  },
  {
    label: 'National Insurance Number',
    inputType: 'Text',
    name: 'nationalInsuranceNumber',
    grid: 6
  },
  {
    label: 'Driving Licence Number',
    inputType: 'Text',
    name: 'drivingLicenseNumber',
    grid: 6
  },
  {
    label: 'Insurer',
    inputType: 'Text',
    name: 'insurer',
    grid: 6
  },
  {
    label: 'Policy Number',
    inputType: 'Text',
    name: 'policyNumber',
    grid: 6
  },
  {
    label: 'Fleet Insured Number',
    inputType: 'Text',
    name: 'fleetInsuredNumber',
    grid: 12
  }
]

const mapDefaultValueForm = (driver: IDriverProfile) => {
  return {}
}

const AddEditDriverForm = (props: IDriverFormProps) => {
  const { formRef, onSubmit, initDriver } = props
  const toast = useToast()
  const method = useForm<Partial<IDriverProfile>>({
    reValidateMode: 'onChange',
    mode: 'all',
    resolver: yupResolver(driverFormSchema)
  })
  const [fileUpload, setFileUpload] = useState<File>()

  const { handleSubmit } = method

  useEffect(() => {
    if (initDriver) {
      // reset(mapDefaultValueForm(initDriver))
    }
  }, [initDriver])

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

  return (
    <FormProvider {...method}>
      <form ref={formRef} onSubmit={handleSubmit(dataSubmit => onSubmit({ ...dataSubmit, file: fileUpload as File }))}>
        <Box w="100%" minW="fit-content" p="1.5">
          <Grid templateColumns="repeat(12, 1fr)" gap={6}>
            <GridItem w="100%" colSpan={12}>
              <AvatarUpload src={get(initDriver, 'logo', '')} handleUploadFile={handleUploadFile} />
            </GridItem>
            {StructureDriverFormData.map((temp, index) => {
              return (
                <GridItem w="100%" colSpan={temp.grid || 12} key={index}>
                  <FormInput label={get(temp, 'label')} name={temp.name} type={temp.inputType} />
                </GridItem>
              )
            })}
          </Grid>
        </Box>
      </form>
    </FormProvider>
  )
}

export default memo(observer(AddEditDriverForm))
