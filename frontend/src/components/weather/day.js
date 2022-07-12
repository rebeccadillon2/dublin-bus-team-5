import React from "react";

import { days } from ".";
import { useTheme } from "../../hooks";

export function WeatherDay({ item, icon }) {
  const Icon = icon;
  const [isDarkMode] = useTheme();

  return (
    <div className='flex justify-start pl-2 py-2 hover:scale-105 ease-in-out duration-300'>
      <div
        className={`${
          isDarkMode ? "text-system-grey3" : "text-system-grey5"
        } w-[30%]`}
      >
        {days[new Date(item.dt * 1000).getDay()]}
      </div>
      {Icon && (
        <div
          className={`${
            isDarkMode ? "text-system-grey1" : "text-system-grey6"
          } w-[40%] pl-2`}
        >
          <Icon />
        </div>
      )}
      <div
        className={`${
          isDarkMode ? "text-system-grey3" : "text-system-grey5"
        } w-[15%]`}
      >
        {Math.floor(item.main.temp_max - 273.15)}°
      </div>
      <div
        className={`${
          isDarkMode ? "text-system-grey3" : "text-system-grey5"
        } w-[15%]`}
      >
        {Math.floor(item.main.temp_min - 273.15)}°
      </div>
    </div>
  );
}
