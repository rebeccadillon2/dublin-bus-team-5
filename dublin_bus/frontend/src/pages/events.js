import React, { useState } from "react";

import { useTheme } from "../hooks";
import { GiHamburgerMenu } from "react-icons/gi";
import { LoadingSpinner } from "../components/loading";
import { Slider, EventCard } from "../components/events";
import { MobileSidePanel } from "../components/sidepanel";

export function Events({ events }) {
  const [isDarkMode] = useTheme();
  const [openSidePanel, setOpenSidePanel] = useState(false);

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
            <p className='md:text-5xl text-4xl pl-4 mb-8 font-semibold'>
              Events
            </p>
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
            {/* {events.pops && (
              <Slider id={"popContentSlider"} title={"Pop"}>
                <>
                  {events.pops.map((pop) => (
                    <EventCard type={"music"} event={pop} key={pop.id} />
                  ))}
                </>
              </Slider>
            )} */}
            {events.musics && (
              <Slider id={"musicContentSlider"} title={"Music"}>
                <>
                  {events.musics.map((music) => (
                    <EventCard type={"music"} event={music} key={music.id} />
                  ))}
                </>
              </Slider>
            )}
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

            {/* {events.sports && (
              <Slider id={"sportContentSlider"} title={"Sports"}>
                <>
                  {events.sports.map((sport) => (
                    <EventCard type={"sport"} event={sport} key={sport.id} />
                  ))}
                </>
              </Slider>
            )}
            {events.comedies && (
              <Slider id={"comedyContentSlider"} title={"Comedy"}>
                <>
                  {events.comedies.map((comedy) => (
                    <EventCard type={"comedy"} event={comedy} key={comedy.id} />
                  ))}
                </>
              </Slider>
            )} */}
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
