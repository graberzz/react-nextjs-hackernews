import { DateTime } from 'luxon'

/**
 * @param time – time in ms
 * @return string e.g "2 days ago"
 */
export const getRelativeTime = (time: number): string | null =>
  DateTime.local()
    .minus(DateTime.local().toMillis() - time * 1000)
    .toRelative()
