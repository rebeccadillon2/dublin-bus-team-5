import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import {
  Marker,
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { errorTypes } from "../components/journey";
import {
  routeErrorCheck,
  getMapContainerStyle,
  getInputOptions,
  setUserLocation,
  getMapOptions,
} from "../components/journey";
import { MapDetailsContext, MapRefContext } from "../App";
import { LoadingSpinner } from "../components/loading/loading";
import { center, libraries } from "../lib/map";
import JourneyContainer from "./Container";
import { useWindowSize, useTheme, useExpanded } from "../hooks";

export default function Home() {
  const mapRef = useRef();
  const originRef = useRef(null);
  const [width] = useWindowSize();
  const [isDarkMode] = useTheme();
  const [isExpanded] = useExpanded();
  const destinationRef = useRef(null);
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  // const [mapLoaded, setMapLoaded] = useState(null);
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

    try {
      setLoading(true);
      const results = await dirServ.route({
        origin: originVal,
        destination: destinationVal,
        travelMode: window.google.maps.TravelMode.TRANSIT,
        transitOptions: { modes: ["BUS"] },
        provideRouteAlternatives: true,
      });

      setLoading(false);
      console.log("res", results);
      setMapDetails({ resObj: results, routeIdx: 0, markers: [] });
    } catch (e) {
      console.log(e);
      setLoading(false);
      setInputError(errorTypes.GENERAL);
    }
  };

  const clearRoute = () => {
    setInputError(null);
    setMapDetails({ resObj: null, routeIdx: 0, markers: [] });
    originRef.current.value = "";
    destinationRef.current.value = "";
  };

  const handleFocus = () => {
    setInputError(null);
  };

  const handleSwitch = () => {
    const temp = originRef.current.value;
    originRef.current.value = destinationRef.current.value;
    destinationRef.current.value = temp;
  };

  const getRoute = () => {
    if (mapDetails.routeIdx) {
      return parseInt(mapDetails.routeIdx);
    }
    return 0;
  };

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

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
    <div style={{ height: "100%", width: "100%" }}>
      <JourneyContainer
        time={time}
        setTime={setTime}
        loading={loading}
        originRef={originRef}
        inputError={inputError}
        clearRoute={clearRoute}
        handleFocus={handleFocus}
        inputOptions={getInputOptions()}
        handleSwitch={handleSwitch}
        destinationRef={destinationRef}
        calculateRoute={calculateRoute}
        setUserLocation={setUserLocation}
      />
      <GoogleMap
        center={center}
        zoom={12}
        options={getMapOptions(isDarkMode)}
        // mapContainerStyle={{ width: "100%", height: "100%" }}
        mapContainerStyle={getMapContainerStyle(width, isExpanded)}
        onLoad={onMapLoad}
      >
        {mapDetails.markers &&
          mapDetails.markers.length >= 1 &&
          mapDetails.markers.map((marker, idx) => (
            <Marker
              key={`${marker.lat}${idx}`}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))}
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
