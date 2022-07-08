import React, { useState, useContext, useEffect } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";

import { Error } from "../../error";
import { useTheme } from "../../../hooks";
import { LoadingSpinner } from "../../loading";
import { SearchInput } from "../../elements/form";
import {
  MapRefContext,
  MapDetailsContext,
  ContainerType,
  MapContainerContext,
} from "../../../App";

const arr = [1, 2, 3, 4, 5];

export function PriceLevel(props) {
  const { priceLevel, ...rest } = props;

  return (
    <div className='flex items-center' {...rest}>
      {arr.map(
        (item, idx) => idx + 1 <= priceLevel && <p key={`${idx}${item}`}>€</p>
      )}
    </div>
  );
}

function Star(props) {
  const { color, ...rest } = props;

  return (
    <div {...rest}>
      <svg
        className={`w-4 h-4 ${color}`}
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
      </svg>
    </div>
  );
}

function Stars(props) {
  const { rating, ...rest } = props;

  return (
    <div className='flex items-center' {...rest}>
      {arr.map((item, idx) => (
        <Star
          key={`${idx}${item}`}
          color={idx + 1 <= rating ? "text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

export function PlaceCard(props) {
  const { place, ...rest } = props;
  const [isDarkMode] = useTheme();
  const { mapDetails, setMapDetails } = useContext(MapDetailsContext);
  const placeLat = place.geometry.location.lat();
  const placeLng = place.geometry.location.lng();
  const [pinned, setPinned] = useState(false);

  const themeClasses = `${
    isDarkMode
      ? "bg-system-grey7  border-system-grey7 text-system-grey4"
      : "bg-system-grey2 border-system-grey3 text-system-grey5"
  }`;
  const classes = `flex justify-between items-start w-100 border rounded-xl py-3 px-2 my-2 ${themeClasses}`;

  const handlePinClick = () => {
    const allMarkers = [...mapDetails.markers];
    const coords = { lat: placeLat, lng: placeLng };
    if (pinned) {
      allMarkers.splice(
        allMarkers.findIndex((a) => a.lat === coords.lat),
        1
      );
      setMapDetails({
        ...mapDetails,
        markers: allMarkers,
      });
      setPinned(false);
    } else {
      allMarkers.push({ lat: placeLat, lng: placeLng });
      setMapDetails({
        ...mapDetails,
        markers: allMarkers,
      });
      setPinned(true);
    }
  };

  return (
    <div className={classes} {...rest}>
      <div className='description md:mx-w-95 md:w-95 max-w-48.75 w-48.75'>
        <div
          className={`flex justify-between items-center mb-1.5 ${
            isDarkMode ? "text-system-grey3" : "text-system-grey6"
          }`}
        >
          <p
            className={`flex justify-between items-start text-md font-semibold md:mx-w-95 md:w-95 max-w-48.75 w-48.75`}
          >
            {place.name}
          </p>
          <div
            onClick={handlePinClick}
            className='flex items-center justify-end text-md text-right pl-1'
          >
            {pinned ? <AiFillPushpin /> : <AiOutlinePushpin />}
          </div>
        </div>
        <div className='flex items-center justify-start text-sm'>
          <p>{place.rating}</p>
          <p className='px-1'>•</p>
          <Stars rating={place.rating} />
          <p className='pl-0.5'>({place.user_ratings_total})</p>
          {place.price_level && (
            <>
              <p className='px-1'>•</p>
              <PriceLevel priceLevel={place.price_level} />
            </>
          )}
        </div>
        <div className='mt-1.5'>
          <p className='text-xs max-w-48.75 truncate'>{place.vicinity}</p>
        </div>
        <div className='flex mt-1.5'>
          {place.types && (
            <p className='text-xs'>{`${place.types[0][0].toUpperCase()}${place.types[0]
              .slice(1)
              .replaceAll("_", " ")}`}</p>
          )}
          {place.types &&
            place.types[1] &&
            !place.types[1].includes("point") && (
              <p className='text-xs'>
                {" "}
                •{" "}
                {`${place.types[1][0].toUpperCase()}${place.types[1]
                  .slice(1)
                  .replaceAll("_", " ")}`}
              </p>
            )}
          <p className='text-xs max-w-48.75 truncate'></p>
        </div>
      </div>
      {place.photos && (
        <div className='image flex items-center justify-center '>
          <img
            alt='place'
            className='rounded-xl flex items-center justify-center shadow-md'
            src={place.photos[0].getUrl()}
            height={100}
            width={120}
            style={{
              maxHeight: "100px",
              height: "100px",
              minHeight: "100px",
              maxWidth: "120px",
              width: "120px",
              minWidth: "120px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const { setMapContainerType } = useContext(MapContainerContext);
  const [isDarkMode] = useTheme();
  const themeClasses = `${
    isDarkMode
      ? "bg-system-grey5 text-system-grey7 hover:bg-system-grey4"
      : "bg-system-grey3 text-system-grey6 hover:bg-system-grey4"
  }`;
  const classes = `flex items-center justify-center h-8 w-8 mb-4 rounded-full cursor-pointer ${themeClasses}`;

  return (
    <div
      onClick={() =>
        setMapContainerType({ type: ContainerType.DEFAULT, place: null })
      }
      className={classes}
    >
      <HiOutlineArrowNarrowLeft />
    </div>
  );
}

function Header(props) {
  const { setSearchTerm, searchTerm, ...rest } = props;
  const { mapContainerType } = useContext(MapContainerContext);

  const [isDarkMode] = useTheme();
  const themeClasses = `${
    isDarkMode ? "text-system-grey3" : "text-system-grey6"
  }`;
  const classes = `text-lg font-semibold ${themeClasses}`;

  return (
    <div className={classes} {...rest}>
      <div className='ml-2'>
        Explore{" "}
        {mapContainerType.place &&
          `${mapContainerType.place[0].toUpperCase()}${mapContainerType.place
            .substring(1)
            .replaceAll("_", " ")}s`}
      </div>
      <div className='mb-4 mt-2'>
        <SearchInput
          value={searchTerm}
          variant={"expanded"}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}

export function ExploreContent() {
  const { mapContainerType } = useContext(MapContainerContext);
  const [places, setPlaces] = useState(null);
  const [error, setError] = useState(false);
  const { mapRefContext } = useContext(MapRefContext);
  const { mapDetails } = useContext(MapDetailsContext);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);

    const getPlaces = () => {
      const service = new window.google.maps.places.PlacesService(
        mapRefContext.current
      );
      try {
        service.nearbySearch(
          {
            location: {
              lat: mapDetails.resObj.routes[0].legs[0].end_location.lat(),
              lng: mapDetails.resObj.routes[0].legs[0].end_location.lng(),
            },
            radius: 2500,
            type: [mapContainerType.place],
          },
          // eslint-disable-next-line prefer-arrow-callback
          function (results, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              console.log(results);
              setPlaces(results);
              setLoading(false);
            } else {
              setLoading(false);
              setError(true);
            }
          }
        );
      } catch (e) {
        console.log(e);
        setLoading(false);
        setError(true);
      }
    };
    if (!mapRefContext.current) {
      setTimeout(() => {
        getPlaces();
      }, 250);
    } else {
      getPlaces();
    }
  }, []);

  const filterPlaces = () => {
    if (places) {
      return places.filter((place) => {
        const placeName = place.name.toLowerCase();
        const normalisedSearchTerm = searchTerm.toLowerCase();
        return placeName.includes(normalisedSearchTerm);
      });
    }
    return null;
  };

  return (
    <div className='mb-6'>
      <Navigation />
      {!error && (
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}
      {loading ? (
        <div className='mt-8'>
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className='mt-8'>
          <Error variant='default' />
        </div>
      ) : filterPlaces() && filterPlaces().length >= 1 ? (
        <>
          {filterPlaces().map((place, idx) => (
            <div key={`${place.name}${idx}`}>
              {place.rating && <PlaceCard place={place} />}
            </div>
          ))}
        </>
      ) : (
        <div className='mt-8'>
          <Error variant='no-results' />
        </div>
      )}
    </div>
  );
}
