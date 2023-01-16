import { useState } from "react"

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
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
    var currentTime: Date = new Date()
    var currentUnix: number = currentTime.getTime()
    var futureUnix: number | undefined = timerDate?.seconds(0).valueOf()
    var futureTime: string = ""
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

    var timerURL: string = window.location.href + `/timer?_=${new Date().getTime()}&title=${encodeURIComponent(timerTitle)}&time=${futureTime}`
    setTimerResult(timerURL)
    setTimerDateError("")
    setTimerTitleError("")
    setCopyStatus("copy")
  }

  const CopyStatus = () => {
    setCopyStatus("copied!")
  }

  const PressEnter = (e: any) => {
    e.keyCode === 13 && Generate()
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
            inputFormat="YYYY-MM-DD HH:mm"
            disablePast
            value={timerDate}
            onChange={DateChange}
            renderInput={(params: any) =>
              <TextField
                {...params}
                error={timerDateError !== ""}
              />
            }
          />
          <TextField
            error={timerTitleError !== ""}
            label={timerTitleError !== "" ? timerTitleError : "Title"}
            variant="outlined"
            onChange={(e) => TitleChange(e)}
            onKeyUp={PressEnter}
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