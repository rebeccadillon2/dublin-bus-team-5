import React from "react";
import { IoMdLocate } from "react-icons/io";
import { Autocomplete } from "@react-google-maps/api";
import { HiOutlineSwitchVertical } from "react-icons/hi";

import { currentBrowser } from ".";
import { useTheme } from "../../hooks";
import { BasicDateTimePicker } from "../elements/form";

export function JourneyForm(props) {
  const {
    time,
    setTime,
    originRef,
    inputError,
    clearRoute,
    handleFocus,
    inputOptions,
    handleSwitch,
    calculateRoute,
    destinationRef,
    setUserLocation,
  } = props;

  const [isDarkMode] = useTheme();

  const inputClasses = `h-10 rounded-xl w-80 px-2 focus:outline-none hover:placeholder-primary-blue ${
    isDarkMode
      ? "bg-primary-black text-system-grey1 placeholder-system-grey4"
      : "bg-primary-white text-system-grey7"
  }`;

  return (
    <div>
      <div className='flex items-center'>
        <div>
          <Autocomplete options={inputOptions}>
            <input
              ref={originRef}
              onFocus={handleFocus}
              className={inputClasses}
            />
          </Autocomplete>
          <div className='h-2' />
          <Autocomplete options={inputOptions}>
            <input
              ref={destinationRef}
              onFocus={handleFocus}
              className={inputClasses}
            />
          </Autocomplete>
        </div>
        <div className='pl-2 sm:pl-4'>
          {currentBrowser(window) !== "Google Chrome" && (
            <div className='flex items-center justify-center bg-primary-blue p-1.5 rounded-lg text-system-grey2 mb-4'>
              <IoMdLocate onClick={() => setUserLocation(originRef)} />
            </div>
          )}
          <HiOutlineSwitchVertical
            onClick={handleSwitch}
            className={`h-7 w-7 hover:cursor-pointer ${
              isDarkMode
                ? "text-system-grey4 active:text-system-grey5"
                : "text-system-grey5 active:text-system-grey3"
            }`}
          />
        </div>
      </div>
      <div className='h-2' />
      <BasicDateTimePicker time={time} setTime={setTime} />
      {/* <Input
        error={inputError}
        type='text'
        value={time}
        variant='small'
        onChange={setTime}
        // onFocus={handleFocus}
        placeholder='Select a time'
        label='Select a time'
        className='max-h-10'
      /> */}
      {inputError ? (
        <div className='flex items-center h-6'>
          <p className='py-0 my-0 px-2 text-xs text-primary-red'>
            {inputError}
          </p>
        </div>
      ) : (
        <div className='h-6' />
      )}
      <button
        onClick={calculateRoute}
        className='h-10 rounded-xl bg-primary-blue w-60 text-white active:bg-dark-blue1'
      >
        Submit
      </button>
      <button
        onClick={clearRoute}
        className='h-10 rounded-xl bg-system-grey5 w-18 ml-2 text-white active:bg-system-grey4'
      >
        Clear
      </button>
    </div>
  );
}
