import { useMemo } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { BrowserRouter, Routes, Route } from "react-router-dom"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import Welcome from './components/Welcome'
import NotFound from './components/NotFound'

import { WidgetInfos } from "./config"

function Router() {
  return (
    <BrowserRouter basename="/notion">
      <Routes>
        <Route path="/" element={<Welcome />} />
        {WidgetInfos.map((widget: any, index: number) => {
          return (
            <Route key={"router" + index} path={widget.path} element={widget.element} />
          )
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  const prefersDarkMode: boolean = useMediaQuery('(prefers-color-scheme: dark)')
  var GlobalTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          contrastThreshold: 3,
          tonalOffset: 0.2,
        },
        typography: {
          fontFamily: [
            'Martian Mono',
            "monospace",
          ].join(','),
        },
      }),
    [prefersDarkMode],
  )
  return (
    <ThemeProvider theme={GlobalTheme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Router />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
