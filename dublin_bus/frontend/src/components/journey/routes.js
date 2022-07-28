import { FaBus } from "react-icons/fa";
import { MdDirectionsWalk } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { useTheme } from "../../hooks";
import { Display } from "../container";
import { MapDetailsContext } from "../../App";
import {
  addMinutesToTime,
  convertMinutesToDisplay,
  Explore,
  calculateFare,
} from ".";

export function Header(props) {
  const { title, variant } = props;
  const [isDarkMode] = useTheme();
  const headerThemeClasses = `${
    isDarkMode ? "text-system-grey2" : "text-system-grey7"
  }`;
  const headerTextClasses = `text-xl font-semibold ${headerThemeClasses}`;

  return (
    <div className={`${variant ? "mt-4 mb-2" : "mt-10 mb-4"}`}>
      <p className={headerTextClasses}>{title}</p>
    </div>
  );
}

function TravelType(props) {
  const { step, idx, leg, type, className, ...rest } = props;

  return (
    <div className={`flex items-center ${className}`} {...rest}>
      {step.travel_mode === "WALKING" ? (
        <div>
          <MdDirectionsWalk />
        </div>
      ) : step.travel_mode === "TRANSIT" ? (
        <div className='flex items-center bg-yellow-500 rounded px-1 text-primary-black'>
          <FaBus className='' />
          <div className='pl-1'>
            <p>
              {step.transit.line.short_name
                ? step.transit.line.short_name
                : step.transit.line.name}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      {type !== "detail" && idx !== leg.steps.length - 1 && (
        <div className='px-1'>
          <HiArrowNarrowRight />
        </div>
      )}
    </div>
  );
}

function RouteContent(props) {
  const { route, index, handleClick, routeOpen } = props;
  const { mapDetails, setMapDetails } = useContext(MapDetailsContext);
  const [isDarkMode] = useTheme();

  const routeChange = (index) => {
    console.log("index", index);
    setMapDetails({
      ...mapDetails,
      routeIdx: Number(index),
    });
    handleClick(index);
  };
  return (
    <div
      onClick={() => routeChange(index)}
      className='route-content  w-full px-2 py-3 w-100   ease-linear'
    >
      <div className='flex items-center justify-between w-100'>
        <div className='flex flex-col truncate'>
          <div
            className={`steps flex items-center pb-1.5 sm:max-w-85 max-w-72.5 ${
              isDarkMode ? "text-system-grey1" : ""
            }`}
          >
            {route.legs[0].steps.map((step, idx) => (
              <TravelType
                key={idx}
                idx={idx}
                step={step}
                leg={route.legs[0]}
                className={``}
              />
            ))}
          </div>
          {route.legs[0].departure_time && (
            <div
              className={`${
                isDarkMode ? "text-system-grey3" : "text-system-grey6"
              }`}
            >
              {String(route.legs[0].departure_time.value)
                .split(" ")[4]
                .slice(0, -3)}{" "}
              -{" "}
              {addMinutesToTime(
                String(route.legs[0].departure_time.value)
                  .split(" ")[4]
                  .slice(0, -3),
                Math.floor(route.legs[0].duration.predictedValue / 60)
              )}
              <div className='inline px-2'>|</div>
              {route.legs[0].duration.predictedValue / 60
                ? convertMinutesToDisplay(
                    Math.floor(route.legs[0].duration.predictedValue / 60)
                  )
                : route.legs[0].duration.text}
            </div>
          )}
        </div>
        <div
          className={`${
            isDarkMode ? "text-system-grey2" : "text-system-grey4"
          }`}
        >
          {routeOpen === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
    </div>
  );
}

function ExpandedContext(props) {
  const { route, routeOpen, index } = props;
  const [isDarkMode] = useTheme();

  return (
    <div
      className={`flex flex-col  pl-2.5 pr-4 overflow-hidden  max-h-0 ${
        routeOpen === index && "max-h-fit mb-4"
      }`}
    >
      <div
        className={`relative flex border-b  pb-2  ml-4 ${
          isDarkMode ? "border-system-grey4" : "border-system-grey3"
        } `}
      >
        <div className='h-9 w-4 absolute left-n-4 bottom-0 pt-1'>
          <img
            alt='start'
            className=''
            width={25}
            height={40}
            src={
              "https://res.cloudinary.com/dk0r9bcxy/image/upload/v1656021362/research-practicum/pngaaa.com-2773864_vqzuro.png"
            }
          />
        </div>
        <div
          className={`${
            isDarkMode ? "text-system-grey1" : "text-system-grey7"
          } pl-2`}
        >
          {route.legs[0].start_address}
        </div>
      </div>
      <div
        className={` divide-y border-dotted border-l-8 	pl-6 ${
          isDarkMode
            ? "divide-system-grey4  border-system-grey3"
            : "divide-system-grey3  border-system-grey5"
        } `}
      >
        {route.legs[0].steps.map((step, idx) => (
          <div key={idx} className='flex flex-col py-2'>
            <div
              className={`flex items-center min-h-7 ${
                isDarkMode ? "text-system-grey3" : "text-system-grey7"
              }`}
            >
              <div className='pr-1'>
                <TravelType step={step} type={"detail"} leg={route.legs[0]} />
              </div>
              <p className={`text-sm `}>{step.instructions}</p>
            </div>
            <div
              className={`${
                isDarkMode ? "text-system-grey4" : "text-system-grey5"
              } flex pt-0.5 text-xs`}
            >
              {step.travel_mode === "TRANSIT" ? (
                <div className='flex'>
                  <p>
                    About{" "}
                    {step.duration.predictedValue
                      ? `${Math.floor(step.duration.predictedValue / 60)} mins`
                      : `${step.duration.text}`}
                  </p>
                  <p className='px-1'>|</p>
                  <p>{step.transit.num_stops} stops</p>
                  <p className='px-1'>|</p>
                  <p>Estimated Cost: {calculateFare(step.transit.num_stops)}</p>
                </div>
              ) : (
                <p className=''>About: {step.duration.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        className={`relative flex border-t pt-2  ml-4 ${
          isDarkMode
            ? "text-system-grey1 border-system-grey4"
            : "border-system-grey3 text-system-grey7"
        }`}
      >
        <div className='h-9 w-4 absolute left-n-4'>
          <img
            alt='destination'
            className=''
            width={25}
            height={40}
            src={
              "https://res.cloudinary.com/dk0r9bcxy/image/upload/v1656019449/research-practicum/pngaaa.com-2773864_prmb6y.png"
            }
          />
        </div>
        <div className={`pl-2 `}>{route.legs[0].end_address}</div>
      </div>
    </div>
  );
}

export function RouteOptions() {
  const [routeOpen, setRouteOpen] = useState(null);
  const { mapDetails } = useContext(MapDetailsContext);

  const handleClick = (key) => {
    setRouteOpen(routeOpen !== key ? key : null);
  };

  return (
    <>
      <Header title={"Routes"} />
      <Display>
        {mapDetails.resObj.routes.map((route, index) => (
          <li
            className='route-card cursor-pointer w-100  ease-linear'
            key={index}
          >
            <RouteContent
              route={route}
              index={index}
              handleClick={handleClick}
              routeOpen={routeOpen}
            />
            <ExpandedContext
              route={route}
              index={index}
              routeOpen={routeOpen}
            />
          </li>
        ))}
      </Display>
      <Explore />
    </>
  );
}
