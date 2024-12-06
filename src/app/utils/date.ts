export function getDaysOfWeek(date: Date = new Date()): Array<{ date: Date; isToday: boolean }> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(date)
  start.setDate(date.getDate() - date.getDay())
  start.setHours(0, 0, 0, 0)

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    return {
      date,
      isToday: date.getTime() === today.getTime(),
    }
  })
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

