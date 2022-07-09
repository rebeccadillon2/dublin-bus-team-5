import React, { useContext, useEffect, useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import { Header } from "../journey";
import { StopsSearch } from "../elements/form";
import { MapContainerContext } from "../../App";

export function RealTimeContent({
  allStops,
  selectedStop,
  setSelectedStop,
  panTo,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const { mapContainerType, setMapContainerType } =
    useContext(MapContainerContext);

  const handleFavClick = () => {
    setMapContainerType({ ...mapContainerType, type: "fav_stops" });
  };

  useEffect(() => {
    if (selectedStop === null) {
      return;
    }
    const lat = parseFloat(selectedStop.stopLat);
    const lng = parseFloat(selectedStop.stopLon);
    panTo({ lat, lng });
    console.log(selectedStop);
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
      <div></div>
    </div>
  );
}
