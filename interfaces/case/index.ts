import { FlagEnum } from 'enums/flag'

export interface ICaseDetail {
  flag: FlagEnum
  caseId: string
  regNumber: string
  incidentDate: string
  incidentTime: string
  driverName: string
}
