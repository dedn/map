import React, { useCallback, useEffect, useState } from "react";
import ReactMapGL, {
    AttributionControl, FlyToInterpolator,
    FullscreenControl,
    GeolocateControl,
    Marker,
    NavigationControl,
    Popup, ScaleControl
} from "react-map-gl";
import * as parkDate from "./data/skateboard-parks.json";
import ControlPanel from "./control-panel";
import Pins from "./pins";
import CITIES from './data/cities.json';
import CityInfo from "./city-info";

export default function App() {
  const [viewport, setViewport] = useState({
    // latitude: 45.4211,
    // longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 1.5
  });

  const [selectedPark, setSelectedPark] = useState(null);
    const [popupInfo, setPopupInfo] = useState(null);

    const geolocateStyle = {
        top: 0,
        left: 0,
        padding: '10px'
    };

    const fullscreenControlStyle = {
        top: 36,
        left: 0,
        padding: '10px'
    };

    const navStyle = {
        top: 72,
        left: 0,
        padding: '10px'
    };

    const scaleControlStyle = {
        bottom: 36,
        left: 0,
        padding: '10px'
    };

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

    const attributionStyle= {
        right: 0,
        top: 0
    };

    const onSelectCity = useCallback(({longitude, latitude}) => {
        setViewport({
            longitude,
            latitude,
            zoom: 11,
            transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
            transitionDuration: 'auto'
        });
    }, []);

  return (
      <>
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={'pk.eyJ1IjoiZGVkbiIsImEiOiJja3QwM3ZieXIyendzMzJvZGdhMmM3dnpiIn0.gpFPjtwSG-497ILOffYacA'}
            // mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/light-v10"
            onViewportChange={viewport => {
              setViewport(viewport);
            }}
            attributionControl={false}

        >
            <AttributionControl
                captureScroll={true}

                compact={true} style={attributionStyle} />

            {/*/>*/}
            {/*<AttributionControl*/}
            {/*    captureScroll={false}*/}
            {/*    style={attributionStyle}*/}
            {/*/>*/}
          {/*{parkDate.features.map(park => (*/}
          {/*    <Marker*/}
          {/*        key={park.properties.PARK_ID}*/}
          {/*        latitude={park.geometry.coordinates[1]}*/}
          {/*        longitude={park.geometry.coordinates[0]}*/}
          {/*    >*/}
          {/*      <button*/}
          {/*          className="marker-btn"*/}
          {/*          onClick={e => {*/}
          {/*            e.preventDefault();*/}
          {/*            setSelectedPark(park);*/}
          {/*          }}*/}
          {/*      >*/}
          {/*        <img src="/incon.svg" alt="Skate Park Icon" />*/}
          {/*        <span>15</span>*/}
          {/*      </button>*/}
          {/*    </Marker>*/}
          {/*))}*/}
            <Pins data={CITIES} onClick={setPopupInfo} />

            {popupInfo && (
                <Popup
                    tipSize={5}
                    anchor="top"
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                    closeOnClick={false}
                    onClose={setPopupInfo}
                >
                    <CityInfo info={popupInfo} />
                </Popup>
            )}

            <GeolocateControl style={geolocateStyle} />
            <FullscreenControl style={fullscreenControlStyle} />
            <NavigationControl style={navStyle} />
            <ScaleControl style={scaleControlStyle} />
            <ControlPanel onSelectCity={onSelectCity} />
        </ReactMapGL>

      </>
  );
}
