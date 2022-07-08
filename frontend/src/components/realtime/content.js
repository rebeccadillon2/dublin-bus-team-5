import React, { useContext, useState } from "react";
import { MapContainerContext } from "../../App";
import { SearchInput } from "../elements/form";
import { Header } from "../journey";

export function RealTimeContent() {
  const [stopSearch, setStopSearch] = useState("");
  const { mapContainerType, setMapContainerType } =
    useContext(MapContainerContext);

  const handleFavClick = () => {
    setMapContainerType({ ...mapContainerType, type: "fav_stop" });
  };

  return (
    <div>
      <div className='md:flex hidden ml-1'>
        <Header variant={true} title={"Realtime"} />
      </div>
      <div className='mb-4 mt-2'>
        <SearchInput
          value={stopSearch}
          variant={"expanded"}
          onChange={(e) => setStopSearch(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={handleFavClick}
          className='h-10 rounded-xl bg-primary-blue w-95 text-white active:bg-dark-blue1'
        >
          Favourites
        </button>
      </div>
    </div>
  );
}
