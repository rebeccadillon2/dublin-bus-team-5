import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

export function SpotifyProgressBar({ progress, trackLength }) {
  return (
    <div className='w-[100%] pt-0.5'>
      <ProgressBar
        height='5px'
        completed={progress}
        isLabelVisible={false}
        bgColor='rgba(0, 0, 0, 0.4)'
      />
      <div className='flex w-100% mt-0.5'>
        <div className='flex justify-start flex-1'>
          <p className='text-[9px] text-system-grey4'>0:00</p>
        </div>
        <div className='flex justify-end flex-1'>
          <p className='text-[9px] text-system-grey4'>{trackLength}</p>
        </div>
      </div>
    </div>
  );
}
