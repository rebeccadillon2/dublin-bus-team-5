import React, { useContext, useState } from "react";

import { useTheme } from "../hooks";
import { GiHamburgerMenu } from "react-icons/gi";
import { LoadingSpinner } from "../components/loading";
import { Slider, EventCard } from "../components/events";
import { MobileSidePanel } from "../components/sidepanel";
import ConnectSpotify from "../components/spotify/connect";
import { AuthenticatedContext } from "../App";

export function Events({ events }) {
  const [isDarkMode] = useTheme();
  const [openSidePanel, setOpenSidePanel] = useState(false);
  const { isAuthenticated } = useContext(AuthenticatedContext);

  const handleSidePanelClose = () => {
    setOpenSidePanel(false);
  };

  return (
    <>
      {!events ? (
        <div
          className={`${
            isDarkMode ? "bg-primary-black" : "bg-system-grey2"
          } flex items-center justify-center md:h-[calc(100vh-64px)] h-[100vh] w-[100%]`}
        >
          <LoadingSpinner />
        </div>
      ) : events ? (
        <div className={`pb-20 ${isDarkMode ? "bg-black" : "bg-system-grey2"}`}>
          <div
            className={`relative flex justify-start items-end w-[100%] md:h-[200px] h-[150px]  ${
              isDarkMode
                ? "text-system-grey2 bg-gradient-to-r bg-gradient-to-b from-violet-600 via-purple-900 to-primary-black" //from-black
                : "text-system-grey6 bg-gradient-to-r bg-gradient-to-b from-[#3377FF] via-blue-400 to-system-grey2"
            }`}
          >
            <div className='flex items-center justify-center '>
              <p className='md:text-5xl text-4xl pl-4 mb-8 font-semibold'>
                Events
              </p>
              <div className='pl-4'>
                {isAuthenticated && <ConnectSpotify events={true} />}
              </div>
            </div>
            <div className='absolute top-4 right-4'>
              <div
                className={`md:hidden ${
                  isDarkMode
                    ? "text-system-grey4 hover:text-system-grey5"
                    : "text-system-grey6 hover:text-system-grey5"
                } cursor-pointer pr-1`}
                onClick={() => setOpenSidePanel(true)}
              >
                <GiHamburgerMenu className='h-6 w-6' />
              </div>
            </div>
          </div>
          <div className=''>
            {events.raps && (
              <Slider id={"rapContentSlider"} title={"Rap"}>
                <>
                  {events.raps.map((rap) => (
                    <EventCard type={"music"} event={rap} key={rap.id} />
                  ))}
                </>
              </Slider>
            )}
            {events.folks && (
              <Slider id={"folkContentSlider"} title={"Folk"}>
                <>
                  {events.folks.map((folk) => (
                    <EventCard type={"music"} event={folk} key={folk.id} />
                  ))}
                </>
              </Slider>
            )}
            {events.rocks && (
              <Slider id={"rapContentSlider"} title={"Rock"}>
                <>
                  {events.rocks.map((rock) => (
                    <EventCard type={"music"} event={rock} key={rock.id} />
                  ))}
                </>
              </Slider>
            )}
          </div>
          <MobileSidePanel
            open={openSidePanel}
            setOpen={setOpenSidePanel}
            handleClose={handleSidePanelClose}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
