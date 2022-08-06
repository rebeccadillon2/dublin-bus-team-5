import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  Marker,
  GoogleMap,
  useJsApiLoader,
  MarkerClusterer,
  DirectionsRenderer,
} from "@react-google-maps/api";

import {
  errorTypes,
  getMapOptions,
  setUserLocation,
  routeErrorCheck,
  getInputOptions,
  JourneyContainer,
  getMapContainerStyle,
  MobileMainMenu,
  configureWeatherVariables,
  addMLPredictionsToResponse,
} from "../components/journey";
import { center, libraries } from "../lib/map";
import { getAllRoutes, getAllStops } from "../lib/api";
import { LoadingSpinner } from "../components/loading";
import { useWindowSize, useTheme, useExpanded, useResize } from "../hooks";
import {
  MapDetailsContext,
  MapRefContext,
  MapContainerContext,
  ContainerType,
  PlaceType,
  DirectionsContext,
} from "../App";
import { MobileSidePanel } from "../components/sidepanel";

export function Journey() {
  const mapRef = useRef();
  const originRef = useRef(null);
  const [width] = useWindowSize();
  const [isDarkMode] = useTheme();
  const [isExpanded] = useExpanded();
  const destinationRef = useRef(null);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(null);
  const { setMapRefContext } = useContext(MapRefContext);
  const { mapContainerType } = useContext(MapContainerContext);
  const { mapDetails, setMapDetails } = useContext(MapDetailsContext);
  const { directionsDetails, setDirectionsDetails } =
    useContext(DirectionsContext);
  const [openSidePanel, setOpenSidePanel] = useState(false);

  const [, windowHeight] = useResize();

  const [origin, setOrigin] = useState(null);
  const [allRoutes, setAllRoutes] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedRouteMarkers, setSelectedRouteMarkers] = useState(null);
  const [allStops, setAllStops] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleSidePanelClose = () => {
    setOpenSidePanel(false);
  };

  const calculateRoute = async (ol, dl) => {
    const originVal = typeof ol === "string" ? ol : originRef.current.value;
    const destinationVal =
      typeof dl === "string" ? dl : destinationRef.current.value;
    if (routeErrorCheck(originVal, destinationVal, setInputError, time)) return;

    setDirectionsDetails({
      ...directionsDetails,
      origin: originVal,
      destination: destinationVal,
    });

    setOrigin(originVal);
    const dirServ = new window.google.maps.DirectionsService();

    const weatherVariables = await configureWeatherVariables(time);

    try {
      setInputError(null);
      setLoading(true);
      const results = await dirServ.route({
        origin: originVal,
        destination: destinationVal,
        travelMode: window.google.maps.TravelMode.TRANSIT,
        transitOptions: { departureTime: time, modes: ["BUS"] },
        provideRouteAlternatives: true,
      });

      const predictedResults = await addMLPredictionsToResponse(
        results,
        weatherVariables
      );
      setLoading(false);
      setMapDetails({ resObj: predictedResults, routeIdx: 0, markers: [] });
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

  useEffect(() => {
    const getAllStopsData = async () => {
      try {
        const { data } = await getAllStops();
        console.log("ALl stops: ", data);
        setAllStops(data);
      } catch (e) {
        console.log(e);
      }
    };
    getAllStopsData();
  }, []);

  useEffect(() => {
    const getAllRoutesData = async () => {
      try {
        const { data } = await getAllRoutes();
        data.shift();
        console.log("ALl routes: ", data);
        setAllRoutes(data);
      } catch (e) {
        console.log(e);
      }
    };
    getAllRoutesData();
  }, []);

  const panTo = useCallback(({ lat, lng }, zoom) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(zoom);
  }, []);

  if (!isLoaded)
    return (
      <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
        <LoadingSpinner size={"large"} />
      </div>
    );

  return (
    <>
      <MobileMainMenu setOpenSidePanel={setOpenSidePanel} />
      <div style={{ height: "100%", width: "100%" }}>
        <JourneyContainer
          origin={origin}
          allRoutes={allRoutes}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          setSelectedRouteMarkers={setSelectedRouteMarkers}
          panTo={panTo}
          allStops={allStops}
          selectedStop={selectedStop}
          setSelectedStop={setSelectedStop}
          time={time}
          setTime={setTime}
          loading={loading}
          originRef={originRef}
          inputError={inputError}
          clearRoute={clearRoute}
          handleFocus={handleFocus}
          handleSwitch={handleSwitch}
          destinationRef={destinationRef}
          calculateRoute={calculateRoute}
          inputOptions={getInputOptions()}
          setUserLocation={setUserLocation}
        />
        <GoogleMap
          center={center}
          zoom={12}
          options={getMapOptions(isDarkMode)}
          mapContainerStyle={getMapContainerStyle(
            width,
            isExpanded,
            windowHeight
          )}
          onLoad={onMapLoad}
        >
          {mapContainerType.type === ContainerType.REALTIME ||
          mapContainerType.type === ContainerType.FAV_STOPS ||
          mapContainerType.place === PlaceType.REALTIME ? (
            <>
              {allStops && (
                <MarkerClusterer>
                  {(clusterer) =>
                    allStops.map((stop, idx) => (
                      <Marker
                        key={`${stop.id}${idx}`}
                        clusterer={clusterer}
                        position={{ lat: stop.stopLat, lng: stop.stopLon }}
                      />
                    ))
                  }
                </MarkerClusterer>
              )}
            </>
          ) : mapContainerType.type === ContainerType.ROUTES ||
            mapContainerType.type === ContainerType.FAV_ROUTES ||
            mapContainerType.place === PlaceType.ROUTES ? (
            <>
              {selectedRouteMarkers &&
                selectedRouteMarkers.map((marker, idx) => (
                  <Marker
                    key={`${marker.stopId}`}
                    position={{
                      lat: marker.stopId_StopLat,
                      lng: marker.stopId_StopLon,
                    }}
                  />
                ))}
            </>
          ) : (
            <>
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
            </>
          )}
        </GoogleMap>
        <MobileSidePanel
          open={openSidePanel}
          setOpen={setOpenSidePanel}
          handleClose={handleSidePanelClose}
        />
      </div>
    </>
  );
}
