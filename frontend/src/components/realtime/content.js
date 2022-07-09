import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import React, { useContext, useEffect, useState } from "react";

import {
  TimeTable,
  getCurrentTime,
  getDisplayData,
  panToSelectedStop,
} from ".";
import { Error } from "../error";
import { Header } from "../journey";
import { TableSkeleton } from "../skeleton";
import { StopsSearch } from "../elements/form";
import { MapContainerContext } from "../../App";

export function RealTimeContent({
  panTo,
  allStops,
  selectedStop,
  setSelectedStop,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayValues, setDisplayValues] = useState([]);
  const { mapContainerType, setMapContainerType } =
    useContext(MapContainerContext);

  const handleFavClick = () => {
    setMapContainerType({ ...mapContainerType, type: "fav_stops" });
  };

  useEffect(() => {
    if (selectedStop === null) {
      return;
    }
    panToSelectedStop(panTo, selectedStop);
    const time = getCurrentTime();
    console.log("currentTime", time);
    getDisplayData(time, selectedStop, setDisplayValues, setLoading, setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStop]);

  return (
    <div>
      <div className='flex items-center justify-between ml-1'>
        <Header variant={true} title={"Realtime"} />
        <div
          onClick={handleFavClick}
          className='flex items-center justify-center text-primary-blue active:text-dark-blue1 cursor-pointer text-sm pr-1'
        >
          <p className='pr-1'>Favourites</p>
          <HiOutlineArrowNarrowRight />
        </div>
      </div>
      <div className='mb-4 mt-2'>
        <StopsSearch
          selectedStop={selectedStop}
          setSelectedStop={setSelectedStop}
          stops={allStops}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className='pt-2'>
        {error ? (
          <Error />
        ) : loading ? (
          <TableSkeleton />
        ) : displayValues.length > 0 ? (
          <TimeTable displayValues={displayValues} />
        ) : (
          <></>
        )}
      </div>
      <div></div>
    </div>
  );
}
