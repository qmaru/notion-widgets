import { useState } from "react"

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import CopyToClipboard from 'react-copy-to-clipboard'

export default function Countdown() {
  const [keyword, setKeyword] = useState<string>("")
  const [photoResult, setPhotoResult] = useState<string>("")
  const [copyStatus, setCopyStatus] = useState<string>("copy")

  const [keywordError, setKeywordError] = useState<string>("")

  const KeywordChange = (event: any) => {
    setKeyword(event.target.value)
  }

  const PressEnter = (e: any) => {
    e.keyCode === 13 && Generate()
  }

  const Generate = () => {
    if (keyword === "") {
      setKeywordError("Keyword is required")
      setPhotoResult("")
      return false
    }

    var timerURL: string = window.location.href + `/photo?k=${encodeURIComponent(keyword)}`
    setPhotoResult(timerURL)
    setCopyStatus("copy")
    setKeywordError("")
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
            Give me keyword
          </Typography>
          <TextField
            error={keywordError !== ""}
            label={keywordError !== "" ? keywordError : "Keyword"}
            variant="outlined"
            onChange={(e) => KeywordChange(e)}
            onKeyUp={PressEnter}
          />
          <TextField
            label="Result"
            variant="outlined"
            disabled
            value={photoResult}
          />
          <Button variant="contained" onClick={() => Generate()}>Generate</Button>
          <CopyToClipboard text={photoResult} onCopy={() => CopyStatus()}>
            <Button
              variant="contained"
              color='success'
              sx={{
                visibility: `${photoResult === "" ? "hidden" : "visible"}`
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