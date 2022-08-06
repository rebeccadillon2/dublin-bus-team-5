import React, { useContext } from "react";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { RiTicket2Line } from "react-icons/ri";

import { useTheme } from "../../hooks";
import { SpotifySample } from "../spotify";
import { MapContainerContext, MapDetailsContext } from "../../App";

export function EventCard({ type, event }) {
  const navigate = useNavigate();
  const { mapContainerType, setMapContainerType } =
    useContext(MapContainerContext);
  const { mapDetails, setMapDetails } = useContext(MapDetailsContext);
  const [isDarkMode] = useTheme();

  const handleMapView = () => {
    const lat = event._embedded.venues[0].location.latitude;
    const lng = event._embedded.venues[0].location.longitude;
    setMapContainerType({ type: "default", place: null });
    setMapDetails({
      ...mapDetails,
      markers: [
        ...mapDetails.markers,
        { lat: parseFloat(lat), lng: parseFloat(lng) },
      ],
    });
    navigate("/");
  };

  return (
    <div className='flex flex-col items-start justify-start '>
      <div
        key={event.id}
        className='relative md:min-w-[305px] md:h-[203px] min-w-[190px] h-[203px]  mt-2 md:mx-4 mx-1  scroll-y-none '
      >
        {type === "music" && <SpotifySample artistName={event.name} />}
        <img
          className='md:w-[305px] md:h-[203px] h-[203px] w-[190px] rounded-t-md mb-1 shadow-lg	brightness-65	 '
          alt={"event"}
          src={event.images.filter((img) => img.width === 305)[0].url}
        />
        <div className='px-1 pt-1'>
          <p className={`absolute bottom-2 text-sm text-white mx-2`}>
            {event.name}
          </p>
        </div>
      </div>
      <div
        className={`flex md:flex-row flex-col items-center md:min-w-[305px]  min-w-[190px] md:mx-4 mx-1 rounded-b-md text-sm  ${
          isDarkMode
            ? "bg-system-grey7 text-system-grey5 "
            : "bg-primary-white text-system-grey4"
        }`}
      >
        <div
          onClick={handleMapView}
          className={`flex items-center justify-center md:w-[50%]  md:border-none border-b ${
            isDarkMode
              ? "border-system-grey6 hover:text-system-grey4"
              : "border-system-grey2  hover:text-system-grey5"
          } w-[100%] py-1 cursor-pointer`}
        >
          <p className='mr-1'>View on Map</p>
          <FiMapPin />
        </div>
        <a
          className={`flex items-center justify-center w-[50%] md:border-l py-1 ${
            isDarkMode
              ? "border-system-grey6 hover:text-system-grey4"
              : "border-system-grey2  hover:text-system-grey5"
          }`}
          href={event.url}
          target='_blank'
          rel='noreferrer'
        >
          <p className='mr-1'>Tickets</p>
          <RiTicket2Line />
        </a>
      </div>
    </div>
  );
}
