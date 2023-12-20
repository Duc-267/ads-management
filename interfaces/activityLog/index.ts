import { ActivityActionTypeEnum } from 'enums/activity'

export interface IActivityLog {
  caseId: string
  timestamp: string
  activity: ActivityActionTypeEnum
  description: string
  user: string
}
