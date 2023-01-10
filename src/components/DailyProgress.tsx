import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: "10vh",
  margin: "3% 0",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#ffffff",
    borderRadius: "0.3rem",
    border: "4px solid #ffffff",
    boxShadow: "0 0 0 4px #232526"
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundImage: "linear-gradient(135deg, #232526 10%, #414345 100%)"
  }
}))

export default function DailyProgress() {
  const [yearDaysProgress, setYearDaysProgress] = useState(0)
  const [monthDaysProgress, setMonthDaysProgress] = useState(0)
  const [dayTimeProgress, setDayTimeProgress] = useState(0)

  const yearDays = () => {
    var currentDate: Date = new Date()
    var currentYear: number = currentDate.getFullYear()
    var days: number = 0
    for (var i = 0; i < 12; i++) {
      var day: Date = new Date(currentYear, i, 0)
      days = days + day.getDate()
    }
    return days
  }

  const monthDays = () => {
    var currentDate: Date = new Date()
    var currentYear: number = currentDate.getFullYear()
    var currentMonth: number = currentDate.getMonth()
    var day: Date = new Date(currentYear, currentMonth, 0)
    var days: number = day.getDate()
    return days
  }

  const pastDaysOfYear = () => {
    var days: number = yearDays()

    var currentDate: Date = new Date()
    var firstDay: Date = new Date()
    firstDay.setMonth(0)
    firstDay.setDate(1)

    var dateGap: number = currentDate.getDate() - firstDay.getDate()
    var dayProgerss: number = Math.round(dateGap / days * 100)
    setYearDaysProgress(dayProgerss)
  }

  const pastDaysOfMonth = () => {
    var days: number = monthDays()

    var currentDate: Date = new Date()
    var currentDay: number = currentDate.getMonth()

    var firstDay: Date = new Date()
    firstDay.setMonth(currentDay)
    firstDay.setDate(1)

    var dateGap: number = currentDate.getDate() - firstDay.getDate()
    var dayProgerss: number = Math.round(dateGap / days * 100)
    setMonthDaysProgress(dayProgerss)
  }

  const pastTimeOfDay = () => {
    var currentDate: Date = new Date()
    var currentHours: number = currentDate.getHours()
    var currentMinutes: number = currentDate.getMinutes()

    var dayProgerss: number = Math.floor((currentHours * 60 + currentMinutes) / 1440 * 100)
    setDayTimeProgress(dayProgerss)
  }

  useEffect(() => {
    pastDaysOfYear()
    pastDaysOfMonth()
    pastTimeOfDay()
  })

  const LinearProgressWithText = (props: any) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
          <BorderLinearProgress variant="determinate" value={props.value} />
        </Box>
        <Box sx={{ minWidth: "6rem", padding: "0 1rem" }}>
          <Typography variant="subtitle1" color="#232526">
            {props.title}: {props.value}%
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Container
      maxWidth={false}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: '100%',
        justifyContent: "center"
      }}>
        <LinearProgressWithText title="Year" value={yearDaysProgress} />
        <LinearProgressWithText title="Month" value={monthDaysProgress} />
        <LinearProgressWithText title="Day" value={dayTimeProgress} />
      </Box>
    </Container>
  )
}