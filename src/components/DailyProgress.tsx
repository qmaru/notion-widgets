import { useState, useEffect } from "react"
import useMediaQuery from "@mui/material/useMediaQuery"
import { styled } from "@mui/material/styles"
import Container from "@mui/material/Container"
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

const BorderLinearProgress = styled(LinearProgress)(({ theme }: any) => ({
  height: "10vh",
  margin: "3% 0",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: `${theme.palette.mode === "dark" ? "#121212" : "#ffffff"}`,
    borderRadius: "0.3rem",
    border: `4px solid ${theme.palette.mode === "dark" ? "#121212" : "#ffffff"}`,
    boxShadow: `0 0 0 4px ${theme.palette.mode === "dark" ? "#ECE9E6" : "#232526"}`,
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundImage: `${theme.palette.mode === "dark" ? "linear-gradient(135deg, #ECE9E6 10%, #FFFFFF 100%)" : "linear-gradient(135deg, #232526 10%, #414345 100%)"}`,
  },
}))

const yearDays = () => {
  const currentDate: Date = new Date()
  const currentYear: number = currentDate.getFullYear()
  let days: number = 0
  for (let i = 0; i < 12; i++) {
    const day: Date = new Date(currentYear, i, 0)
    days = days + day.getDate()
  }
  return days
}

const monthDays = () => {
  const currentDate: Date = new Date()
  const currentYear: number = currentDate.getFullYear()
  const currentMonth: number = currentDate.getMonth()
  const day: Date = new Date(currentYear, currentMonth, 0)
  const days: number = day.getDate()
  return days
}

const LinearProgressWithText = (props: any) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%" }}>
        <BorderLinearProgress variant="determinate" value={props.value} />
      </Box>
      <Box sx={{ minWidth: "8rem", padding: "0 1rem" }}>
        <Typography variant="subtitle1" color={props.darkMode ? "#ECE9E6" : "#232526"}>
          {props.title}:{props.value}%
        </Typography>
      </Box>
    </Box>
  )
}

export default function DailyProgress() {
  const prefersDarkMode: boolean = useMediaQuery("(prefers-color-scheme: dark)")
  const [yearDaysProgress, setYearDaysProgress] = useState<number>(0)
  const [monthDaysProgress, setMonthDaysProgress] = useState<number>(0)
  const [dayTimeProgress, setDayTimeProgress] = useState<number>(0)

  const pastDaysOfYear = () => {
    const days: number = yearDays()

    const currentDate: Date = new Date()
    const firstDay: Date = new Date(currentDate.getFullYear(), 0, 1)

    const dateGap: number = currentDate.getTime() - firstDay.getTime()
    const dayProgerss: number = Math.floor(dateGap / (1000 * 60 * 60 * 24))
    const dayPer: number = Math.round((dayProgerss / days) * 100)
    setYearDaysProgress(dayPer)
  }

  const pastDaysOfMonth = () => {
    const days: number = monthDays()

    const currentDate: Date = new Date()
    const currentMonth: number = currentDate.getMonth()

    const firstDay: Date = new Date(currentDate.getFullYear(), currentMonth, 1)

    const dateGap: number = currentDate.getDate() - firstDay.getDate()
    const dayProgerss: number = Math.round((dateGap / days) * 100)
    setMonthDaysProgress(dayProgerss)
  }

  const pastTimeOfDay = () => {
    const currentDate: Date = new Date()
    const currentHours: number = currentDate.getHours()
    const currentMinutes: number = currentDate.getMinutes()

    const dayProgerss: number = Math.floor(((currentHours * 60 + currentMinutes) / 1440) * 100)
    setDayTimeProgress(dayProgerss)
  }

  useEffect(() => {
    pastDaysOfYear()
    pastDaysOfMonth()
    pastTimeOfDay()
  })

  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <LinearProgressWithText darkMode={prefersDarkMode} title="Year" value={yearDaysProgress} />
        <LinearProgressWithText
          darkMode={prefersDarkMode}
          title="Month"
          value={monthDaysProgress}
        />
        <LinearProgressWithText darkMode={prefersDarkMode} title="Day" value={dayTimeProgress} />
      </Box>
    </Container>
  )
}
