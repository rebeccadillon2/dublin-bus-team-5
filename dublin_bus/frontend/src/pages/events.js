import React from "react";

import { useTheme } from "../hooks";
import { Slider, EventCard } from "../components/events";

export function Events({ events }) {
  const [isDarkMode] = useTheme();

  return (
    <>
      {!events ? (
        <div>Loading...</div>
      ) : events ? (
        <div className={`pb-20 ${isDarkMode ? "bg-black" : "bg-zinc-200"}`}>
          <div
            className={`flex justify-start items-end w-[100%] md:h-[200px] h-[150px]  ${
              isDarkMode
                ? "text-zinc-200 bg-gradient-to-r bg-gradient-to-b from-violet-600 via-purple-900 to-black" //from-black
                : "text-zinc-900 bg-gradient-to-r bg-gradient-to-b from-[#3377FF] via-blue-400 to-zinc-200"
            }`}
          >
            <p className='md:text-5xl text-4xl pl-4 mb-8 font-semibold'>
              Events
            </p>
          </div>
          <div className=''>
            {events.pops && (
              <Slider id={"popContentSlider"} title={"Pop"}>
                <>
                  {events.pops.map((pop) => (
                    <EventCard event={pop} key={pop.id} />
                  ))}
                </>
              </Slider>
            )}
            {events.raps && (
              <Slider id={"rapContentSlider"} title={"Rap"}>
                <>
                  {events.raps.map((rap) => (
                    <EventCard event={rap} key={rap.id} />
                  ))}
                </>
              </Slider>
            )}

            {events.sports && (
              <Slider id={"sportContentSlider"} title={"Sports"}>
                <>
                  {events.sports.map((sport) => (
                    <EventCard event={sport} key={sport.id} />
                  ))}
                </>
              </Slider>
            )}
            {events.comedies && (
              <Slider id={"comedyContentSlider"} title={"Comedy"}>
                <>
                  {events.comedies.map((comedy) => (
                    <EventCard event={comedy} key={comedy.id} />
                  ))}
                </>
              </Slider>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
