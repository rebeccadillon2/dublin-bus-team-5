import React, { useContext, useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import { Header } from "../journey";
import { SearchInput } from "../elements/form";
import { MapContainerContext } from "../../App";

export function RealTimeContent() {
  const [stopSearch, setStopSearch] = useState("");
  const { mapContainerType, setMapContainerType } =
    useContext(MapContainerContext);

  const handleFavClick = () => {
    setMapContainerType({ ...mapContainerType, type: "fav_stops" });
  };

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
        <SearchInput
          value={stopSearch}
          variant={"expanded"}
          onChange={(e) => setStopSearch(e.target.value)}
        />
      </div>
      <div></div>
    </div>
  );
}
