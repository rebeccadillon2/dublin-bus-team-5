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
import { getPayload, isUserAuthenticated } from "../../lib/auth";
import { favouriteStop, getUser } from "../../lib/api";

export function RealTimeContent({
  panTo,
  allStops,
  selectedStop,
  setSelectedStop,
}) {
  const userId = getPayload().sub;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
        console.log("data", data.favouritedStops);
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
          <div className='flex itesm-center justify-between'>
            <div className='mr-2 mt-0.5'>
              {console.log("ss", selectedStop)}
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
        )}
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
