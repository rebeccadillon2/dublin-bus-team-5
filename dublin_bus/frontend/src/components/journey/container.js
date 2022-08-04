import React, { useContext } from "react";
import {
  ContainerType,
  MapDetailsContext,
  AuthenticatedContext,
} from "../../App";

import { WeatherContent } from "../weather";
import { TableSkeleton } from "../skeleton";
import ConnectSpotify from "../spotify/connect";
import { ContentContainer } from "../container";
import { useMapContainerType } from "../../hooks";
import { SpotifyContent } from "../spotify/content";
import { FavouriteRoutes, RoutesContent } from "../routes";
import { RealTimeContent, FavouriteStops } from "../realtime";
import { RouteOptions, JourneyForm, ExploreContent, Header } from ".";

export function JourneyContainer(props) {
  const [mapContainerType] = useMapContainerType();
  const { mapDetails } = useContext(MapDetailsContext);
  const { isAuthenticated } = useContext(AuthenticatedContext);

  const {
    origin,
    allRoutes,
    selectedRoute,
    setSelectedRoute,
    setSelectedRouteMarkers,
    panTo,
    allStops,
    selectedStop,
    setSelectedStop,
    time,
    setTime,
    loading,
    originRef,
    inputError,
    clearRoute,
    handleFocus,
    inputOptions,
    handleSwitch,
    destinationRef,
    calculateRoute,
    setUserLocation,
  } = props;

  return (
    <ContentContainer>
      {mapContainerType.type === ContainerType.DEFAULT ? (
        <>
          <div className='md:flex hidden'>
            <Header variant={true} title={"Search"} />
          </div>
          <div className='input-container	md:mt-2 overflow-x-hidden'>
            <JourneyForm
              time={time}
              setTime={setTime}
              originRef={originRef}
              inputError={inputError}
              clearRoute={clearRoute}
              handleFocus={handleFocus}
              inputOptions={inputOptions}
              handleSwitch={handleSwitch}
              calculateRoute={calculateRoute}
              destinationRef={destinationRef}
              setUserLocation={setUserLocation}
            />
            {loading ? (
              <div className='mt-6'>
                <TableSkeleton />
              </div>
            ) : (
              mapDetails.resObj && <RouteOptions />
            )}
            {isAuthenticated && <ConnectSpotify />}
          </div>
        </>
      ) : mapContainerType.type === ContainerType.EXPLORE ? (
        <ExploreContent calculateRoute={calculateRoute} origin={origin} />
      ) : mapContainerType.type === ContainerType.SPOTIFY ? (
        <SpotifyContent />
      ) : mapContainerType.type === ContainerType.REALTIME ? (
        <RealTimeContent
          panTo={panTo}
          allStops={allStops}
          selectedStop={selectedStop}
          setSelectedStop={setSelectedStop}
        />
      ) : mapContainerType.type === ContainerType.FAV_STOPS ? (
        <FavouriteStops setSelectedStop={setSelectedStop} />
      ) : mapContainerType.type === ContainerType.WEATHER ? (
        <WeatherContent />
      ) : mapContainerType.type === ContainerType.ROUTES ? (
        <RoutesContent
          panTo={panTo}
          allRoutes={allRoutes}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          setSelectedRouteMarkers={setSelectedRouteMarkers}
        />
      ) : mapContainerType.type === ContainerType.FAV_ROUTES ? (
        <FavouriteRoutes setSelectedRoute={setSelectedRoute} />
      ) : (
        <></>
      )}
    </ContentContainer>
  );
}
