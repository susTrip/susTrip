import Head from 'next/head'
import * as React from 'react'
import Map, { Marker } from 'react-map-gl'
import {
  Container,
  Badge,
  Divider,
  List,
  Grid,
  Toolbar,
  CssBaseline,
  Link,
  Typography,
  Box,
  Paper,
  Button,
  CardContent,
  Card,
  CardActions,
  CardHeader,
  TextField,
} from '@mui/material/'
import MuiDrawer from '@mui/material/Drawer'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import NotificationsIcon from '@mui/icons-material/Notifications'
import IconButton from '@mui/material/IconButton'
import { mainListItems, secondaryListItems } from '../src/components/listItems'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery, useMutation } from '../convex/_generated/react'

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic3VzdHJpcCIsImEiOiJjbDdtMDMzdHUwOXd2M3ZwOG9hN29heXV5In0.Y3_7dFxQF5xjS7WuhtdxiQ'
const drawerWidth = 240
const theme = createTheme({
  palette: {
    primary: {
      light: '#AFE3C0',
      main: '#688B58',
      dark: '#90C290',
    },
    secondary: {
      main: "#8963BA",
      dark: "#54428E"
    }
  }
});
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))


function Logout() {
  const { logout } = useAuth0()
  return (
    <Grid>
      {/* We know this component only renders if the user is logged in. */}
      <Button
        size="small"
        color="secondary"
        variant="contained"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log out
      </Button>
    </Grid>
  )
}

function calculateCo2ByGram(mode, distance) {
  // const TransportMode = {
  //   "mapbox/driving-traffic" : 404,
  //   "Bus" : 150,
  //   "mapbox/driving" : 300,
  //   "SEPTA" : 100,
  //   "Amtrak" : 200,
  //   "Plane" : 500,
  //   "mapbox/walking" : 0,
  //   "Horse" : 50
  // }
  var rate
  if (mode == 'mapbox/driving-traffic') rate = 404
  else if (mode == 'mapbox/driving') rate = 300
  else if (mode == 'mapbox/walking') rate = 0
  if (rate != undefined) {
    return (rate * distance)
  }
  return -1
}

export default function Home() {
  const [myTrip, setTrip] = React.useState('Your Carbon Free Trip')
  const [origin, setOrigin] = React.useState('Your Trip Origin')
  const [destination, setDestination] = React.useState('Your Trip Destination')
  const [mode, setMode] = React.useState('Your Transpotation')
  const [distance, setDistance] = React.useState(0)
  const [emission, setEmission] = React.useState(0)

  var modeTransport = 'mapbox/driving-traffic'

  const submitTrip = useMutation('submitTrip')
  const trips = useQuery('trip') || []
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }
  const mapEl = useRef()
  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN
    const map = new mapboxgl.Map({
      container: 'map',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/sustrip/cl7mvr22y000014uqe6rizqgt',
      center: [-75.1, 40.0],
      zoom: 8,
    })

    // const mapboxGeocoder = new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken
    // });
    const mapboxDirections = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    })

    // enum TransportMode {
    //   Car,
    //   Bus,
    //   SEPTA,
    //   Amtrak,
    //   Plane,
    //   Legs,
    //   Horse
    // }

    // var TransportModeEmission = new Map<TransportMode, number>([
    //   [TransportMode.Car, 404],
    //   [TransportMode.Bus, 150],
    //   [TransportMode.SEPTA, 100],
    //   [TransportMode.Amtrak, 200],
    //   [TransportMode.Plane, 500],
    //   [TransportMode.Legs, 0],
    //   [TransportMode.Horse, 50]
    // ]);
    
    mapboxDirections.on('profile', (profile) => {
      modeTransport = profile.profile
      const transMap = {
        'mapbox/driving-traffic': 'Car',
        'mapbox/driving': 'Car',
        'mapbox/cycling': 'Cycle',
        'mapbox/walking': 'Walk',
      }
      setMode(transMap[modeTransport])

    })

    mapboxDirections.on('route', (route) => {
      var distInMile = parseFloat(route.route[0].distance) * 0.000621371
      var curEmission = calculateCo2ByGram(
        modeTransport,
        distInMile
      )
      var curOrigin = document.querySelector(
        "input[placeholder='Choose a starting place']"
      )
      var curDestination = document.querySelector(
        "input[placeholder='Choose destination']"
      )
      setOrigin(curOrigin.value)
      setDestination(curDestination.value)
      var dist = parseFloat(route.route[0].distance) * 0.000621371
      setDistance(Number(dist.toFixed(2)))
      setEmission(Number(curEmission.toFixed(2)))

      // getCoordsName(mapboxDirections.getOrigin().geometry.coordinates,
      //         mapboxDirections.getDestination().geometry.coordinates);
    })

    map.addControl(mapboxDirections, 'top-left')

    var getCoordsName = function (firstCoords, secondCoords) {
      // if(firstCoords === undefined || secondCoords === undefined) {
      //     return 0;
      // }
      var xhr = new XMLHttpRequest()
      var URL =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        firstCoords[0] +
        ',' +
        secondCoords[1] +
        ';' +
        secondCoords[0] +
        ',' +
        secondCoords[1] +
        '.json?access_token=' +
        mapboxgl.accessToken

      xhr.open('GET', URL)
      xhr.responseType = 'json'

      xhr.onload = function () {
        let responseObj = xhr.response
      }
      xhr.send()
    }
  }, [])
  const date = new Date()
  function handleSubmitTrip() {
    submitTrip(
      0,
      date.toDateString(),
      myTrip,
      origin,
      destination,
      distance,
      mode,
      emission
    )
    alertHandler()
  }
  function alertHandler() {
    alert("Trip Saved!")
  }
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Your susTrip Map
            </Typography>
            <Logout />
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>

        <Head>
        </Head>

        <Box>
          <div
            id="map"
            style={{
              position: 'absolute',
              top: 65,
              bottom: 350,
              width: '88%',
              zIndex: 4,
            }}
          >
            there should be a map here
          </div>
        </Box>
      </Box>
      <Container sx={{ position: 'float', paddingTop: 45 }}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'row',
            height: 300,
            width: 1400,
          }}
        >
          <Grid sx={{ paddingLeft: 10, paddingRight: 10 }}>
            <Box variant="outlined">
              <CardContent>
                <TextField
                  label="Trip Title"
                  color="secondary"
                  focused
                  gutterBottom
                  inputProps={{ maxLength: 20 }}
                  onChange={(e) => setTrip(e.target.value)}
                />
                <Typography
                  sx={{ fontSize: 16, paddingTop: 2 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Origin: {origin}
                </Typography>
                <Typography
                  sx={{ fontSize: 16, paddingTop: 2 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Destination: {destination}
                </Typography>
                <Typography
                  sx={{ fontSize: 16, paddingTop: 2 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Mode of Travel: {mode}
                </Typography>
                {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"safe travel!"'}
        </Typography> */}
              </CardContent>
            </Box>
          </Grid>
          <Grid sx={{ paddingLeft: 30, paddingBottom: 2 }}>
            <Box maxWidth={500} variant="outlined">
              <CardContent>
                <Typography variant="h4" component="div" gutterBottom>
                  {myTrip}
                </Typography>
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Total Distance (miles): {distance}
                </Typography>
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Total Carbon emmitted (grams CO2e): {emission}
                </Typography>
                {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"safe travel!"'}
        </Typography> */}
              </CardContent>
              <CardActions>
                <Button size="small" onClick= {handleSubmitTrip}>
                  Save Trip
                </Button>
              </CardActions>
            </Box>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}
