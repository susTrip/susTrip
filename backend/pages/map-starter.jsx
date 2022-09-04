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
import { useQuery, useMutation } from '../convex/_generated/react'

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic3VzdHJpcCIsImEiOiJjbDdtMDMzdHUwOXd2M3ZwOG9hN29heXV5In0.Y3_7dFxQF5xjS7WuhtdxiQ'
const drawerWidth = 240

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

const mdTheme = createTheme()



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
  var rate;
  if (mode=="mapbox/driving-traffic") rate = 404;
  else if (mode == "mapbox/driving") rate = 300;
  else if (mode == "mapbox/walking") rate = 0;
  console.log(rate)
  if (rate != undefined) {
    return rate * distance;
  }
  return -1;
}

export default function Home() {

  var modeTransport = "mapbox/driving-traffic"

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
      style: 'mapbox://styles/mapbox/streets-v11',
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
      console.log('traveling via ' + profile.profile)
    })

    mapboxDirections.on('route', (route) => {
      console.log(route.route)
      console.log(route.route[0].distance + ' meters')
      console.log(
        'start at ' + mapboxDirections.getOrigin()
      )
      console.log(
        'end at ' + mapboxDirections.getDestination().geometry.coordinates
      )
      var date = new Date()
      console.log(modeTransport)
      var emission = calculateCo2ByGram(modeTransport, route.route[0].distance)
      submitTrip(
        0,
        date.toDateString(),
        "titleValue",
        mapboxDirections.getOrigin().geometry.coordinates,
        mapboxDirections.getDestination().geometry.coordinates,
        route.route[0].distance,
        modeTransport,
        emission,
      )
      
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
        console.log(responseObj)
        // console.log(responseObj.features[0].place_name); // Hello, world!
      }
      xhr.send()
    }
  }, [])

  return (
    <ThemeProvider theme={mdTheme}>
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
              Your susTrip Dashboard
            </Typography>
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
          <title>react-map-gl example</title>
        </Head>

        <Box>
          <div
            id="map"
            style={{
              position: 'absolute',
              top: 65,
              bottom: 350,
              width: '100%',
            }}
          >
            there should be a map here
          </div>
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                {[0, 1, 2].map((value) => (
                  <Grid key={value} item>
                    <Paper
                      sx={{
                        height: 140,
                        width: 100,
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
