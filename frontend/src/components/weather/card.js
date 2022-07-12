import React from "react";
import { useTheme } from "../../hooks";

export function WeatherCard({ time, icon, temp }) {
  const Icon = icon;
  const [isDarkMode] = useTheme();

  return (
    <div className=' w-[70px] px-4 inline-block py-2 cursor-pointer hover:scale-105 ease-in-out duration-300'>
      <div className='flex flex-col items-start  justify-center'>
        <div
          className={`${
            isDarkMode ? "text-system-grey3" : "text-system-grey5"
          }`}
        >
          {time.slice(0, 2)}
        </div>
        <div
          className={`${
            isDarkMode ? "text-system-grey1" : "text-system-grey6"
          }`}
        >
          {Icon && <Icon />}
        </div>
        <div
          className={`${
            isDarkMode ? "text-system-grey3" : "text-system-grey5"
          }`}
        >
          {Math.floor(temp - 273.15)}°
        </div>
      </div>
    </div>
  );
}
