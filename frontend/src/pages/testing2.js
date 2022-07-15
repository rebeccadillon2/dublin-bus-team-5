import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../components/elements/button";
import {
  getRouteStopsSingle,
  getRouteDirectionStopCount,
  getAllRoutes,
} from "../lib/api";

export function Testing2() {
  const handleClick = async () => {
    try {
      const { data } = await getRouteStopsSingle(
        "60-46A-d12-1",
        "Outside Train Station - Phoenix Park Gate"
      );
      console.log("Stops:", data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleStopCount = async () => {
    try {
      const { data } = await getRouteDirectionStopCount(
        "60-46A-d12-1",
        "Outside Train Station - Phoenix Park Gate"
      );
      console.log("Count:", data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAllRoutes = async () => {
    try {
      const { data } = await getAllRoutes();
      console.log("Routes:", data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`w-100 h-[100vh]`}>
      <div className='m-2'>
        <PrimaryButton onClick={handleClick} type='action'>
          Get route direction stops
        </PrimaryButton>
      </div>
      <div className='m-2'>
        <PrimaryButton onClick={handleStopCount} type='action'>
          Get stop count for route direction
        </PrimaryButton>
      </div>
      <div className='m-2'>
        <PrimaryButton onClick={handleAllRoutes} type='action'>
          Get all routes
        </PrimaryButton>
      </div>
    </div>
  );
}
