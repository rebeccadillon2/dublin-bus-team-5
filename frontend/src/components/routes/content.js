import React, { useState, useEffect, useContext } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import { Header } from "../journey";
import { getPayload, isUserAuthenticated } from "../../lib/auth";
import { RoutesSearch } from "../elements/form";
import { favouriteRoute, getRouteStopsSingle, getUser } from "../../lib/api";
import { MapContainerContext } from "../../App";

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
        console.log("user", data);
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
    console.log("sr", selectedRoute);
    const getRouteMarkers = async () => {
      try {
        const { data } = await getRouteStopsSingle(
          selectedRoute.routeId,
          selectedRoute.headsign
        );
        console.log("markers:", data);
        setSelectedRouteMarkers(data);
        const mid = Math.floor(data.length / 2);
        const lat = parseFloat(data[mid].stopId_StopLat);
        const lng = parseFloat(data[mid].stopId_StopLon);
        panTo({ lat, lng }, 12);
      } catch (e) {
        console.log(e);
      }
    };
    getRouteMarkers();
    console.log("New route selected");
  }, [selectedRoute]);

  const handleAddRemoveFav = async () => {
    try {
      const { data } = await favouriteRoute(
        selectedRoute.routeId,
        selectedRoute.headsign,
        userId
      );
      console.log("favR", data);
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
      <div></div>
    </div>
  );
}
