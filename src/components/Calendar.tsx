import { useState } from "react"

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import dayjs, { Moment } from 'moment'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'

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
          displayStaticWrapperAs="desktop"
          value={today}
          dayOfWeekFormatter={(day: string) => day}
          onChange={(newValue: any) => { setToday(newValue) }}
        />
      </Box>
    </Container>
  )
}