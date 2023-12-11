import React from 'react';
import DeckGL, {LineLayer, ScatterplotLayer, MapView} from 'deck.gl';
import Map  from 'react-map-gl';
import {Box, Heading} from '@chakra-ui/react';
import bart from '../src/data/bartStations.json';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import maplibregl from 'maplibre-gl';


function App() {

  const initialMap = {
    longitude: -122.271604,
    latitude: 37.803664,
    zoom: 10,
    pitch: 0,
    bearing: 0
  };

    const dataLine = [{
      sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]
    }];

    const layerLine = [
      new LineLayer({id: 'line-layer', dataLine})
    ];

    const scatterplotLayer = new ScatterplotLayer({
      id: 'bart-stations',
      data: bart,
      getRadius: d => Math.sqrt(d.entries) / 10,
      getPosition: d => d.coordinates,
      getFillColor: d => [255, 140, 0],
      getLineColor: d => [0, 0, 0],
      pickable: true,
      radiusScale: 50,
      opacity: 0.6
    });

    const attLayers = ({object}) => {
      return (object && `${object.name} \n ${object.address}`);
    };

    // mapbox token 
    const mapboxToken = "pk.eyJ1IjoiZmFraHJpeXJhbWFkaGFuMjUiLCJhIjoiY2xvZng2eGg1MHZrNzJrbWVnb2RnbXhmaiJ9.pteJJ_5mXltTyD_oUW7Lqg";
    const mapStyle = "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

  return (
    <>
    <Box>
    <Heading as='h2' size='2xl'>DeckGL map sample</Heading>
    </Box>
    <Box>
      <DeckGL initialViewState={initialMap} controller={true} layers={[scatterplotLayer]} getTooltip={attLayers}>
        {/* <LineLayer data={dataLine}/> */}
        <MapView id="map" width="100%" controller={true}>
        <Map mapboxAccessToken={mapboxToken} mapStyle={mapStyle} reuseMaps mapLib={maplibregl}/>
        </MapView>
      </DeckGL>
      </Box>
    </>
  )
}

export default App
