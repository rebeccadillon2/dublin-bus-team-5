import React, { useEffect, useState } from "react";
import { getAllStops, getShortRouteName, getStopTimes } from "../lib/api";

export function Testing() {
  const [stopData, setStopData] = useState(null);
  const [error, setError] = useState(false);
  const handleClick = async () => {
    try {
      const { data } = await getStopTimes("8240DB000226", "07:00:00");
      const res = await getShortRouteName(
        data[0].tripId,
        data[1].tripId,
        data[2].tripId,
        data[3].tripId,
        data[4].tripId
      );

      const newState = data.map((obj) => {
        if (obj.tripId === res.data[0].tripId) {
          return { ...obj, routeShortName: res.data[0].routeShortName };
        }
        if (obj.tripId === res.data[1].tripId) {
          return { ...obj, routeShortName: res.data[1].routeShortName };
        }
        if (obj.tripId === res.data[2].tripId) {
          return {
            ...obj,
            routeShortName: res.data[2].routeShortName,
          };
        }
        if (obj.tripId === res.data[3].tripId) {
          return {
            ...obj,
            routeShortName: res.data[3].routeShortName,
          };
        }
        if (obj.tripId === res.data[4].tripId) {
          return {
            ...obj,
            routeShortName: res.data[4].routeShortName,
          };
        }
        return { ...obj, routeShortName: res.data[0].routeShortName };
      });
      setStopData(newState);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  useEffect(() => {
    const getAllStopsData = async () => {
      try {
        const { data } = await getAllStops();
        console.log("ALl stops: ", data);
      } catch (e) {
        console.log(e);
      }
    };
    getAllStopsData();
  }, []);

  return (
    <>
      {/* <p class='md:space-x-1 space-y-1 md:space-y-0 mb-4'>
        <button
          className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#collapseExample'
          aria-expanded='false'
          aria-controls='collapseExample'
        >
          Button with data-bs-target
        </button>
      </p>
      <div className='collapse' id='collapseExample'>
        <div className='block p-6 rounded-lg shadow-lg bg-white w-40'>
          Some placeholder content for the collapse component. This panel is
          hidden by default but revealed when the user activates the relevant
          trigger.
        </div>
      </div>
      */}
      <div className='text-white p-4'>
        <button
          onClick={handleClick}
          className='p-2 rounded-lg bg-primary-blue'
        >
          Get all Stop Times
        </button>
      </div>
      <div className='flex pl-4'>
        {error ? (
          <div>Error</div>
        ) : (
          <div>
            {stopData &&
              stopData[0].routeShortName &&
              stopData
                .sort((a, b) => {
                  return a.arrivalTime - b.arrivalTime;
                })
                .map((item) => (
                  <p key={item.id}>
                    {item.routeShortName} - {item.arrivalTime}
                  </p>
                ))}
          </div>
        )}
      </div>
    </>
  );
}
