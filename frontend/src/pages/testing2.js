import { useEffect, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import { useTheme } from "../hooks";
import { getAllStops } from "../lib/api";

const people = [
  { id: 1, name: "Leslie Alexander", online: true },
  { id: 2, name: "Lesasdlie Alexander", online: true },
  { id: 3, name: "Leslasdfie Alexander", online: true },
  { id: 4, name: "Leslasdfie Alexander", online: true },
  { id: 5, name: "Lesdsflie Alexander", online: true },
  { id: 6, name: "Leslafsdie Alexander", online: true },
  { id: 7, name: "Lesafdlie Alexander", online: true },
  { id: 8, name: "Lesadsflie Alexander", online: true },
  { id: 9, name: "Leslasdfie Alexander", online: true },
  { id: 10, name: "Lesasdflie Alexander", online: true },
  { id: 11, name: "Lesadflie Alexander", online: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Testing2() {
  const [stops, setStops] = useState(null);
  const [isDarkMode] = useTheme();
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState();

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  // useEffect(() => {
  //       const getAllStopsData = async () => {
  //         try {
  //           const { data } = await getAllStops();
  //           console.log("ALl stops: ", data);
  //           setStops;
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       };
  //       getAllStopsData();
  // }, [])

  return (
    <div
      className={`w-100 h-[100vh] ${
        isDarkMode ? "bg-system-grey6" : "bg-system-grey2"
      }`}
    >
      <div className='w-90 p-4'>
        <Combobox
          as='div'
          value={selectedPerson}
          onChange={setSelectedPerson}
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
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(person) => person?.name}
            />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2'>
              <SelectorIcon
                className={`h-5 w-5  ${
                  isDarkMode ? "text-system-grey4" : "text-system-grey5"
                }`}
                aria-hidden='true'
              />
            </Combobox.Button>

            {filteredPeople.length > 0 && (
              <Combobox.Options
                className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md  py-1 text-base shadow-lg  sm:text-sm ${
                  isDarkMode
                    ? "bg-primary-black text-system-grey4"
                    : "bg-primary-white text-system-grey5"
                }`}
              >
                {filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    value={person}
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
                              person.online ? "bg-primary-green" : "bg-gray-200"
                            )}
                            aria-hidden='true'
                          />
                          <span
                            className={classNames(
                              "ml-3 truncate",
                              selected && "font-semibold"
                            )}
                          >
                            {person.name}
                            <span className='sr-only'>
                              {" "}
                              is {person.online ? "online" : "offline"}
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
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
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
    </div>
  );
}
