import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center" }}>
      <Box sx={{ paddingTop: 6 }}>
        <Typography variant='h3'>404</Typography>
        <Typography variant='h3'>NOT</Typography>
        <Typography variant='h3'>FOUND</Typography>
      </Box>
      <Box sx={{ padding: 2 }}>
        <Button href="/notion" variant='contained'>HOME</Button>
      </Box>
    </Container>
  )
}