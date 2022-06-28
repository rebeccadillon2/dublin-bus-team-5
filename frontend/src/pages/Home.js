import React, { useState, useRef, useContext, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

import RouteOptions from "./RouteOptions";
import { routeErrorCheck } from "../components/journey";
import { MapDetailsContext, MapRefContext } from "../App";
import { LoadingSpinner } from "../components/loading/loading";
import { center, libraries } from "../lib/map";
const searchLimits = {
  componentRestrictions: { country: ["ie"] },
};

export default function Home() {
  const mapRef = useRef();
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(null);
  const [inputError, setInputError] = useState(null);
  const { setMapRefContext } = useContext(MapRefContext);
  const { mapDetails, setMapDetails } = useContext(MapDetailsContext);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const calculateRoute = async () => {
    const originVal = originRef.current.value;
    const destinationVal = destinationRef.current.value;
    if (routeErrorCheck(originVal, destinationVal, setInputError)) return;

    const dirServ = new window.google.maps.DirectionsService();

    const results = await dirServ.route({
      origin: originVal,
      destination: destinationVal,
      travelMode: window.google.maps.TravelMode.TRANSIT,
      transitOptions: { modes: ["BUS"] },
      provideRouteAlternatives: true,
    });

    console.log("res", results);
    setMapDetails({ resObj: results, routeIdx: 0, markers: [] });
  };

  const getRoute = () => {
    if (mapDetails.routeIdx) {
      return parseInt(mapDetails.routeIdx);
    }
    return 0;
  };

  // const onMapLoad = useCallback((map) => {
  //   mapRef.current = map;
  // }, []);

  useEffect(() => {
    setMapRefContext(mapRef);
  }, []);

  if (!isLoaded)
    return (
      <div className='h-100 w-100 flex items-center justify-center'>
        <LoadingSpinner size={"large"} />
      </div>
    );

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div>
        <Autocomplete options={searchLimits}>
          <input ref={originRef} placeholder={"Origin"} type='text' />
        </Autocomplete>
        <Autocomplete options={searchLimits}>
          <input ref={destinationRef} placeholder={"Destination"} type='text' />
        </Autocomplete>
        <button
          style={{ backgroundColor: "blue", color: "white" }}
          onClick={calculateRoute}
        >
          Search
        </button>
        {mapDetails.resObj && <RouteOptions />}
      </div>
      <GoogleMap
        center={center}
        zoom={12}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{ fullscreenControl: false, streetViewControl: false }}
        onLoad={(mapLoaded) => setMapLoaded(mapLoaded)}
      >
        {mapDetails.resObj && (
          <DirectionsRenderer
            directions={mapDetails.resObj}
            routeIndex={getRoute()}
          />
        )}
      </GoogleMap>
    </div>
  );
}
