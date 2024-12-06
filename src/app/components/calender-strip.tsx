import React from 'react'
import { getDaysOfWeek, isSameDay } from '../utils/date'

interface CalendarStripProps {
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

export const CalendarStrip = React.memo(function CalendarStrip({ selectedDate, onSelectDate }: CalendarStripProps) {
  const days = React.useMemo(() => getDaysOfWeek(selectedDate), [selectedDate])
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div className="flex justify-between items-center mb-3">
      {days.map((day, index) => (
        <button
          key={day.date.toISOString()}
          onClick={() => onSelectDate(day.date)}
          className={`flex flex-col items-center w-10 py-1 rounded-lg transition-colors ${
            day.isToday
              ? 'bg-black text-white'
              : isSameDay(day.date, selectedDate)
              ? 'bg-gray-200'
              : ''
          }`}
        >
          <span className="text-xs font-medium">{dayLabels[index]}</span>
          <span className="text-sm font-bold">{day.date.getDate()}</span>
        </button>
      ))}
    </div>
  )
})

