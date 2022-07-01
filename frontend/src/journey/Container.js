import React, { useContext, useState } from "react";

import JourneyForm from "./Form";
import RouteOptions from "./RouteOptions";
import { MapDetailsContext } from "../App";
import ExploreContent from "./ExploreContent";
import { ContentContainer } from "../components/container";
import { LoadingSpinner } from "../components/loading";

export const ContainerType = {
  DEFAULT: "default",
  EXPLORE: "explore",
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

export default function JourneyContainer(props) {
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
            <div className='mt-5'>
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
      ) : (
        <></>
      )}
    </ContentContainer>
  );
}
