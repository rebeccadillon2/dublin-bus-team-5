import React, { useContext, useEffect, useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import { Header } from "../journey";
import { StopsSearch } from "../elements/form";
import { MapContainerContext } from "../../App";
import { getShortRouteName, getStopTimes } from "../../lib/api";
import { useTheme } from "../../hooks";

export function RealTimeContent({
  allStops,
  selectedStop,
  setSelectedStop,
  panTo,
}) {
  const [isDarkMode] = useTheme();
  const [displayValues, setDisplayValues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { mapContainerType, setMapContainerType } =
    useContext(MapContainerContext);

  const handleFavClick = () => {
    setMapContainerType({ ...mapContainerType, type: "fav_stops" });
  };

  const getMinutes = (hms) => {
    const a = hms.split(":");
    var minutes = +a[0] * 60 + +a[1];

    console.log("mins", minutes);
    return minutes;
  };

  useEffect(() => {
    if (selectedStop === null) {
      return;
    }
    const lat = parseFloat(selectedStop.stopLat);
    const lng = parseFloat(selectedStop.stopLon);
    panTo({ lat, lng });
    console.log(selectedStop);

    const now = new Date();
    const time = String(
      now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
    );
    console.log("currentTime", time);
    const getDisplayData = async () => {
      try {
        const { data } = await getStopTimes(selectedStop.stopId, time);
        console.log("data", data);
        const res = await getShortRouteName(
          data[0].tripId,
          data[1].tripId,
          data[2].tripId,
          data[3].tripId,
          data[4].tripId
        );
        console.log("res", res);

        const newState = data.map((obj) => {
          const nowMins = getMinutes(time);
          const temp = getMinutes(obj.arrivalTime) - nowMins;
          const arrivingIn = temp === 0 ? 1 : temp;
          if (obj.tripId === res.data[0].tripId) {
            return {
              ...obj,
              routeShortName: res.data[0].routeShortName,
              arrivingIn: arrivingIn,
            };
          }
          if (obj.tripId === res.data[1].tripId) {
            return {
              ...obj,
              routeShortName: res.data[1].routeShortName,
              arrivingIn: arrivingIn,
            };
          }
          if (obj.tripId === res.data[2].tripId) {
            return {
              ...obj,
              routeShortName: res.data[2].routeShortName,
              arrivingIn: arrivingIn,
            };
          }
          if (obj.tripId === res.data[3].tripId) {
            return {
              ...obj,
              routeShortName: res.data[3].routeShortName,
              arrivingIn: arrivingIn,
            };
          }
          if (obj.tripId === res.data[4].tripId) {
            return {
              ...obj,
              routeShortName: res.data[4].routeShortName,
              arrivingIn: arrivingIn,
            };
          }
          return {
            ...obj,
            routeShortName: res.data[0].routeShortName,
            arrivingIn: arrivingIn,
          };
        });
        console.log("ns", newState);
        setDisplayValues(newState);
      } catch (e) {
        console.log(e);
      }
    };
    getDisplayData();
  }, [selectedStop]);

  return (
    <div>
      <div className='flex items-center justify-between ml-1'>
        <Header variant={true} title={"Realtime"} />
        <div
          onClick={handleFavClick}
          className='flex items-center justify-center text-primary-blue active:text-dark-blue1 cursor-pointer text-sm pr-1'
        >
          <p className='pr-1'>Favourites</p>
          <HiOutlineArrowNarrowRight />
        </div>
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
      <div>
        {displayValues.length > 0 && (
          <div className='w-90'>
            <table
              className={`flex flex-col item-center border  rounded-xl ${
                isDarkMode
                  ? "border-system-grey7  bg-system-grey7"
                  : "border-system-grey3  bg-system-grey1"
              }`}
            >
              <tbody className='flex flex-col'>
                <tr
                  className={`flex justify-around  rounded-t-lg py-1 text-md  ${
                    isDarkMode
                      ? "bg-system-grey7 text-system-grey2 border-b border-b-system-grey6"
                      : "bg-system-grey3 text-system-grey7"
                  }`}
                >
                  <td className='min-w-40 text-center'>Bus Route</td>
                  <td className='min-w-40 text-center'>ETA</td>
                </tr>
                {displayValues.map((value, idx) => (
                  <tr
                    className={`flex justify-around py-1 text-sm  ${
                      isDarkMode ? "text-system-grey3" : "text-system-grey6"
                    } ${
                      displayValues.length - 1 === idx
                        ? ""
                        : isDarkMode
                        ? "border-b border-b-system-grey6"
                        : "border-b border-b-system-grey2"
                    }`}
                    key={idx}
                  >
                    <td className='min-w-40 text-center'>
                      {value.routeShortName}
                    </td>
                    <td className='min-w-40 text-center'>
                      {value.arrivingIn} {value.arrivingIn < 2 ? "min" : "mins"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
}
