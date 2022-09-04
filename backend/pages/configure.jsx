import * as React from 'react'
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

import { useQuery, useMutation } from '../convex/_generated/react'
import { useCallback } from 'react'
import { borderRadius } from '@mui/system'

const trip = {
  id: 0,
  date: '',
  title: '',
  origin: '',
  destination: '',
  distance: 0,
  mode: '',
  emission: 0,
}

export default function App() {
  const [idValue, setIdValue] = React.useState(trip.id)
  const [dateValue, setDateValue] = React.useState(trip.date)
  const [titleValue, setTitleValue] = React.useState(trip.title)
  const [originValue, setOriginValue] = React.useState(trip.origin)
  const [destinationValue, setDestinationValue] = React.useState(
    trip.destination
  )
  const [distanceValue, setDistanceValue] = React.useState(trip.distance)
  const [modeValue, setModeValue] = React.useState(trip.mode)
  const [emissionValue, setEmissionValue] = React.useState(trip.emission)

  const submitTrip = useMutation('submitTrip')
  const trips = useQuery('trip') || []
  function handleSubmitTrip() {
    submitTrip(
      idValue,
      dateValue,
      titleValue,
      originValue,
      destinationValue,
      distanceValue,
      modeValue,
      emissionValue,
    )
  }
  return (
    <Container>
      <Grid>
        <Card>
          <Box sx={{ paddingTop: 3 }}>
            <Typography variant="h5" paragraph align="center">
              Configuration Page
            </Typography>
            <CardContent>
              <Typography variant="body" paragraph sx={{ paddingTop: 3 }}>
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
      <input
        type="text"
        value={idValue}
        id="logid"
        onChange={(e) => setIdValue(e.currentTarget.value)}
      />
      <input
        type="text"
        value={dateValue}
        id="date"
        onChange={(e) => setDateValue(e.currentTarget.value)}
      />
      <input
        type="text"
        value={titleValue}
        id="title"
        onChange={(e) => setTitleValue(e.currentTarget.value)}
      />
      <input
        type="text"
        value={originValue}
        id="origin"
        onChange={(e) => setOriginValue(e.currentTarget.value)}
      />
      <input
        type="text"
        value={destinationValue}
        id="destination"
        onChange={(e) => setDestinationValue(e.currentTarget.value)}
      />
      <input
        type="text"
        value={distanceValue}
        id="distance"
        onChange={(e) => setDistanceValue(e.currentTarget.value)}
      />
      <input
        type="text"
        value={modeValue}
        id="mode"
        onChange={(e) => setModeValue(e.currentTarget.value)}
      />
      <input
        type="text"
        value={emissionValue}
        id="emission"
        onChange={(e) => setEmissionValue(e.currentTarget.value)}
      />

      <Button onClick={handleSubmitTrip} variant="text">
        Text
      </Button>
      <ul>
        {trips.map((t) => (
          <div>{t.distance}</div>
        ))}
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
  { label: 'Horse' },
]

const unitOptions = [{ label: 'miles' }, { label: 'kilometers' }]
