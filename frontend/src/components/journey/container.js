import React, { useContext, useState } from "react";

import { LoadingSpinner } from "../loading";
import { ContentContainer } from "../container";
import ConnectSpotify from "../spotify/connect";
import { SpotifyContent } from "../spotify/content";

import { RouteOptions, JourneyForm, ExploreContent } from ".";
import { AuthenticatedContext, MapDetailsContext } from "../../App";

export const ContainerType = {
  DEFAULT: "default",
  EXPLORE: "explore",
  SPOTIFY: "spotify",
};

export const PlaceType = {
  GYM: "gym",
  BANK: "bank",
  COFFEE: "cafe",
  HOTEL: "lodging",
  TOGGLE: "toggle",
  HOSPITAL: "hospital",
  PHARMACY: "pharmacy",
  RESTAURANT: "restaurant",
  TAKEOUT: "meal_takeaway",
  GROCERIES: "supermarket",
};

export function JourneyContainer(props) {
  const { isAuthenticated } = useContext(AuthenticatedContext);

  const [containerType, setContainerType] = useState({
    type: ContainerType.DEFAULT,
    place: null,
  });

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
      {containerType.type === ContainerType.DEFAULT ? (
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
            mapDetails.resObj && (
              <RouteOptions setContainerType={setContainerType} />
            )
          )}
        </div>
      ) : containerType.type === ContainerType.EXPLORE ? (
        <ExploreContent
          setContainerType={setContainerType}
          containerType={containerType}
        />
      ) : containerType.type === ContainerType.SPOTIFY ? (
        <SpotifyContent
          setContainerType={setContainerType}
          containerType={containerType}
        />
      ) : (
        <></>
      )}
      {isAuthenticated && containerType.type === ContainerType.DEFAULT && (
        <ConnectSpotify
          containerType={containerType}
          setContainerType={setContainerType}
        />
      )}
    </ContentContainer>
  );
}
