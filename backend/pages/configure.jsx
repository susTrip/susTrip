import Head from 'next/head'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Container,
  Autocomplete,
  TextField,
  Button,
  touchRippleClasses,
} from '@mui/material'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useQuery, useMutation } from '../convex/_generated/react'
import { useCallback } from 'react'
import { borderRadius } from '@mui/system'

export default function App() {
  const submitTrip = useMutation("submitTrip")
  const trips = useQuery("trip") || []
  function handleSubmitTrip() {
    submitTrip("here", "there", 19, "leg")
  }
  return (
    <Container>
      <Grid>
        <Card>
          <Box sx={{ paddingTop: 3}}>
            <Typography variant="h5" paragraph align="center">
              Configuration Page
            </Typography>
            <CardContent>
              <Typography
                variant="body"
                paragraph
                sx={{ paddingTop: 3 }}
              >
                Default mode of transportation
              </Typography>
              <Autocomplete
                disablePortal
                id="transportation"
                options={transOptions}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="transportations" />
                )}
              />
            </CardContent>
            <CardContent>
              <Typography variant="body" paragraph>
                Units
              </Typography>
              <Autocomplete
                disablePortal
                id="unit"
                options={unitOptions}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="units" />
                )}
              />
            </CardContent>
          </Box>
        </Card>
      </Grid>
      <input type="text"/> 
      <button onClick={handleSubmitTrip}>Submit</button>
      <ul>
        {trips.map(t => <div>{t.distance}</div>)}
      </ul>
    </Container>
    
  )
}

const transOptions = [
  { label: 'Car' },
  { label: 'Bus' },
  { label: 'SEPTA' },
  { label: 'Amtrak' },
  { label: 'Plane' },
  { label: 'Legs' },
  { label: 'Horse'},
]

const unitOptions = [
  { label: 'miles' }, 
  { label: 'kilometers' },
]
