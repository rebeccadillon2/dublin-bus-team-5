import React, { useEffect, useState } from "react";

import { useTheme } from "../hooks";
import { icons } from "../lib/weather";
import { getLiveWeather } from "../lib/api";

export function WeatherDisplay(props) {
  const { variant, className, ...rest } = props;
  const [error, setError] = useState(false);
  const [temp, setTemp] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const weatherRes = await getLiveWeather();
        setTemp(String(Math.round(weatherRes.data.main.temp - 273.15)));
        setIcon(weatherRes.data.weather[0].icon);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    getWeatherData();
  }, []);

  if (error) return <></>;
  return (
    <div className='flex items-center justify-center' {...rest}>
      {icon && temp && (
        <WeatherContainer
          className={`flex items-center justify-center ${className}`}
          variant={variant}
          temp={temp}
          icon={icons[icon]}
        />
      )}
    </div>
  );
}

function WeatherContainer(props) {
  const { icon, temp, variant, ...rest } = props;
  const Icon = icon;
  const [isDarkMode] = useTheme();

  const themeClasses = `${
    isDarkMode ? "text-system-grey2" : "text-system-grey7"
  }`;
  const iconClasses = `${
    variant === "large" ? "h-8 w-8" : "h-6 w-6"
  } ${themeClasses}`;
  const tempClasses = `${
    variant === "large" ? "text-lg" : "text-md"
  } ${themeClasses} pl-2`;

  return (
    <div className='flex items-center justify-center' {...rest}>
      {Icon && <Icon className={iconClasses} />}
      <p className={tempClasses}>{temp}°C</p>
    </div>
  );
}
