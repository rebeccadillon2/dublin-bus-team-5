import React, { useContext } from "react";
import { ContentContainer } from "../container";
import { Autocomplete } from "@react-google-maps/api";
import RouteOptions from "../../pages/RouteOptions";
import { MapDetailsContext } from "../../App";

const searchLimits = {
  componentRestrictions: { country: ["ie"] },
};

export function JourneyContainer(props) {
  const { originRef, destinationRef, calculateRoute } = props;
  const { mapDetails } = useContext(MapDetailsContext);

  return (
    <ContentContainer>
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
    </ContentContainer>
  );
}
