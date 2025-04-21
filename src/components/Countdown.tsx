import { useState } from "react"

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import dayjs, { Dayjs } from 'dayjs'
import CopyToClipboard from 'react-copy-to-clipboard'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker'

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

export default function Countdown() {
  const [timerTitle, setTimerTitle] = useState<string>("")
  const [timerDate, setTimerDate] = useState<Dayjs | null>(dayjs(new Date()).add(5, "minute"))
  const [timerResult, setTimerResult] = useState<string>("")
  const [copyStatus, setCopyStatus] = useState<string>("copy")

  const [timerTitleError, setTimerTitleError] = useState<string>("")
  const [timerDateError, setTimerDateError] = useState<string>("")

  const TitleChange = (event: any) => setTimerTitle(event.target.value)

  const DateChange = (newValue: Dayjs | null) => setTimerDate(newValue)

  const Generate = () => {
    const currentTime: Date = new Date()
    const currentUnix: number = currentTime.getTime()
    const futureUnix: number | undefined = timerDate?.second(0).valueOf()
    let futureTime: string = ""
    if (futureUnix) {
      if (currentUnix > futureUnix) {
        setTimerDateError("Future time error")
        setTimerResult("")
        return false
      }
      setTimerDateError("")
      futureTime = futureUnix.toString()
    }

    if (timerTitle === "") {
      setTimerTitleError("Title is required")
      setTimerResult("")
      return false
    }

    const timerURL: string = window.location.href + `/timer?_=${new Date().getTime()}&title=${encodeURIComponent(timerTitle)}&time=${futureTime}`
    setTimerResult(timerURL)
    setTimerDateError("")
    setTimerTitleError("")
    setCopyStatus("copy")
  }

  const CopyStatus = () => {
    setCopyStatus("copied!")
  }

  return (
    <Container>
      <Box sx={{
        display: "flex",
        width: 400,
        height: 500,
        justifyContent: "center",
        margin: "0 auto",
        textAlign: "center",
        flexDirection: "column",
      }}>
        <Stack spacing={3}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <IconButton href="/notion">
              <HomeIcon />
            </IconButton>
            Generate your timer
          </Typography>
          <DesktopDateTimePicker
            label={timerDateError !== "" ? timerDateError : "Future"}
            ampm={false}
            minDate={dayjs(new Date())}
            format="YYYY-MM-DD HH:mm"
            disablePast
            value={timerDate}
            onChange={DateChange}
            slots={{
              day: HighlightWeekends,
            }}
          />
          <TextField
            error={timerTitleError !== ""}
            label={timerTitleError !== "" ? timerTitleError : "Title"}
            variant="outlined"
            onChange={(e: any) => TitleChange(e)}
          />
          <TextField
            label="Result"
            variant="outlined"
            disabled
            value={timerResult}
          />
          <Button variant="contained" onClick={() => Generate()}>Generate</Button>
          <CopyToClipboard text={timerResult} onCopy={() => CopyStatus()}>
            <Button
              variant="contained"
              color='success'
              sx={{
                visibility: `${timerResult === "" ? "hidden" : "visible"}`
              }}
            >
              {copyStatus}
            </Button>
          </CopyToClipboard>
        </Stack>
      </Box>
    </Container>
  )
}