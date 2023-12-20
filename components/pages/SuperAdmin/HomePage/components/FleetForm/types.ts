import * as yup from 'yup'

export const FleetFormSchema = yup.object().shape({
  fleetEmail: yup
    .string()
    .email('Invalid email')
    .required('This field is required')
    .matches(/[aA-zZ]+[0-9]+[.@]/, 'Invalid format'),
  fleetName: yup
    .string()
    .required('This field is required')
    .max(50, 'Max 50 character')
    .matches(/[A-Za-z]+[0-9]+[-~!@#$%^&*()_+=`\-.,/;’?><:”\\ ]/, 'Invalid format'),
  fleetPhone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
    .required('Phone number is required'),
  fleetManagerEmail: yup.string().email().required('This field is required'),
  fleetManagerName: yup
    .string()
    .required('This field is required')
    .max(50, 'Max 50 character')
    .matches(/[A-Za-z]+[0-9]+[-~!@#$%^&*()_+=`\-.,/;’?><:”\\ ]/, 'Invalid format'),
  fleetManagerPhone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
    .required('Phone number is required')
})

interface IContact {
  name: string
  contactEmail: string
  contactPhone: string
}

interface IFleetManager {
  email: string
  name: string
  phoneNumber: string
}

export interface IFleetCreateParam {
  logo: string
  name: string
  contact: IContact
  fleetManager: IFleetManager
}
export interface IPostImageFleetForm {
  file: File
}
