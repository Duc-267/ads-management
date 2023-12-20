import {
  Box,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Switch,
  Textarea,
  FormErrorMessage,
  Select,
  SwitchProps,
  TextareaProps,
  SelectProps
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import FormInput from 'components/FormInput'
import { EDiesel, IVehicle } from 'interfaces/vehicle'
import { get } from 'lodash'
import React, { Dispatch, memo, RefObject, SetStateAction, useEffect } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { VehicleFormSchema } from './types'

interface IVehicleFormProps {
  formRef: RefObject<HTMLFormElement>
  onSubmit: (data: IVehicle) => void
  initVehicle?: IVehicle
  isFleetDetail?: boolean
  setIsFleetDetail?: Dispatch<SetStateAction<boolean>>
  onHeaderButtonClick?: () => void
  isEdit?: boolean
}

const StructureVehicleFormData = [
  {
    label: 'Insured by the fleet',
    inputType: 'switch',
    name: 'insuredByFleet',
    grid: 12
  },
  {
    label: 'Vehicle registration',
    inputType: 'text',
    name: 'registrationNumber',
    grid: 12
  },
  {
    label: 'Make',
    inputType: 'text',
    name: 'make',
    grid: 6
  },
  {
    label: 'Model',
    inputType: 'text',
    name: 'model',
    grid: 6
  },
  {
    label: 'Year',
    inputType: 'text',
    name: 'yearOfManufacture',
    grid: 6
  },
  {
    label: 'First registration date',
    inputType: 'text',
    name: 'firstRegisteredDate',
    grid: 6
  },
  {
    label: 'Vin number',
    inputType: 'text',
    name: 'vinNumber',
    grid: 6
  },
  {
    label: 'Engine cc',
    inputType: 'text',
    name: 'engineCC',
    grid: 6
  },
  {
    label: 'Color',
    inputType: 'text',
    name: 'colour',
    grid: 6
  },
  {
    label: 'Paint code',
    inputType: 'text',
    name: 'paintCode',
    grid: 6
  },
  {
    label: 'Fuel type',
    inputType: 'select',
    name: 'fuelType',
    grid: 12
  },
  {
    label: 'Description',
    inputType: 'text-area',
    name: 'description',
    grid: 12
  }
]

const mapDefaultValueForm = (vehicle: IVehicle) => {
  return {
    registrationNumber: get(vehicle, 'registrationNumber'),
    make: get(vehicle, 'make'),
    model: get(vehicle, 'model'),
    yearOfManufacture: get(vehicle, 'yearOfManufacture'),
    firstRegisteredDate: get(vehicle, 'firstRegisteredDate'),
    vinNumber: get(vehicle, 'vinNumber'),
    engineCC: get(vehicle, 'engineCC'),
    colour: get(vehicle, 'colour'),
    paintCode: get(vehicle, 'paintCode'),
    fuelType: get(vehicle, 'fuelType'),
    description: get(vehicle, 'description'),
    insuredByFleet: get(vehicle, 'insuredByFleet')
  }
}

const AddEditVehicleForm = (props: IVehicleFormProps) => {
  const { formRef, onSubmit, initVehicle, isEdit = false } = props
  const method = useForm<IVehicle>({
    defaultValues: {
      fuelType: EDiesel.BIO_DIESEL
    },
    reValidateMode: 'onChange',
    mode: 'all',
    resolver: yupResolver(VehicleFormSchema)
  })

  const { handleSubmit, reset, control, formState } = method
  const { errors } = formState

  useEffect(() => {
    if (initVehicle) {
      reset(mapDefaultValueForm(initVehicle))
    }
  }, [initVehicle])

  const fuelTypeList = Object.values(EDiesel)

  return (
    <FormProvider {...method}>
      <form ref={formRef} onSubmit={handleSubmit(dataSubmit => onSubmit({ ...dataSubmit }))}>
        <Box w="100%" minW="fit-content" p="1.5">
          <Grid templateColumns="repeat(12, 1fr)" gap={6}>
            {StructureVehicleFormData.map((temp, index) => {
              return (
                <GridItem w="100%" colSpan={temp.grid || 12} key={index}>
                  {temp.inputType === 'text' && (
                    <FormInput label={get(temp, 'label')} name={temp.name} type={temp.inputType} />
                  )}

                  {temp.inputType === 'switch' && !isEdit && (
                    <FormControl display="flex" alignItems="center">
                      <Controller
                        name={temp.name as keyof IVehicle}
                        control={control}
                        render={({ field }) => <Switch {...(field as SwitchProps)} />}
                      />
                      <FormLabel htmlFor="insured-by-fleet" mb="0" ml="12px">
                        {get(temp, 'label')}
                      </FormLabel>
                    </FormControl>
                  )}

                  {temp.inputType === 'text-area' && (
                    <FormControl isInvalid={!!errors[temp.name as keyof IVehicle]}>
                      <FormLabel>{get(temp, 'label')}</FormLabel>
                      <Controller
                        name={temp.name as keyof IVehicle}
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...(field as TextareaProps)}
                            placeholder="Here is a sample placeholder"
                            size="sm"
                          />
                        )}
                      />
                      <FormErrorMessage>{errors[temp.name as keyof IVehicle]?.message}</FormErrorMessage>
                    </FormControl>
                  )}

                  {temp.inputType === 'select' && (
                    <FormControl isInvalid={!!errors[temp.name as keyof IVehicle]}>
                      <FormLabel>{get(temp, 'label')}</FormLabel>
                      <Controller
                        name={temp.name as keyof IVehicle}
                        control={control}
                        render={({ field }) => (
                          <Select {...(field as SelectProps)}>
                            <option key="default-value" value="">
                              Select your fleet
                            </option>
                            {fuelTypeList.map((fuel, i: number) => (
                              <option key={i} value={fuel}>
                                {fuel}
                              </option>
                            ))}
                          </Select>
                        )}
                      />
                      <FormErrorMessage>{errors[temp.name as keyof IVehicle]?.message}</FormErrorMessage>
                    </FormControl>
                  )}
                </GridItem>
              )
            })}
          </Grid>
        </Box>
      </form>
    </FormProvider>
  )
}

export default memo(AddEditVehicleForm)
