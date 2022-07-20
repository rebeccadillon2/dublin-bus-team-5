import React, { useState, useEffect, useContext } from "react";

import { Error } from "../error";
import { useTheme } from "../../hooks";
import { getUser } from "../../lib/api";
import { TableSkeleton } from "../skeleton";
import { getPayload } from "../../lib/auth";
import { MapContainerContext } from "../../App";
import { Navigation, Header } from "../journey";

function NoFavStops() {
  const [isDarkMode] = useTheme();
  const classes = `${isDarkMode ? "text-system-grey4" : "text-system-grey5"}`;

  return <div className={classes}>No favourite stops</div>;
}

function FavStopsList({ favStops, handleClick }) {
  const [isDarkMode] = useTheme();
  const themeClasses = `${
    isDarkMode
      ? "border-system-grey7  bg-system-grey7 text-system-grey2"
      : "border-system-grey3  bg-system-grey1 text-system-grey6"
  }`;
  const classes = `flex flex-col border rounded-xl shadow-lg text-sm ${themeClasses}`;

  return (
    <div className={classes}>
      {favStops.map((stop, idx) => (
        <div
          onClick={() => handleClick(stop)}
          key={`${stop.id}${idx}`}
          className={`px-2 py-3 truncate cursor-pointer transition-all ease-in-out ${
            isDarkMode
              ? "hover:bg-system-grey6 active:bg-system-grey5"
              : "hover:bg-system-grey2 active:bg-system-grey3"
          } ${
            idx === favStops.length - 1
              ? "rounded-b-xl"
              : isDarkMode
              ? "border-b border-b-system-grey6"
              : "border-b border-b-system-grey2"
          } ${idx === 0 ? "rounded-t-xl" : ""}`}
        >
          <p>{stop.stopName}</p>
        </div>
      ))}
    </div>
  );
}

export function FavouriteStops({ setSelectedStop }) {
  const userId = getPayload().sub;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favStops, setFavStops] = useState(null);
  const { setMapContainerType } = useContext(MapContainerContext);

  const handleClick = (stop) => {
    setSelectedStop(stop);
    setMapContainerType({ type: "realtime" });
  };

  useEffect(() => {
    const getFavStops = async () => {
      try {
        setLoading(true);
        const { data } = await getUser(userId);
        console.log("data", data.favouritedStops);
        setFavStops(data.favouritedStops);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
        console.log(e);
      }
    };
    getFavStops();
  }, []);

  return (
    <div className='mb-6'>
      <Navigation type={"realtime"} />
      <Header variant={true} title={"Favourite Stops"} />
      <div className='mt-2'>
        {error ? (
          <Error variant='default' />
        ) : loading ? (
          <TableSkeleton />
        ) : favStops ? (
          <>
            {favStops.length < 1 ? (
              <NoFavStops />
            ) : (
              <FavStopsList favStops={favStops} handleClick={handleClick} />
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
