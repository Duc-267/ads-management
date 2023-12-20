import moment from 'moment'

export function generateDatesOfMonth(month: number, year: number) {
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0)
  const dates = []

  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })
    dates.push(formattedDate)
  }

  return dates
}

export function formatDateChart(dateString: string, format: string = 'DD/MM') {
  const dateFormatted = moment(dateString).format(format)
  return dateFormatted.toString()
}
