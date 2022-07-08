import React, { useContext, useState } from "react";

import { LoadingSpinner } from "../loading";
import { ContentContainer } from "../container";
import ConnectSpotify from "../spotify/connect";
import { SpotifyContent } from "../spotify/content";

import { RouteOptions, JourneyForm, ExploreContent } from ".";
import {
  ContainerType,
  MapDetailsContext,
  AuthenticatedContext,
} from "../../App";
import { useMapContainerType } from "../../hooks";

export function JourneyContainer(props) {
  const { isAuthenticated } = useContext(AuthenticatedContext);
  const [mapContainerType] = useMapContainerType();
  // const [containerType, setContainerType] = useState({
  //   type: ContainerType.DEFAULT,
  //   place: null,
  // });

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
        </div>
      ) : mapContainerType.type === ContainerType.EXPLORE ? (
        <ExploreContent />
      ) : mapContainerType.type === ContainerType.SPOTIFY ? (
        <SpotifyContent />
      ) : (
        <></>
      )}
      {isAuthenticated && mapContainerType.type === ContainerType.DEFAULT && (
        <ConnectSpotify />
      )}
    </ContentContainer>
  );
}
