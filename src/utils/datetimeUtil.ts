export const getLocalDateTimestamp = (date?: string) => {
  const now = date ? new Date(date) : new Date()
  const offset = now.getTimezoneOffset() * 60000
  return new Date(Number(now) - offset).toISOString().slice(0, 16)
}

export const formatDisplayDate = (dateString: string) => {
  if (!dateString) return ''
  // Add the timezone offset to keep the date consistent
  const date = new Date(dateString)
  const userTimezone = date.getTimezoneOffset() * 60000
  const adjustedDate = new Date(date.getTime() + userTimezone)

  return adjustedDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}
