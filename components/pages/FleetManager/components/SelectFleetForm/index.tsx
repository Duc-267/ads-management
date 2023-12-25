import { Box, FormControl, FormErrorMessage, Select, Spinner, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { getAllFleet } from 'API/fleet'
import { SelectFleetSchema } from 'constants/validation'
import { IFLeetOptions, IFleet, ISelectFleetFormData } from 'interfaces/fleet'
import { getValidArray } from 'utils/common'
import { SubmitButton } from '../../../AuthenticatePage/authenticatePage.styles'

const SelectFleetForm = () => {
  const method = useForm<ISelectFleetFormData>({
    defaultValues: {
      fleet: ''
    },
    resolver: yupResolver(SelectFleetSchema)
  })
  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting, errors }
  } = method
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [fleetOptions, setFleetOptions] = useState<IFLeetOptions[]>()
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response: IFleet[] = await getAllFleet()
        const fleets: IFleet[] = getValidArray(response)
        if (fleets.length === 1) {
          router.push(`/fleet-manager/${fleets[0].id}/home`)
          return
        }
        const result: IFLeetOptions[] = response.map((fleet: IFleet) => ({
          id: fleet.id ?? '',
          name: fleet.name
        }))
        setFleetOptions(result)
      } catch (error) {
        console.error(error)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const onSubmit = async (data: ISelectFleetFormData) => {
    router.push(`/fleet-manager/${get(data, 'fleet')}/home`)
  }

  if (isLoading) {
    return (
      <Box w="100%">
        <Spinner />
      </Box>
    )
  }

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="6">
          <Controller
            name="fleet"
            control={control}
            defaultValue=""
            rules={{ required: 'This field is required' }}
            render={({ field, fieldState: { invalid } }) => {
              return (
                <FormControl isInvalid={invalid}>
                  <Select {...field} isInvalid={invalid} {...register('fleet', { required: true })}>
                    <option key="default-value" value="">
                      Select your fleet
                    </option>
                    {(fleetOptions || []).map((fleet: IFLeetOptions) => (
                      <option key={fleet.id} value={fleet.id}>
                        {fleet.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.fleet?.message}</FormErrorMessage>
                </FormControl>
              )
            }}
          />
          <SubmitButton type="submit" isLoading={isSubmitting}>
            Next
          </SubmitButton>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default SelectFleetForm
