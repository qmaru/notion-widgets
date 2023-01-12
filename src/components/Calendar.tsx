import { useState } from "react"

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import dayjs, { Moment } from 'moment'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'

export default function Calendar() {
  const [today, setToday] = useState<Moment | null>(dayjs(new Date()))
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ padding: 0 }}
    >
      <Box sx={{ width: 0 }}>
        <StaticDatePicker
          views={["month", "day"]}
          disableOpenPicker
          displayStaticWrapperAs="desktop"
          value={today}
          dayOfWeekFormatter={(day: string) => day}
          renderDay={(day, selectedDays, pickersDayProps) => {
            var week = day.isoWeekday()
            if (week === 6 || week === 7) {
              return <PickersDay sx={{ color: "red" }} {...pickersDayProps} />
            }
            return <PickersDay {...pickersDayProps} />
          }}
          onChange={(newValue) => { setToday(newValue) }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </Container>
  )
}