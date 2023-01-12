import { useState, useEffect, useCallback } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

export default function CountdownTimer() {
  const prefersDarkMode: boolean = useMediaQuery('(prefers-color-scheme: dark)')
  const [timerTitle, setTimerTitle] = useState<string>("No Title")
  const [timerDate, setTimerDate] = useState<number>(new Date().getTime())

  const [dayUnit, setDayUnit] = useState<string>("Days")
  const [hourUnit, setHourUnit] = useState<string>("Hours")
  const [minuteUnit, setMinuteUnit] = useState<string>("Minutes")
  const [secondUnit, setSecondUnit] = useState<string>("Seconds")

  const QueryData = useCallback(() => {
    var query: string = window.location.search.substring(1)
    var vars: string[] = query.split("&")
    for (let i = 0; i < vars.length; i++) {
      let pair: string[] = vars[i].split("=");
      if (pair[1] !== "") {
        if (pair[0] === "title") {
          var title: string = decodeURIComponent(pair[1])
          setTimerTitle(title)
        } else if (pair[0] === "time") {
          var date: number = parseInt(pair[1])
          setTimerDate(date)
        }
      }

    }
  }, [])

  const getDateDetails = (countDown: number) => {
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000)
    return [days, hours, minutes, seconds]
  }

  const addZero = (t: number) => {
    return t.toString().padStart(2, "0")
  }

  const PaperDate = (props: any) => {
    return (
      <Paper elevation={12} sx={{
        padding: "0.4rem",
        backgroundImage: `${prefersDarkMode ? "linear-gradient(45deg, #232526 10%, #414345 50%)" : "linear-gradient(45deg, #ECE9E6 10%, #FFFFFF 50%)"}`,
        color: `${prefersDarkMode ? "#ECE9E6" : "#232526"}`
      }}>
        <Typography
          component="div"
          sx={{ paddingTop: "0.2rem" }}
        >
          {props.value}
        </Typography>
        <Typography
          component="div"
          variant="caption"
        >
          {props.unit}
        </Typography>
      </Paper>
    )
  }

  const CountdownTimer = () => {
    var currentDate: Date = new Date()
    var currentUnix: number = currentDate.getTime()
    var futureUnix: number = new Date(timerDate).getTime()
    var countdown: number = futureUnix - currentUnix
    var [days, hours, minutes, seconds] = getDateDetails(countdown)
    var total: number = days + hours + minutes + seconds

    return (
      <Typography component="div">
        {total <= 0 ?
          <Typography component="div">
            <Box sx={{
              display: 'flex',
              justifyContent: "center",
              flexWrap: 'wrap',
              '& > :not(style)': {
                margin: "0 0.2rem",
                width: "80%",
                height: "20%",
              }
            }}>
              <Paper elevation={12} sx={{ padding: "0.4rem" }}>
                <Typography
                  component="div"
                  sx={{ paddingTop: "0.2rem" }}
                >
                  Time up
                </Typography>
                <Typography
                  component="div"
                  variant="caption"
                >
                  Please reset
                </Typography>
              </Paper>
            </Box>
          </Typography> :
          <Typography component="div">
            <Box sx={{
              display: 'flex',
              justifyContent: "center",
              flexWrap: 'wrap',
              '& > :not(style)': {
                margin: "0 0.2rem",
                width: "15%",
                height: "20%",
              }
            }}>
              <PaperDate value={days} unit={dayUnit} />
              <PaperDate value={addZero(hours)} unit={hourUnit} />
              <PaperDate value={addZero(minutes)} unit={minuteUnit} />
              <PaperDate value={addZero(seconds)} unit={secondUnit} />
            </Box>
          </Typography>
        }
      </Typography>
    )
  }

  const ResetUnit = (e: any) => {
    let w = e.target.innerWidth
    if (w <= 480) {
      setDayUnit("D")
      setHourUnit("H")
      setMinuteUnit("M")
      setSecondUnit("S")
    } else {
      setDayUnit("Days")
      setHourUnit("Hours")
      setMinuteUnit("Minutes")
      setSecondUnit("Seconds")
    }
  }

  useEffect(() => {
    QueryData()

    window.addEventListener("resize", ResetUnit)

    const tick = setInterval(() => {
      setTimerDate(timerDate - 1)
    }, 1000)

    return () => {
      clearInterval(tick)
      window.removeEventListener("resize", ResetUnit)
    }
  }, [QueryData, timerDate])

  return (
    <Container
      maxWidth="sm"
      fixed
      sx={{
        marginLeft: "unset",
        width: "100vw",
        height: "100vh"
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Card variant="outlined" sx={{ backgroundImage: `${prefersDarkMode ? "linear-gradient(135deg, #232526 10%, #414345 100%)" : "linear-gradient(135deg, #ECE9E6 10%, #FFFFFF 100%)"}` }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{
                padding: "1vw",
                color: `${prefersDarkMode ? "#ECE9E6" : "#232526"}`
              }}
            >
              {timerTitle}
            </Typography>
            <Typography component="div">
              <CountdownTimer />
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}