import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from "react-router-dom"
import useMediaQuery from '@mui/material/useMediaQuery'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

export default function CountdownTimer() {
  const prefersDarkMode: boolean = useMediaQuery('(prefers-color-scheme: dark)')
  const [searchParams] = useSearchParams()
  const [timerTitle, setTimerTitle] = useState<string>("No Title")
  const [timerDate, setTimerDate] = useState<number>(new Date().getTime())

  const [dayUnit, setDayUnit] = useState<string>("Days")
  const [hourUnit, setHourUnit] = useState<string>("Hours")
  const [minuteUnit, setMinuteUnit] = useState<string>("Minutes")
  const [secondUnit, setSecondUnit] = useState<string>("Seconds")

  const LoadTimerData = useCallback(() => {
    let title: string | null = searchParams.get("title")
    let date: string | null = searchParams.get("time")
    if (title) {
      setTimerTitle(title)
    }
    if (date) {
      var dateN: number = parseInt(date)
      setTimerDate(dateN)
    }
  }, [searchParams])

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

  const BoxDate = (props: any) => {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: "center",
        flexWrap: 'wrap',
        '& > :not(style)': {
          margin: "0 0.2rem",
          width: `${props.width}`,
          height: "20%",
        }
      }} >
        {props.pages}
      </Box>
    )
  }

  const PaperDate = (props: any) => {
    return (
      <Paper elevation={4} sx={{
        padding: "0.4rem",
        backgroundImage: `${prefersDarkMode ? "linear-gradient(0.5turn, #414345 10%, #232526 40%)" : "linear-gradient(0.5turn, #FFFFFF 10%, #ECE9E6 50%)"}`,
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
          <BoxDate key={"timeup"} width="50%" pages={[
            <PaperDate key={"timeup"} value={"Time up"} unit={"Please reset"} />
          ]}>
          </BoxDate>
          :
          <BoxDate key={"timer"} width="15%" pages={[
            <PaperDate key={dayUnit} value={days} unit={dayUnit} />,
            <PaperDate key={hourUnit} value={addZero(hours)} unit={hourUnit} />,
            <PaperDate key={minuteUnit} value={addZero(minutes)} unit={minuteUnit} />,
            <PaperDate key={secondUnit} value={addZero(seconds)} unit={secondUnit} />
          ]}>
          </BoxDate>
        }
      </Typography>
    )
  }

  const SetUnitCore = (width: number) => {
    if (width <= 480) {
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

  const LoadUnit = useCallback(() => {
    SetUnitCore(window.innerWidth)
  }, [])

  const AdaptiveUnit = useCallback((e: any) => {
    let w = e.target.innerWidth
    SetUnitCore(w)
  }, [])

  useEffect(() => {
    LoadTimerData()
    LoadUnit()

    window.addEventListener("resize", AdaptiveUnit)
    const tick = setInterval(() => { setTimerDate(timerDate - 1) }, 1000)

    return () => {
      clearInterval(tick)
      window.removeEventListener("resize", AdaptiveUnit)
    }
  }, [LoadTimerData, LoadUnit, AdaptiveUnit, timerDate])

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
        <Card sx={{ backgroundImage: `${prefersDarkMode ? "linear-gradient(0.5turn, #3b3b3b 10%, #121212 50%)" : "linear-gradient(0.5turn, #ECE9E6 10%, #FFFFFF 80%)"}` }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{
                padding: "1.5vw",
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