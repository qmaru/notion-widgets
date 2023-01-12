import { useState } from "react"

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import dayjs, { Moment } from 'moment'
import CopyToClipboard from 'react-copy-to-clipboard'
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker'

export default function Countdown() {
  const [timerTitle, setTimerTitle] = useState<string>("")
  const [timerDate, setTimerDate] = useState<Moment | null>(dayjs(new Date()))
  const [timerResult, setTimerResult] = useState<string>("")
  const [copyStatus, setCopyStatus] = useState<string>("copy")

  const [timerTitleError, setTimerTitleError] = useState<string>("")
  const [timerDateError, setTimerDateError] = useState<string>("")

  const TitleChange = (event: any) => {
    setTimerTitle(event.target.value)
  }

  const DateChange = (newValue: Moment | null) => {
    setTimerDate(newValue)
  }

  const Generate = () => {
    if (timerTitle === "") {
      setTimerTitleError("Title is required!")
      return false
    }

    var currentTime: Date = new Date()
    var currentUnix: number = currentTime.getTime()
    var futureUnix: number | undefined = timerDate?.seconds(0).valueOf()
    var futureTime: string = ""
    if (futureUnix) {
      if (currentUnix > futureUnix) {
        setTimerDateError("The future time must be greater than the present!")
        return false
      }
      setTimerDateError("")
      futureTime = futureUnix.toString()
    }

    var timerURL: string = window.location.href + `/timer?_=${new Date().getTime()}&title=${encodeURIComponent(timerTitle)}&time=${futureTime}`
    setTimerResult(timerURL)
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
          <Typography variant="h6">
            Generate your timer
          </Typography>
          <TextField
            error={timerTitleError !== ""}
            label="Title"
            variant="outlined"
            onChange={(e) => TitleChange(e)}
            helperText={timerTitleError}
          />
          <DesktopDateTimePicker
            label="Future"
            ampm={false}
            minDate={dayjs(new Date())}
            inputFormat="YYYY-MM-DD HH:mm"
            disablePast
            value={timerDate}
            onChange={DateChange}
            renderInput={(params: any) =>
              <TextField
                {...params}
                error={timerDateError !== ""}
                helperText={timerDateError}
              />
            }
          />
          <TextField
            label="Result"
            variant="outlined"
            disabled
            value={timerResult}
          />
          <Button variant="contained" onClick={() => Generate()}>Generate</Button>

          {timerResult !== "" ?
            <CopyToClipboard text={timerResult} onCopy={() => CopyStatus()}>
              <Button
                variant="contained"
                color='success'
              >
                {copyStatus}
              </Button>
            </CopyToClipboard> : null
          }

        </Stack>
      </Box>
    </Container>
  )
}