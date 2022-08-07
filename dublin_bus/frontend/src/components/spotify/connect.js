import { BsSpotify } from "react-icons/bs";
import React, { useEffect, useState, useContext } from "react";

import { SpotifyContext, MapContainerContext } from "../../App";
import { useIsMounted, useTheme } from "../../hooks";
import { getSpotifyAuthUrl, isSpotifyAuthenticated } from "../../lib/api";

const ConnectSpotify = ({ events }) => {
  const { setMapContainerType } = useContext(MapContainerContext);
  const isMounted = useIsMounted();
  let [isSportifyAuthenticated, setIsSpotifyAuthenticated] = useState(false);
  const { updateSpotifyStateTwo } = useContext(SpotifyContext);
  const [isDarkMode] = useTheme();

  const headerThemeClasses = `${
    isDarkMode ? "text-system-grey2" : "text-system-grey7"
  }`;
  const headerTextClasses = `text-xl font-semibold ${headerThemeClasses}`;

  useEffect(() => {
    const check = async () => {
      try {
        const { data } = await isSpotifyAuthenticated();
        if (isMounted) {
          setIsSpotifyAuthenticated(data.status);
          updateSpotifyStateTwo(data.status);
        }
      } catch (e) {
        console.log(e);
      }
    };
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const LoginSpotify = async () => {
    let res = await getSpotifyAuthUrl();
    window.location.replace(res.data.url);
  };

  const LoginButton = () => {
    return (
      <div
        onClick={LoginSpotify}
        className={`flex items-center justify-center h-10 rounded-xl bg-[#21c45a] w-60 text-white active:bg-[#00a240] cursor-pointer ${
          events && "sm:w-100 w-[200px]"
        }`}
      >
        <BsSpotify /> <p className='pl-2'>Connect to Spotify</p>
      </div>
    );
  };

  const handleClick = () => {
    setMapContainerType({ type: "spotify", place: null });
  };

  return (
    <div className='mb-6'>
      {events ? (
        <></>
      ) : (
        <div className='mt-6 mb-4'>
          <p className={headerTextClasses}>Spotify</p>
        </div>
      )}
      {isSportifyAuthenticated ? (
        events ? (
          <div
            className={`flex items-center justify-center ${
              isDarkMode ? " text-[#21c45a]" : "text-[#10a30b]"
            } w-60  ${events && "sm:w-100 w-[200px]"}`}
          >
            <BsSpotify />
            <p className={`pl-2 font-semibold  `}>Preview with Spotify</p>
          </div>
        ) : (
          <div
            onClick={handleClick}
            className='flex items-center justify-center h-10 rounded-xl bg-[#21c45a] w-60 text-white active:bg-[#00a240] cursor-pointer'
          >
            <BsSpotify />
            <p className='pl-2'>Dublin on Spotify</p>
          </div>
        )
      ) : (
        LoginButton()
      )}
    </div>
  );
};

export default ConnectSpotify;
