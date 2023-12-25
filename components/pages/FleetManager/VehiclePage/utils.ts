import dayjs from 'dayjs'
import isUndefined from 'lodash/isUndefined'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import { VehicleStatusEnum } from 'enums/vehicleStatus'
import { IVehicleQueryParams } from './constants'

export function getValidValue(currentValue?: string): string {
  if (currentValue === undefined || currentValue === 'undefined') {
    return ''
  }
  return currentValue
}

export function getQueryParamsFromUrl(query: NextParsedUrlQuery): IVehicleQueryParams {
  const { date: currentDate, insuredBy, model, make, yearOfManufacture, status } = query
  const queryParams: IVehicleQueryParams = {
    date: !isUndefined(currentDate) ? dayjs(String(currentDate)).format('MM-DD-YYYY') : undefined,
    insuredBy: getValidValue(String(insuredBy)),
    model: getValidValue(String(model)),
    make: getValidValue(String(make)),
    yearOfManufacture: !isUndefined(yearOfManufacture) ? Number(yearOfManufacture) : undefined,
    status: !isUndefined(status) ? (status as VehicleStatusEnum) : undefined
  }
  return queryParams
}
