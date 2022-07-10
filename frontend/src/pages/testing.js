import React from "react";
import { favouriteStop, getAllStops, getUser } from "../lib/api";
import { getPayload } from "../lib/auth";

export function Testing() {
  const userId = getPayload().sub;

  const handleGetUser = async () => {
    try {
      const { data } = await getUser(userId);
      console.log("userRes", data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFavouriteStop = async () => {
    try {
      const { data } = await favouriteStop("8250DB002016", userId);
      console.log("favRes", data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetAllStops = async () => {
    console.log("clicked");
    try {
      const { data } = await getAllStops();
      console.log("ALl stops: ", data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={handleGetUser}
          className='p-2 rounded-lg bg-primary-blue m-4'
        >
          Get User
        </button>
        <button
          onClick={handleFavouriteStop}
          className='p-2 rounded-lg bg-primary-green m-4'
        >
          Favourite Stop
        </button>
        <button
          onClick={handleGetAllStops}
          className='p-2 rounded-lg bg-primary-green m-4'
        >
          Get all stops
        </button>
      </div>
    </>
  );
}
