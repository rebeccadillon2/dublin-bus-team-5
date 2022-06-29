import React, { useState, useEffect } from "react";
import { useTheme } from "./hooks";
import { getLiveWeather } from "./lib/api";
import { icons } from "./lib/weather";

function Links() {
  const [isDarkMode] = useTheme();
  const themeClasses = `${
    isDarkMode
      ? "text-system-grey3 hover:text-system-grey1"
      : "text-system-grey5 hover:text-system-grey7"
  }`;
  return (
    <div className='LEFT flex justify-start items-center'>
      <div className='flex items-center'>
        <div className='flex-shrink-0'>
          <div className='pt-1'>
            <a href='/'>
              <img
                alt='profile'
                className='block'
                height={45}
                width={45}
                style={{ height: "45px", width: "45px" }}
                src={
                  "https://res.cloudinary.com/dk0r9bcxy/image/upload/v1654877396/research-practicum/bl2e_qkc1u6.png"
                }
              />
            </a>
          </div>
        </div>
        <div className='hidden md:block md:ml-6'>
          <div className='flex space-x-4'>
            <a
              href={"/"}
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Journey Planner
            </a>
            <a
              href='/'
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Stops
            </a>
            <a
              href='/'
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Routes
            </a>
            <a
              href='/'
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Fare Calculator
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeatherDisplay(props) {
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

export default function Nav() {
  return (
    <div className='navbar-N flex items-center justify-between md:px-6 px-4 h-16 w-100'>
      <Links />
      <div className='hidden md:ml-6 md:block'>
        <div className='flex items-center'>
          <WeatherDisplay variant='large' className='pr-3' />
        </div>
      </div>
    </div>
  );
}
