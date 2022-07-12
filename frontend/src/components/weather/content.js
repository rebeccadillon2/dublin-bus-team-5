import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { Error } from "../error";
import { Header } from "../journey";
import { useTheme } from "../../hooks";
import { icons } from "../../lib/weather";
import { WeatherCard, WeatherDay } from ".";
import { TableSkeleton } from "../skeleton";
import { getForecastWeather } from "../../lib/api";

export function WeatherContent() {
  const [isDarkMode] = useTheme();
  const [xData, setXData] = useState(null);
  const [yData, setYData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const slideX = (type) => {
    const contentSlider = document.getElementById(`contentSlider`);
    if (contentSlider) {
      type === "left"
        ? (contentSlider.scrollLeft = contentSlider.scrollLeft - 350)
        : (contentSlider.scrollLeft = contentSlider.scrollLeft + 350);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await getForecastWeather();
        console.log("weather data: ", data.list);
        setXData(data.list.slice(0, 20));
        parseYData(data.list);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
        console.log(e);
      }
    };
    getData();
  }, []);

  const parseYData = (data) => {
    const parsedData = data.filter((item) => {
      if (item.dt_txt.slice(11, 16) === "12:00") {
        return item;
      }
    });
    setYData(parsedData);
  };

  return (
    <div>
      <div className='ml-2'>
        <Header variant={true} title={"Live Weather"} />
      </div>
      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <Error variant='default' />
      ) : (
        xData &&
        yData && (
          <>
            <div className='relative flex items-center'>
              <MdChevronLeft
                className={`${
                  isDarkMode
                    ? "text-system-grey4 hover:text-system-grey3"
                    : "text-system-grey3 hover:text-system-grey5"
                } cursor-pointer transition-all ease-in-out `}
                onClick={() => slideX("left")}
                size={25}
              />
              <div
                id='contentSlider'
                className='w-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'
              >
                {xData.map((item) => (
                  <WeatherCard
                    key={item.dt}
                    time={item.dt_txt.slice(11, 16)}
                    icon={icons[item.weather[0].icon]}
                    temp={item.main.temp}
                  />
                ))}
              </div>
              <MdChevronRight
                className={`${
                  isDarkMode
                    ? "text-system-grey4 hover:text-system-grey3"
                    : "text-system-grey3 hover:text-system-grey5"
                } cursor-pointer transition-all ease-in-out `}
                onClick={() => slideX("right")}
                size={25}
              />
            </div>
            <div className='my-4 ml-2'>
              {yData.map((item) => (
                <WeatherDay
                  item={item}
                  key={item.dt}
                  icon={icons[item.weather[0].icon]}
                />
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
}
