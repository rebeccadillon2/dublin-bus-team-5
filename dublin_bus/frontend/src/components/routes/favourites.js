import React, { useState, useEffect, useContext } from "react";

import { Error } from "../error";
import { useTheme } from "../../hooks";
import { getUser } from "../../lib/api";
import { TableSkeleton } from "../skeleton";
import { getPayload } from "../../lib/auth";
import { Navigation, Header } from "../journey";
import { MapContainerContext } from "../../App";

function NoFavRoutes() {
  const [isDarkMode] = useTheme();
  const classes = `${isDarkMode ? "text-system-grey4" : "text-system-grey5"}`;

  return <div className={classes}>No favourite routes</div>;
}

function FavRoutesList({ favRoutes, handleClick }) {
  const [isDarkMode] = useTheme();
  const themeClasses = `${
    isDarkMode
      ? "border-system-grey7  bg-system-grey7 text-system-grey2"
      : "border-system-grey3  bg-system-grey1 text-system-grey6"
  }`;
  const classes = `flex flex-col border rounded-xl shadow-lg text-sm ${themeClasses}`;

  return (
    <div className={classes}>
      {favRoutes.map((route, idx) => (
        <div
          onClick={() => handleClick(route)}
          key={`${route.rouetId}${idx}`}
          className={`px-2 py-3 truncate cursor-pointer transition-all ease-in-out ${
            isDarkMode
              ? "hover:bg-system-grey6 active:bg-system-grey5"
              : "hover:bg-system-grey2 active:bg-system-grey3"
          } ${
            idx === favRoutes.length - 1
              ? "rounded-b-xl"
              : isDarkMode
              ? "border-b border-b-system-grey6"
              : "border-b border-b-system-grey2"
          } ${idx === 0 ? "rounded-t-xl" : ""}`}
        >
          <p className='truncate'>
            {route.routeShortName}: {route.headsign}
          </p>
        </div>
      ))}
    </div>
  );
}

export function FavouriteRoutes({ setSelectedRoute }) {
  const userId = getPayload().sub;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favRoutes, setFavRoutes] = useState(null);
  const { setMapContainerType } = useContext(MapContainerContext);

  const handleClick = (route) => {
    setSelectedRoute(route);
    setMapContainerType({ type: "routes" });
  };

  useEffect(() => {
    const getFavRoutes = async () => {
      try {
        setLoading(true);
        const { data } = await getUser(userId);
        setFavRoutes(data.favouritedRoutes);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
        console.log(e);
      }
    };
    getFavRoutes();
  }, []);

  return (
    <div className='mb-6'>
      <Navigation type={"realtime"} />
      <Header variant={true} title={"Favourite Routes"} />
      <div className='mt-2'>
        {error ? (
          <Error variant='default' />
        ) : loading ? (
          <TableSkeleton />
        ) : favRoutes ? (
          <>
            {favRoutes.length < 1 ? (
              <NoFavRoutes />
            ) : (
              <FavRoutesList favRoutes={favRoutes} handleClick={handleClick} />
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
