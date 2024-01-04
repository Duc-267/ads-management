import {
  Box,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { Dispatch, memo, RefObject, SetStateAction } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from 'components/FormInput'
import { IVehicle } from 'interfaces/vehicle'
import { AccountFormSchema } from './constants'

interface IVehicleFormProps {
  formRef: RefObject<HTMLFormElement>
  onSubmit: (data: IVehicle) => void
  initVehicle?: IVehicle
  isFleetDetail?: boolean
  setIsFleetDetail?: Dispatch<SetStateAction<boolean>>
  onHeaderButtonClick?: () => void
  isEdit?: boolean
}

const AddAccountForm = (props: IVehicleFormProps) => {
  const { formRef, onSubmit} = props
  const method = useForm<IVehicle>({
    reValidateMode: 'onChange',
    mode: 'all',
    resolver: yupResolver(AccountFormSchema)
  })

  const { handleSubmit, reset, control, formState } = method
  const { errors } = formState

  // useEffect(() => {
  //   if (initVehicle) {
  //     reset(mapDefaultValueForm(initVehicle))
  //   }
  // }, [initVehicle])


  return (
    <FormProvider {...method}>
      <form ref={formRef} onSubmit={handleSubmit(dataSubmit => onSubmit({ ...dataSubmit }))}>
        <Box w="100%" minW="fit-content" p="1.5">
          <Grid templateColumns="repeat(12, 1fr)" gap={6} overflow="auto">
              <GridItem w="100%" colSpan={12} >
                  <FormInput label="email" name="email" type="text" />
              </GridItem>
              <GridItem w="100%" colSpan={12} >
                  <FormInput label="tên" name="name" type="text" />
              </GridItem>
              <GridItem w="100%" colSpan={12} >
                  <FormInput label="số điện thoại" name="phone" type="text" />
              </GridItem>
              <GridItem w="100%" colSpan={12} >
                  <FormInput label="sinh nhật" name="birthday" type="text" />
              </GridItem>
              <GridItem w="100%" colSpan={12} >
                  <FormInput label="vai trò" name="role" type="text" />
              </GridItem>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  )
}

export default memo(AddAccountForm)
