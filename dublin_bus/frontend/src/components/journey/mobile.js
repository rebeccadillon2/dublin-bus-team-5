import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import { useExpanded, useTheme } from "../../hooks";
import { MapContainerContext } from "../../App";

export function MobileMainMenu({ setOpenSidePanel }) {
  const navigate = useNavigate();
  const [isDarkMode] = useTheme();
  const [isExpanded, handleExpandedToggle] = useExpanded();
  const { mapContainerType, setMapContainerType } =
    useContext(MapContainerContext);

  const handleStopsClick = () => {
    navigate("/");
    setMapContainerType({
      ...mapContainerType,
      type: "realtime",
      place: "realtime",
    });
    if (!isExpanded) {
      handleExpandedToggle(true);
    }
  };

  const handleRoutesClick = () => {
    navigate("/");
    setMapContainerType({
      ...mapContainerType,
      type: "routes",
      place: "routes",
    });
    if (!isExpanded) {
      handleExpandedToggle(true);
    }
  };

  const handleJourneyClick = () => {
    navigate("/");
    setMapContainerType({
      ...mapContainerType,
      type: "default",
      place: null,
    });
    if (!isExpanded) {
      handleExpandedToggle(true);
    }
  };

  const handleWeatherClick = () => {
    navigate("/");
    setMapContainerType({ ...mapContainerType, type: "weather" });
    if (!isExpanded) {
      handleExpandedToggle(true);
    }
  };

  return (
    <>
      <div
        className={`${isExpanded ? "rounded-t-xl" : "rounded-xl"} ${
          isDarkMode
            ? "bg-primary-black text-system-grey4"
            : "bg-primary-white text-system-grey6"
        } md:hidden absolute top-2 left-2 right-2  h-12 min-h-12 z-10 mx-auto  shadow-xl `}
      >
        <div className='flex items-center justify-around min-h-12 h-12'>
          <div
            className={`${
              isDarkMode ? "hover:text-system-grey5" : "hover:text-system-grey4"
            } mx-2 cursor-pointer`}
            onClick={handleJourneyClick}
          >
            Journey
          </div>
          <div
            className={`${
              isDarkMode ? "hover:text-system-grey5" : "hover:text-system-grey5"
            } mx-2 cursor-pointer`}
            onClick={handleStopsClick}
          >
            Stops
          </div>
          <div
            className={`${
              isDarkMode ? "hover:text-system-grey5" : "hover:text-system-grey5"
            } mx-2 cursor-pointer`}
            onClick={handleRoutesClick}
          >
            Routes
          </div>
          <div
            className={`${
              isDarkMode ? "hover:text-system-grey5" : "hover:text-system-grey6"
            } mx-2 cursor-pointer`}
            onClick={handleWeatherClick}
          >
            Weather
          </div>
          <div
            className={`${
              isDarkMode ? "hover:text-system-grey5" : "hover:text-system-grey"
            } mx-2 cursor-pointer`}
            onClick={() => setOpenSidePanel(true)}
          >
            <GiHamburgerMenu />
          </div>
        </div>
      </div>
      <div
        className={`${isExpanded ? "top-[calc(80vh+56px)]" : "top-14"} ${
          isDarkMode
            ? "bg-primary-black text-system-grey4 hover:text-system-grey5"
            : "bg-primary-white text-system-grey6 hover:text-system-grey5"
        } md:hidden absolute  left-[50%] right-[50%] w-8 h-4 rounded-b-md z-10 cursor-pointer`}
      >
        <div
          onClick={() => handleExpandedToggle(!isExpanded)}
          className={` flex items-center justify-center`}
        >
          {isExpanded ? <HiChevronUp /> : <HiChevronDown />}
        </div>
      </div>
    </>
  );
}
