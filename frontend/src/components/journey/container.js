import React, { useContext } from "react";

import { LoadingSpinner } from "../loading";
import { ContentContainer } from "../container";
import ConnectSpotify from "../spotify/connect";
import { SpotifyContent } from "../spotify/content";

import {
  ContainerType,
  MapDetailsContext,
  AuthenticatedContext,
} from "../../App";
import { useMapContainerType } from "../../hooks";
import { RouteOptions, JourneyForm, ExploreContent, Header } from ".";

export function JourneyContainer(props) {
  const [mapContainerType] = useMapContainerType();
  const { isAuthenticated } = useContext(AuthenticatedContext);

  const {
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
  const { mapDetails } = useContext(MapDetailsContext);

  return (
    <ContentContainer>
      {mapContainerType.type === ContainerType.DEFAULT ? (
        <>
          <div className='md:flex hidden'>
            <Header variant={true} title={"Search"} />
          </div>
          <div className='input-container overflow-y-scroll	md:mt-2'>
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
              <div className='mt-20'>
                <LoadingSpinner />
              </div>
            ) : (
              mapDetails.resObj && <RouteOptions />
            )}
            {isAuthenticated && <ConnectSpotify />}
          </div>
        </>
      ) : mapContainerType.type === ContainerType.EXPLORE ? (
        <ExploreContent />
      ) : mapContainerType.type === ContainerType.SPOTIFY ? (
        <SpotifyContent />
      ) : (
        <></>
      )}
    </ContentContainer>
  );
}
