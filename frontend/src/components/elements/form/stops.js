import React from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import { useTheme } from "../../../hooks";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function StopsSearch({
  stops,
  searchTerm,
  selectedStop,
  setSearchTerm,
  setSelectedStop,
}) {
  const [isDarkMode] = useTheme();

  const filteredStops = () => {
    if (searchTerm === "") {
      return stops.slice(0, 20);
    } else {
      const filtered = stops.filter((stop) => {
        return stop.stopName.toLowerCase().includes(searchTerm.toLowerCase());
      });
      if (filtered.length <= 20) {
        return filtered;
      } else {
        return filtered.slice(0, 20);
      }
    }
  };

  return (
    <div
      className={`w-100 h-[100vh] ${
        isDarkMode ? "bg-system-grey6" : "bg-system-grey2"
      }`}
    >
      {stops && (
        <div className='w-90'>
          <Combobox
            as='div'
            value={selectedStop}
            onChange={setSelectedStop}
            className='ring-0 outline-0 border-0'
          >
            <div className='relative mt-1'>
              <Combobox.Input
                placeholder='Search stops'
                className={`w-full rounded-md border-0  py-2 pl-3 pr-10 sm:text-sm  caret-primary-blue focus:border-0 focus:outline-0  focus:ring-0 focus:shadow-0	 ${
                  isDarkMode
                    ? "bg-primary-black text-system-grey4"
                    : "bg-primary-white text-sytem-grey5"
                }`}
                onChange={(event) => setSearchTerm(event.target.value)}
                displayValue={(stop) => stop?.stopName}
              />
              <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2'>
                <SelectorIcon
                  className={`h-5 w-5  ${
                    isDarkMode ? "text-system-grey4" : "text-system-grey5"
                  }`}
                  aria-hidden='true'
                />
              </Combobox.Button>
              {filteredStops().length > 0 && (
                <Combobox.Options
                  className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md  py-1 text-base shadow-lg  sm:text-sm ${
                    isDarkMode
                      ? "bg-primary-black text-system-grey4"
                      : "bg-primary-white text-system-grey5"
                  }`}
                >
                  {filteredStops().map((stop) => (
                    <Combobox.Option
                      key={stop.stopId}
                      value={stop}
                      className={({ active }) =>
                        classNames(
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                          active
                            ? isDarkMode
                              ? "bg-system-grey7 text-primary-white"
                              : "bg-system-grey2 text-primary-black"
                            : isDarkMode
                            ? "text-system-grey4"
                            : "text-system-grey6"
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <div className='flex items-center'>
                            <span
                              className={classNames(
                                "inline-block h-2 w-2 flex-shrink-0 rounded-full",
                                stop.id ? "bg-primary-green" : "bg-gray-200"
                              )}
                              aria-hidden='true'
                            />
                            <span
                              className={classNames(
                                "ml-3 truncate",
                                selected && "font-semibold"
                              )}
                            >
                              {stop.stopName}
                              <span className='sr-only'>
                                {" "}
                                is {stop.stopId ? "online" : "offline"}
                              </span>
                            </span>
                          </div>
                          {selected && (
                            <span
                              className={classNames(
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                active
                                  ? isDarkMode
                                    ? "text-primary-white"
                                    : "text-system-grey6"
                                  : "text-primary-blue"
                              )}
                            >
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>
      )}
    </div>
  );
}
