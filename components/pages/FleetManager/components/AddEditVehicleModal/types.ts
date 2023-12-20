import * as yup from 'yup'

export const VehicleFormSchema = yup.object().shape({
  registrationNumber: yup
    .string()
    .required('This field is required.')
    .matches(/[aA-zZ]+[0-9]/, 'Registration number must contain number and charactor')
    .length(7, 'Registration number must contain 7 charactor'),
  make: yup.string(), //matches(/^[a-zA-Z]+[0-9]+[~!@#$%^&*()_+`\-=[\]',./{}|:"<>?]+$/, 'Invalid value'),
  model: yup.string(),
  yearOfManufacture: yup
    .number()
    .integer()
    .typeError('Field must be a valid number')
    .required('This field is required.'),
  firstRegisteredDate: yup
    .string()
    .required('This field is required.')
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Date format DD/MM/YYYY'),
  vinNumber: yup
    .string()
    .required('This field is required.')
    .matches(/[aA-zZ]+[0-9]/, 'Vin number must contain charactor and number'),
  engineCC: yup
    .string()
    .required('This field is required.')
    .matches(/[0-9]+[.]/, 'engine CC should be a float'),
  colour: yup
    .string()
    .matches(/^(|[a-zA-Z]+ )$/, 'Invalid Color')
    .max(100),
  paintCode: yup
    .string()
    .matches(/^(|[a-zA-Z]+ )$/, 'Invalid Paint code')
    .max(100, 'Paint code just contain max 100 charactor'),
  fuelType: yup.string().required('This field is required.'),
  description: yup.string().required('This field is required.').max(100, 'Description just contain max 100 charactor')
})
