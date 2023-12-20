import { VehicleStatusEnum } from 'enums/vehicleStatus'
import { IFilterItem } from 'interfaces/common'

export const statusOptions: IFilterItem[] = [
  {
    title: 'ACTIVE',
    value: VehicleStatusEnum.ACTIVE
  },
  {
    title: 'INACTIVE',
    value: VehicleStatusEnum.UN_ACTIVE
  }
]
