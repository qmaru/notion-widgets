import { useState, useEffect, useCallback } from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

export default function CountdownTimer() {
  const [timerTitle, setTimerTitle] = useState<string>("No Title")
  const [timerDate, setTimerDate] = useState<number>(new Date().getTime())

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
              alignContent: "center",
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: "34rem",
                height: "6rem",
              }
            }}>
              <Paper elevation={12}>
                <Typography variant="h3" component="div" sx={{ padding: "0.2rem" }}>Time up</Typography>
                <Typography component="div">Please reset</Typography>
              </Paper>
            </Box>
          </Typography> :
          <Typography component="div">
            <Box sx={{
              display: 'flex',
              justifyContent: "center",
              alignContent: "center",
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: "0.4rem",
                width: "20%",
                height: "20%",
              }
            }}>
              <Paper elevation={12} sx={{ padding: "0.2rem" }}>
                <Typography variant="h3" component="div" sx={{ padding: "0.2rem" }}>
                  {days}
                </Typography>
                <Typography component="div">Days</Typography>
              </Paper>
              <Paper elevation={12} sx={{ padding: "0.2rem" }}>
                <Typography variant="h3" component="div" sx={{ padding: "0.2rem" }}>{addZero(hours)}</Typography>
                <Typography component="div">Hours</Typography>
              </Paper>
              <Paper elevation={12} sx={{ padding: "0.2rem" }}>
                <Typography variant="h3" component="div" sx={{ padding: "0.2rem" }}>{addZero(minutes)}</Typography>
                <Typography component="div">Minutes</Typography>
              </Paper>
              <Paper elevation={12} sx={{ padding: "0.2rem" }}>
                <Typography variant="h3" component="div" sx={{ padding: "0.2rem" }}>{addZero(seconds)}</Typography>
                <Typography component="div">Seconds</Typography>
              </Paper>
            </Box>
          </Typography>
        }
      </Typography>
    )
  }

  useEffect(() => {
    QueryData()
    const tick = setInterval(() => {
      setTimerDate(timerDate - 1)
    }, 1000)
    return () => clearInterval(tick)
  })

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
        <Card sx={{ backgroundImage: "linear-gradient(45deg, #bdc3c7 10%, #2c3e50 100%)" }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{
                padding: "1vw",
                color: "#ffffff"
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