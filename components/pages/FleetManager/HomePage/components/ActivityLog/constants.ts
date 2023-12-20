export interface IActivityLogTableData {
  timestamp: string
  caseId: string
  user: string
  description: string
  activity: JSX.Element
  onClick: () => void
}
