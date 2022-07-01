import React from "react";
import { useTheme } from "../../hooks";

export function ImageSkeleton() {
  const [isDarkMode] = useTheme();

  return (
    <div className={`w-60 h-43 rounded-md pt-3 pb-3`}>
      <div className='flex animate-pulse flex flex-col items-start h-full justify-center'>
        <div
          className={`${
            isDarkMode ? "bg-system-grey6" : "bg-system-grey3"
          } w-25 h-25 rounded-full `}
        ></div>
        <div className='flex flex-col '>
          <div
            className={`${
              isDarkMode ? "bg-system-grey6" : "bg-system-grey3"
            } w-34 h-8 rounded-xl mt-2`}
          ></div>
        </div>
      </div>
    </div>
  );
}
