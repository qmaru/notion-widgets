import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'

export default function Calendar() {
  return (
    <Container disableGutters maxWidth={false} sx={{ padding: 0 }}>
      <Box sx={{ width: 0 }}>
        <DateCalendar readOnly />
      </Box>
    </Container>
  )
}