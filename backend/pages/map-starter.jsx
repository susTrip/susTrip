import Head from 'next/head';
import Map, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';
import { useRef } from 'react';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3VzdHJpcCIsImEiOiJjbDdtMDMzdHUwOXd2M3ZwOG9hN29heXV5In0.Y3_7dFxQF5xjS7WuhtdxiQ';

export default function Home() {
    const mapEl = useRef();
    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_TOKEN;
        const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-75.1,40.0],
        zoom: 8
        });
         
        const mapboxDirections = new MapboxDirections({
            accessToken: mapboxgl.accessToken
        });
        mapboxDirections.on('route', (route) => {
            console.log(route.route);
            console.log(route.route[0].distance + " meters");
            console.log(mapboxDirections.getOrigin());
            console.log(mapboxDirections.getDestination());
        })
        mapboxDirections.on('profile', (profile) => {
            console.log(profile);
            
        })
        map.addControl(
            mapboxDirections,
            'top-left'
        );


    },
    []);
    return (
        <div>
            <Head>
                <title>react-map-gl example</title>
            </Head>
            <div id="map" style={{position: "absolute", top: 0, bottom: 0, width: "100%"}}>there should be a map here</div>
        </div>
    );
}

