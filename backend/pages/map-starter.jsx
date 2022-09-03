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
         
        // const mapboxGeocoder = new MapboxGeocoder({
        //     accessToken: mapboxgl.accessToken
        // });
        const mapboxDirections = new MapboxDirections({
            accessToken: mapboxgl.accessToken
        });
        mapboxDirections.on('route', (route) => {
            console.log(route.route);
            console.log(route.route[0].distance + " meters");
            console.log("start at " + mapboxDirections.getOrigin().geometry.coordinates);
            console.log("end at " + mapboxDirections.getDestination().geometry.coordinates);
            // getCoordsName(mapboxDirections.getOrigin().geometry.coordinates,
            //         mapboxDirections.getDestination().geometry.coordinates);
            
        })
        mapboxDirections.on('profile', (profile) => {
            console.log("traveling via " + profile.profile);
        })
        map.addControl(
            mapboxDirections,
            'top-left'
        );

        var getCoordsName = function(firstCoords, secondCoords) {
            // if(firstCoords === undefined || secondCoords === undefined) {
            //     return 0;
            // }
            var xhr = new XMLHttpRequest();
            var URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + 
                firstCoords[0] + "," + secondCoords[1] + ";" +
                secondCoords[0] + "," + secondCoords[1] + ".json?access_token=" +
                mapboxgl.accessToken;
            
            xhr.open('GET', URL);
            xhr.responseType = 'json';

            xhr.onload = function() {
                let responseObj = xhr.response;
                console.log(responseObj);
                // console.log(responseObj.features[0].place_name); // Hello, world!
            };
            xhr.send();

        }
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

