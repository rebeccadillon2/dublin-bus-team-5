import React, { useState } from "react";

import {
  TimeTable,
  NoMoreBuses,
  getDisplayData,
  getCurrentTime,
} from "../realtime";
import { useTheme } from "../../hooks";
import { TableSkeleton } from "../skeleton";

function Stop({ stop, idx, stops }) {
  const [isDarkMode] = useTheme();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayValues, setDisplayValues] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [times, setTimes] = useState(null);

  const handleClick = () => {
    if (displayValues) {
      setHidden(!hidden);
      return;
    }
    const time = getCurrentTime();
    setTimes(time);
    getDisplayData(time, stop.stopId, setDisplayValues, setLoading, setError);
  };

  return (
    <div
      onClick={handleClick}
      className={`px-2 py-3 truncate cursor-pointer transition-all ease-in-out ${
        isDarkMode
          ? "hover:bg-system-grey6 active:bg-system-grey5"
          : "hover:bg-system-grey2 active:bg-system-grey3"
      } ${
        idx === stops.length - 1
          ? "rounded-b-xl"
          : isDarkMode
          ? "border-b border-b-system-grey6"
          : "border-b border-b-system-grey2"
      } ${idx === 0 ? "rounded-t-xl" : ""}`}
    >
      <p>
        {idx + 1}. {stop.stopId_StopName}
      </p>
      {error ? (
        <p>Error</p>
      ) : loading ? (
        <div className='my-3'>
          <TableSkeleton variant={"routes"} />
        </div>
      ) : displayValues && displayValues.length > 0 ? (
        <div className={`${hidden ? "hidden" : ""} ml-1 mt-4 mb-3`}>
          <TimeTable
            time={times}
            displayValues={displayValues}
            variant={"routes"}
          />
        </div>
      ) : (
        displayValues &&
        displayValues.length === 0 && (
          <div className='my-3'>
            <NoMoreBuses />
          </div>
        )
      )}
    </div>
  );
}

export function RouteStopsList({ stops }) {
  const [isDarkMode] = useTheme();
  const themeClasses = `${
    isDarkMode
      ? "border-system-grey7  bg-system-grey7 text-system-grey2"
      : "border-system-grey3  bg-system-grey1 text-system-grey6"
  }`;
  const classes = `flex flex-col border rounded-xl shadow-lg text-sm ${themeClasses}`;

  return (
    <div className={classes}>
      {stops.map((stop, idx) => (
        <Stop key={`${stop.id}${idx}`} stop={stop} idx={idx} stops={stops} />
      ))}
    </div>
  );
}
