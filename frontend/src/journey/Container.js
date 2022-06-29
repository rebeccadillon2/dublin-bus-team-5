import React, { useContext, useState } from "react";

import JourneyForm from "./Form";
import { useTheme } from "../hooks";
import RouteOptions from "./RouteOptions";
import { MapDetailsContext } from "../App";
import { ContentContainer } from "../components/container";
import ExploreContent from "./ExploreContent";

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
  const [isDarkMode] = useTheme();

  const inputClasses = `h-10 rounded-xl w-80 px-2 focus:outline-none hover:placeholder-primary-blue ${
    isDarkMode
      ? "bg-primary-black text-system-grey1 placeholder-system-grey4"
      : "bg-primary-white text-system-grey7"
  }`;

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
          {mapDetails.resObj && (
            <RouteOptions setContainerType={setContainerType} />
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
