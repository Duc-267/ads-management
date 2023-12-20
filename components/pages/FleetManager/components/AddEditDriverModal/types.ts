import * as yup from 'yup'

export const driverFormSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^0[0-9]{10}$/, 'Phone number is not valid')
    .nullable()
    .optional(),

  fullName: yup
    .string()
    .matches(/^[a-zA-Z0-9~!@#$%^&*()_+`\-=[\]',./{}|:"<>?]{0,1000}$/, 'Invalid full name')
    .nullable()
    .optional(),
  email: yup.string().email('Invalid email address').required('This is a required field'),
  address: yup
    .string()
    .matches(/^[a-zA-Z0-9~!@#$%^&*()_+`\-=[\]',./{}|:"<>?]{0,100}$/, 'Invalid address')
    .nullable()
    .optional(),
  dateOfBirth: yup
    .string()
    .nullable()
    .optional()
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Date format DD/MM/YYYY'),
  nationalInsuranceNumber: yup
    .string()
    .matches(/^[a-zA-Z0-9]{9}$/, 'Invalid national insurance number')
    .nullable()
    .optional(),
  drivingLicenseNumber: yup
    .string()
    .matches(/^[a-zA-Z0-9]{16}$/, 'Invalid driving licence number')
    .nullable()
    .optional(),
  policyNumber: yup
    .string()
    .matches(/^[a-zA-Z0-9~!@#$%^&*()_+`\-=[\]',./{}|:"<>?]{0,100}$/, 'Invalid policy number')
    .nullable()
    .optional(),

  fleetInsuredNumber: yup
    .string()
    .matches(/^[a-zA-Z0-9~!@#$%^&*()_+`\-=[\]',./{}|:"<>?]{0,100}$/, 'Invalid fleet insured number')
    .nullable()
    .optional()
})
