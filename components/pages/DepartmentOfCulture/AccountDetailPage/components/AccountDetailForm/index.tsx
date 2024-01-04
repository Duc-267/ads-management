import {
  Box,
  Button,
  Grid,
  GridItem,
  Stack
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import get from 'lodash/get'
import { useRouter } from 'next/router'
import React, { memo, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from 'components/FormInput'
import { IVehicle } from 'interfaces/vehicle'
import { AccountFormSchema } from './constants'


const AccountDetailForm = () => {
  const router = useRouter()
  const currentAccountId: string = get(router, 'query.accountId')
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

  async function fetchData(): Promise<void> {
    try {
      // setIsLoading(true)
    }
    catch (error) {}
  }

  useEffect(() => {
    if (currentAccountId) {
      fetchData()
    }
  }, [currentAccountId])
  function onSubmit(data: any): void {
    console.log(data)
  }


  return (
    <FormProvider {...method}>
       <form onSubmit={handleSubmit(onSubmit)}>
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
        <Stack direction="row" spacing={4} justifyContent="flex-end">
          <Button
            type="submit"
            isLoading={false}
            variant="solid"
            backgroundColor="#FFCD1C"
            color="#000000"
            height="50px"
            borderRadius="10px"
            marginTop="20px"
            alignSelf={'flex-end'}
          >
            Lưu
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default memo(AccountDetailForm)
