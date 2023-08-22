import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from "react-router-dom"

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Skeleton from '@mui/material/Skeleton'

export default function Givemephoto() {
  const [searchParams] = useSearchParams()
  const [photoURL, setPhotoURL] = useState<string>("")

  const GetPhoto = useCallback(() => {
    const keyword = searchParams.get("k")
    if (keyword) {
      const host: string = "https://source.unsplash.com"
      const photo_size: string = "2560x1600"
      const api_url: string = `${host}/${photo_size}/?${keyword}`
      fetch(api_url)
        .then((response) => response.url)
        .then((url) => {
          setPhotoURL(url)
        })
    }
  }, [searchParams])

  useEffect(() => {
    GetPhoto()
  }, [GetPhoto])

  return (
    <Container
      maxWidth={false}
    >
      {photoURL === "" ?
        <Skeleton variant="rectangular" width={640} height={400} />
        :
        <Box component="img" sx={{ maxWidth: "100%" }} alt="random" src={photoURL} />
      }
    </Container>
  )
}