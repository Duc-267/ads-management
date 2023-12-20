import { ECompanyType } from 'enums/contact'

export interface IContact {
  id?: string
  name: string
  logo?: string
  contactPhone: string
  contactEmail: string
  companyType?: ECompanyType
}
