import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery"

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"

const addZero = (t: number) => {
  return t.toString().padStart(2, "0")
}

const getDateDetails = (countDown: number) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)
  return [days, hours, minutes, seconds]
}

const PaperDate = (props: any) => {
  return (
    <Paper
      elevation={4}
      sx={{
        padding: "0.4rem",
        backgroundImage: `${props.darkMode ? "linear-gradient(0.5turn, #414345 10%, #232526 40%)" : "linear-gradient(0.5turn, #FFFFFF 10%, #ECE9E6 50%)"}`,
        color: `${props.darkMode ? "#ECE9E6" : "#232526"}`,
      }}
    >
      <Typography component="div" sx={{ paddingTop: "0.2rem" }}>
        {props.value}
      </Typography>
      <Typography component="div" variant="caption">
        {props.unit}
      </Typography>
    </Paper>
  )
}

const BoxDate = (props: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > :not(style)": {
          margin: "0 0.2rem",
          width: `${props.width}`,
          height: "20%",
        },
      }}
    >
      {props.pages}
    </Box>
  )
}

const Timer = (props: any) => {
  const currentDate: Date = new Date()
  const currentUnix: number = currentDate.getTime()
  const futureUnix: number = new Date(props.initTimer).getTime()
  const countdown: number = futureUnix - currentUnix
  const [days, hours, minutes, seconds] = getDateDetails(countdown)
  const total: number = days + hours + minutes + seconds

  return (
    <Typography component="div">
      {total <= 0 ? (
        <BoxDate
          key={"timeup"}
          width="50%"
          pages={[
            <PaperDate
              darkMode={props.darkMode}
              key={"timeup"}
              value={"Time up"}
              unit={"Please reset"}
            />,
          ]}
        ></BoxDate>
      ) : (
        <BoxDate
          key={"timer"}
          width="15%"
          pages={[
            <PaperDate
              darkMode={props.darkMode}
              key={props.dayUnit}
              value={days}
              unit={props.dayUnit}
            />,
            <PaperDate
              darkMode={props.darkMode}
              key={props.hourUnit}
              value={addZero(hours)}
              unit={props.hourUnit}
            />,
            <PaperDate
              darkMode={props.darkMode}
              key={props.minuteUnit}
              value={addZero(minutes)}
              unit={props.minuteUnit}
            />,
            <PaperDate
              darkMode={props.darkMode}
              key={props.secondUnit}
              value={addZero(seconds)}
              unit={props.secondUnit}
            />,
          ]}
        ></BoxDate>
      )}
    </Typography>
  )
}

export default function CountdownTimer() {
  const prefersDarkMode: boolean = useMediaQuery("(prefers-color-scheme: dark)")
  const [searchParams] = useSearchParams()
  const [timerTitle, setTimerTitle] = useState<string>("No Title")
  const [timerDate, setTimerDate] = useState<number>(new Date().getTime())
  const [timerConstDate, setTimerConstDate] = useState<number>(0)

  const [dayUnit, setDayUnit] = useState<string>("Days")
  const [hourUnit, setHourUnit] = useState<string>("Hours")
  const [minuteUnit, setMinuteUnit] = useState<string>("Minutes")
  const [secondUnit, setSecondUnit] = useState<string>("Seconds")

  const FutureDateShow = () => {
    const futureUnix: Date = new Date(timerConstDate)
    const futureYear: number = futureUnix.getFullYear()
    const futureMonth: string = (futureUnix.getMonth() + 1).toString().padStart(2, "0")
    const futureDay: string = futureUnix.getDate().toString().padStart(2, "0")
    const futureHour: string = futureUnix.getHours().toString().padStart(2, "0")
    const futureMinute: string = futureUnix.getMinutes().toString().padStart(2, "0")
    return futureYear + "-" + futureMonth + "-" + futureDay + " " + futureHour + ":" + futureMinute
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

  const LoadTimerData = useCallback(() => {
    let title: string | null = searchParams.get("title")
    let date: string | null = searchParams.get("time")
    if (title) {
      setTimerTitle(title)
    }
    if (date) {
      const dateN: number = parseInt(date)
      setTimerDate(dateN)
      setTimerConstDate(dateN)
    }
  }, [searchParams])

  useEffect(() => {
    LoadTimerData()
    LoadUnit()

    window.addEventListener("resize", AdaptiveUnit)
    const tick = setInterval(() => {
      setTimerDate(timerDate - 1)
    }, 1000)

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
        height: "100vh",
      }}
      disableGutters
    >
      <Box sx={{ textAlign: "center" }}>
        <Card
          sx={{
            backgroundImage: `${prefersDarkMode ? "linear-gradient(0.5turn, #3b3b3b 10%, #121212 50%)" : "linear-gradient(0.5turn, #ECE9E6 10%, #FFFFFF 80%)"}`,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{
                padding: "1.5vw",
                color: `${prefersDarkMode ? "#ECE9E6" : "#232526"}`,
              }}
            >
              {timerTitle}
            </Typography>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ paddingBottom: "0.2vw" }}
            >
              {FutureDateShow()}
            </Typography>
            <Typography component="div">
              <Timer
                initTimer={timerDate}
                darkMode={prefersDarkMode}
                dayUnit={dayUnit}
                hourUnit={hourUnit}
                minuteUnit={minuteUnit}
                secondUnit={secondUnit}
              />
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
