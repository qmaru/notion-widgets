import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Skeleton from '@mui/material/Skeleton'

export default function Givemephoto() {
  const [photoURL, setPhotoURL] = useState<string>("")

  const QueryKeyword = () => {
    var query: string = window.location.search.substring(1)
    var vars: string[] = query.split("&")
    for (let i = 0; i < vars.length; i++) {
      let pair: string[] = vars[i].split("=");
      if (pair[1] !== "") {
        if (pair[0] === "k") {
          var keyword: string = decodeURIComponent(pair[1])
          return keyword
        }
      }
    }
    return ""
  }

  const GetPhoto = useCallback(() => {
    var keyword = QueryKeyword()
    if (keyword !== "") {
      const host: string = "https://source.unsplash.com"
      const photo_size: string = "2560x1600"
      var api_url: string = `${host}/${photo_size}/?${keyword}`
      fetch(api_url)
        .then((response) => response.url)
        .then((url) => {
          setPhotoURL(url)
        })
    }
  }, [])

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