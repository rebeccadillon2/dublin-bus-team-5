import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
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
import { favouriteStop, getUser } from "../../lib/api";
import { getPayload, isUserAuthenticated } from "../../lib/auth";

function FavouriteSection({
  selectedStop,
  isInFavStops,
  handleViewFavClick,
  handleAddRemoveFav,
}) {
  return (
    <div className='flex itesm-center justify-between'>
      <div className='text-primary-red mr-2 mt-0.75 cursor-pointer'>
        {selectedStop === null ? (
          <></>
        ) : isInFavStops() ? (
          <AiFillHeart onClick={handleAddRemoveFav} />
        ) : (
          <AiOutlineHeart onClick={handleAddRemoveFav} />
        )}
      </div>
      <div
        onClick={handleViewFavClick}
        className='flex items-center justify-center text-primary-blue active:text-dark-blue1 cursor-pointer text-sm pr-1'
      >
        <p className='pr-1'>Favourites</p>
        <HiOutlineArrowNarrowRight />
      </div>
    </div>
  );
}

export function RealTimeContent({
  panTo,
  allStops,
  selectedStop,
  setSelectedStop,
}) {
  const userId = getPayload().sub;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favStops, setFavStops] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [displayValues, setDisplayValues] = useState([]);
  const { mapContainerType, setMapContainerType } =
    useContext(MapContainerContext);

  const handleViewFavClick = () => {
    setMapContainerType({ ...mapContainerType, type: "fav_stops" });
  };

  useEffect(() => {
    const getFavStops = async () => {
      try {
        const { data } = await getUser(userId);
        setFavStops(data.favouritedStops);
      } catch (e) {
        console.log(e);
      }
    };
    getFavStops();
  }, []);

  useEffect(() => {
    if (selectedStop === null) {
      return;
    }
    panToSelectedStop(panTo, selectedStop);
    const time = getCurrentTime();
    console.log("currentTime", time);
    console.log("selectedStop", selectedStop);
    getDisplayData(time, selectedStop, setDisplayValues, setLoading, setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStop]);

  const handleAddRemoveFav = async () => {
    try {
      const { data } = await favouriteStop(selectedStop.stopId, userId);
      console.log("favRes", data);
      const res = await getUser(userId);
      setFavStops(res.data.favouritedStops);
    } catch (e) {
      console.log(e);
    }
  };

  const isInFavStops = () => {
    if (!favStops) {
      setTimeout(() => {
        isInFavStops();
      }, 250);
    } else {
      if (favStops.length < 1) return false;
      return favStops.find((stop) => stop.stopId === selectedStop.stopId);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between ml-1'>
        <Header variant={true} title={"Realtime"} />
        {isUserAuthenticated() && (
          <FavouriteSection
            selectedStop={selectedStop}
            isInFavStops={isInFavStops}
            handleAddRemoveFav={handleAddRemoveFav}
            handleViewFavClick={handleViewFavClick}
          />
        )}
      </div>
      <div className='mb-4 mt-2'>
        <StopsSearch
          stops={allStops}
          searchTerm={searchTerm}
          selectedStop={selectedStop}
          setSearchTerm={setSearchTerm}
          setSelectedStop={setSelectedStop}
        />
      </div>
      <div className='pt-2'>
        {error ? (
          <Error variant={"bus-stop"} />
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
