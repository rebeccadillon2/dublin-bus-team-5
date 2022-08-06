import React, { useState, useEffect, useContext } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import { Error } from "../error";
import { RouteStopsList } from ".";
import { Header } from "../journey";
import { TableSkeleton } from "../skeleton";
import { MapContainerContext } from "../../App";
import { RoutesSearch } from "../elements/form";
import { getPayload, isUserAuthenticated } from "../../lib/auth";
import { favouriteRoute, getRouteStopsSingle, getUser } from "../../lib/api";

function FavouriteSection({
  selectedRoute,
  isInFavRoutes,
  handleViewFavClick,
  handleAddRemoveFav,
}) {
  return (
    <div className='flex itesm-center justify-between'>
      <div className='text-primary-red mr-2 mt-0.75 cursor-pointer'>
        {selectedRoute === null ? (
          <></>
        ) : isInFavRoutes() ? (
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

export function RoutesContent({
  panTo,
  allRoutes,
  selectedRoute,
  setSelectedRoute,
  setSelectedRouteMarkers,
}) {
  const userId = getPayload().sub;
  const [stops, setStops] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favRoutes, setFavRoutes] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { mapContainerType, setMapContainerType } =
    useContext(MapContainerContext);

  const handleViewFavClick = () => {
    setMapContainerType({ ...mapContainerType, type: "fav_routes" });
  };

  useEffect(() => {
    const getFavRoutes = async () => {
      try {
        const { data } = await getUser(userId);
        setFavRoutes(data.favouritedRoutes);
      } catch (e) {
        console.log(e);
      }
    };
    getFavRoutes();
  }, []);

  useEffect(() => {
    if (selectedRoute === null) {
      return;
    }
    const getRouteMarkers = async () => {
      try {
        setLoading(true);
        const { data } = await getRouteStopsSingle(
          selectedRoute.routeId,
          selectedRoute.headsign
        );
        setSelectedRouteMarkers(data);
        setStops(data);
        const mid = Math.floor(data.length / 2);
        const lat = parseFloat(data[mid].stopId_StopLat);
        const lng = parseFloat(data[mid].stopId_StopLon);
        panTo({ lat, lng }, 12);
        setLoading(false);
        setError(false);
      } catch (e) {
        setLoading(false);
        setError(true);
        console.log(e);
      }
    };
    getRouteMarkers();
  }, [selectedRoute]);

  const handleAddRemoveFav = async () => {
    try {
      const { data } = await favouriteRoute(
        selectedRoute.routeId,
        selectedRoute.headsign,
        userId
      );
      const res = await getUser(userId);
      setFavRoutes(res.data.favouritedRoutes);
    } catch (e) {
      console.log(e);
    }
  };

  const isInFavRoutes = () => {
    if (!favRoutes) {
      setTimeout(() => {
        isInFavRoutes();
      }, 250);
    } else {
      if (favRoutes.length < 1) {
        return false;
      }
      return favRoutes.find((route) => route.routeId === selectedRoute.routeId);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between ml-1'>
        <Header variant={true} title={"Routes"} />
        {isUserAuthenticated() && (
          <FavouriteSection
            selectedRoute={selectedRoute}
            isInFavRoutes={isInFavRoutes}
            handleAddRemoveFav={handleAddRemoveFav}
            handleViewFavClick={handleViewFavClick}
          />
        )}
      </div>

      <div className='mb-4 mt-2'>
        <RoutesSearch
          routes={allRoutes}
          searchTerm={searchTerm}
          selectedRoute={selectedRoute}
          setSearchTerm={setSearchTerm}
          setSelectedRoute={setSelectedRoute}
        />
      </div>
      {error ? (
        <Error variant='bus-stop' />
      ) : loading ? (
        <TableSkeleton />
      ) : stops ? (
        <>
          <RouteStopsList stops={stops} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
