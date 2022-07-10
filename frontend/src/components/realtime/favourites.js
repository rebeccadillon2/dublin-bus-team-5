import React, { useState, useEffect, useContext } from "react";
import { MapContainerContext } from "../../App";
import { useTheme } from "../../hooks";

import { getUser } from "../../lib/api";
import { getPayload } from "../../lib/auth";
import { Error } from "../error";

import { Navigation, Header } from "../journey";
import { TableSkeleton } from "../skeleton";

export function FavouriteStops({ setSelectedStop }) {
  const { setMapContainerType } = useContext(MapContainerContext);

  const [isDarkMode] = useTheme();
  const userId = getPayload().sub;
  const [favStops, setFavStops] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
          <Error />
        ) : loading ? (
          <TableSkeleton />
        ) : favStops ? (
          <>
            {favStops.length < 1 ? (
              <div className='text-black '>No favourite stops</div>
            ) : (
              <div
                className={`flex flex-col border rounded-xl shadow-lg text-sm ${
                  isDarkMode
                    ? "border-system-grey7  bg-system-grey7 text-system-grey2"
                    : "border-system-grey3  bg-system-grey1 text-system-grey6"
                }`}
              >
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
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
