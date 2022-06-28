import React, { useContext } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { IoMdLocate } from "react-icons/io";
import { HiOutlineSwitchVertical } from "react-icons/hi";

import { Input } from "../elements/form";
import { currentBrowser } from ".";
import { useTheme } from "../../hooks";
import { MapDetailsContext } from "../../App";
import { ContentContainer } from "../container";
import RouteOptions from "../../journey/RouteOptions";
import JourneyForm from "../../journey/Form";

const searchLimits = {
  componentRestrictions: { country: ["ie"] },
};

export function JourneyContainer(props) {
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
      <div className='input-container overflow-y-scroll	'>
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
        {mapDetails.resObj && <RouteOptions />}
      </div>
    </ContentContainer>
  );
}
