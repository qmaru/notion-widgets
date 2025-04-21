import { useState } from "react"
import dayjs, { Dayjs } from 'dayjs'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'

const HighlightWeekends = (props: PickersDayProps) => {
  const { day, outsideCurrentMonth, ...other } = props

  const week: number = day.day()
  var isWeek = false
  if (week === 0 || week === 6) {
    isWeek = true
  }
  return (
    <PickersDay sx={{ color: isWeek ? "red" : "" }} {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
  )
}

export default function Calendar() {
  const [cDate, setCDate] = useState<Dayjs | null>(dayjs(new Date()))

  const calendarOnChange = (newValue: any) => {
    setCDate(newValue)
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ padding: 0 }}>
      <Box sx={{ width: 0 }}>
        <DateCalendar
          value={cDate}
          onChange={(newValue) => calendarOnChange(newValue)}
          slots={{
            day: HighlightWeekends,
          }}
        />
      </Box>
    </Container>
  )
}