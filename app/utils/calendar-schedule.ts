import { CalendarDate, Time, toCalendarDateTime, toZoned } from '@internationalized/date'
import { CALENDAR_TIME_ZONE, DEFAULT_PUBLISH_HOUR } from '#shared/calendar'

export function scheduledAtIsoForDay(dayKey: string): string {
  const [year, month, day] = dayKey.split('-').map(part => Number.parseInt(part, 10))
  if (year === undefined || month === undefined || day === undefined
    || Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    throw new Error(`Date de calendrier invalide: ${dayKey}`)
  }

  const date = new CalendarDate(year, month, day)
  const zoned = toZoned(
    toCalendarDateTime(date, new Time(DEFAULT_PUBLISH_HOUR, 0)),
    CALENDAR_TIME_ZONE
  )
  return zoned.toAbsoluteString()
}
