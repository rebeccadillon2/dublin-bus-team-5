import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { useTheme } from "../hooks";

export function Slider({ id, title, children }) {
  const [isDarkMode] = useTheme();

  const slideX = (type, id) => {
    const contentSlider = document.getElementById(id);
    if (contentSlider) {
      type === "left"
        ? (contentSlider.scrollLeft = contentSlider.scrollLeft - 350)
        : (contentSlider.scrollLeft = contentSlider.scrollLeft + 350);
    }
  };
  return (
    <>
      <div
        className={`pl-4 pt-6 text-2xl font-medium ${
          isDarkMode ? "text-zinc-200" : "text-black"
        }`}
      >
        <p>{title}</p>
      </div>
      <div className='relative flex items-center overflow-y-hidden	'>
        <MdChevronLeft
          className={`${
            isDarkMode
              ? "text-system-grey4 hover:text-system-grey3"
              : "text-system-grey3 hover:text-system-grey5"
          } cursor-pointer transition-all ease-in-out `}
          onClick={() => slideX("left", id)}
          size={25}
        />
        <div
          id={id}
          className='flex w-full overflow-x-scroll scroll scroll-smooth scrollbar-hide overflow-y-hidden'
        >
          {children}
        </div>
        <MdChevronRight
          className={`${
            isDarkMode
              ? "text-system-grey4 hover:text-system-grey3"
              : "text-system-grey3 hover:text-system-grey5"
          } cursor-pointer transition-all ease-in-out `}
          onClick={() => slideX("right", id)}
          size={25}
        />
      </div>
    </>
  );
}
