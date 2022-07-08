import { CgGym } from "react-icons/cg";
import React, { useContext, useState } from "react";
import { AiFillBank } from "react-icons/ai";
import { BiRestaurant } from "react-icons/bi";
import { RiHotelBedFill } from "react-icons/ri";
import {
  MdExpandLess,
  MdOutlineCoffee,
  MdOutlineMoreHoriz,
  MdOutlineLocalHospital,
  MdOutlineLocalPharmacy,
  MdOutlineTakeoutDining,
  MdOutlineDeliveryDining,
} from "react-icons/md";

import { useTheme } from "../../hooks";
import { ContainerType, MapContainerContext, PlaceType } from "../../App";

function OptionCircle(props) {
  const {
    icon,
    icon2,
    title,
    title2,
    handle,
    toggle,
    bgColor,
    seeMore,
    direction,
    toggleSeeMore,
    ...rest
  } = props;

  const { setMapContainerType } = useContext(MapContainerContext);

  const [isDarkMode] = useTheme();
  const Icon = icon;
  const IconTwo = icon2;

  const containerThemeClasses = `${
    isDarkMode
      ? "hover:bg-system-grey7 text-system-grey3"
      : "hover:bg-system-grey3 text-system-grey5"
  }`;
  const classes = `flex ${
    direction === "row"
      ? "justify-start min-w-37.5 w-37.5 max-w-37.5"
      : "justify-center flex-col min-w-19 w-19 max-w-19"
  }  items-center  cursor-pointer py-2 px-1.5 rounded-lg transition ease-in-out  ${containerThemeClasses}`;
  const iconContainerClasses = `flex items-center justify-center h-12 w-12 rounded-full ${bgColor} shadow-md `;

  const handleClick = () => {
    setMapContainerType({ type: ContainerType.EXPLORE, place: handle });
  };

  return (
    <div
      onClick={toggle ? toggleSeeMore : handleClick}
      className={classes}
      {...rest}
    >
      <div className={iconContainerClasses}>
        {icon2 === null ? (
          <Icon className='h-6 w-6 text-system-grey1' />
        ) : seeMore ? (
          <IconTwo className='h-6 w-6 text-system-grey1' />
        ) : (
          <Icon className='h-6 w-6 text-system-grey1' />
        )}
      </div>
      <div className={`${direction === "row" && "pl-3"}`}>
        {!title2 ? (
          <p className='pt-1 text-xs'>{title}</p>
        ) : seeMore ? (
          <p className='pt-1 text-xs'>{title2}</p>
        ) : (
          <p className='pt-1 text-xs'>{title}</p>
        )}
      </div>
    </div>
  );
}

function ExtraOptions(props) {
  const { seeMore, ...rest } = props;

  return (
    <div
      className='flex justify-around items-start border-t border-system-grey3 mb-6'
      {...rest}
    >
      <div className='flex flex-col items-start justify-start mt-3'>
        <OptionCircle
          icon2={null}
          toggle={false}
          title='Banks'
          direction={"row"}
          seeMore={seeMore}
          bgColor={"bg-system-grey5"}
          handle={PlaceType.BANK}
          icon={AiFillBank}
        />
        <OptionCircle
          icon2={null}
          toggle={false}
          title='Coffee'
          seeMore={seeMore}
          direction={"row"}
          handle={PlaceType.COFFEE}
          bgColor={"bg-system-grey5"}
          icon={MdOutlineCoffee}
        />
        <OptionCircle
          icon2={null}
          toggle={false}
          title='Gyms'
          seeMore={seeMore}
          direction={"row"}
          handle={PlaceType.GYM}
          bgColor={"bg-system-grey5"}
          icon={CgGym}
        />
      </div>
      <div className='flex flex-col items-start justify-start mt-3'>
        <OptionCircle
          icon2={null}
          toggle={false}
          title='Food Delivery'
          seeMore={seeMore}
          direction={"row"}
          handle={PlaceType.TAKEOUT}
          bgColor={"bg-system-grey5"}
          icon={MdOutlineDeliveryDining}
        />
        <OptionCircle
          icon2={null}
          toggle={false}
          title='Pharmacies'
          seeMore={seeMore}
          direction={"row"}
          handle={PlaceType.PHARMACY}
          bgColor={"bg-system-grey5"}
          icon={MdOutlineLocalPharmacy}
        />
        <OptionCircle
          icon2={null}
          toggle={false}
          title='Hospitals'
          seeMore={seeMore}
          direction={"row"}
          handle={PlaceType.HOSPITAL}
          bgColor={"bg-system-grey5"}
          icon={MdOutlineLocalHospital}
        />
      </div>
    </div>
  );
}

export function Explore() {
  const [seeMore, setSeeMore] = useState(false);
  const [isDarkMode] = useTheme();

  const headerThemeClasses = `${
    isDarkMode ? "text-system-grey2" : "text-system-grey7"
  }`;
  const headerTextClasses = `text-xl font-semibold ${headerThemeClasses}`;

  const toggleSeeMore = () => {
    setSeeMore(!seeMore);
  };

  return (
    <div>
      <div className='mt-10 mb-4'>
        <p className={headerTextClasses}>Explore</p>
      </div>
      <div className='flex items-center justify-between mb-2'>
        <OptionCircle
          icon2={null}
          toggle={false}
          seeMore={seeMore}
          direction={"col"}
          title='Restaurants'
          icon={BiRestaurant}
          bgColor={" bg-[#188038]"}
          handle={PlaceType.RESTAURANT}
        />
        <OptionCircle
          icon2={null}
          toggle={false}
          title='Hotels'
          seeMore={seeMore}
          direction={"col"}
          icon={RiHotelBedFill}
          bgColor={"bg-[#129eaf]"}
          handle={PlaceType.HOTEL}
        />
        <OptionCircle
          icon2={null}
          toggle={false}
          title='Takeout'
          seeMore={seeMore}
          direction={"col"}
          bgColor={"bg-[#c5221f]"}
          handle={PlaceType.TAKEOUT}
          icon={MdOutlineTakeoutDining}
        />
        <OptionCircle
          title='More'
          title2='Less'
          toggle={true}
          seeMore={seeMore}
          direction={"col"}
          icon2={MdExpandLess}
          handle={PlaceType.TOGGLE}
          icon={MdOutlineMoreHoriz}
          bgColor={"bg-system-grey5"}
          toggleSeeMore={toggleSeeMore}
        />
      </div>
      {seeMore && <ExtraOptions seeMore={seeMore} />}
    </div>
  );
}
