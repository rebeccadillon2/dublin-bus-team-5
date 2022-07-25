import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { useTheme } from "../../hooks";

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
        className={`pl-4 md:pt-20 pt-10 pb-2 md:text-2xl text-xl font-medium ${
          isDarkMode ? "text-system-grey2" : "text-system-grey6"
        }`}
      >
        <p>{title}</p>
      </div>
      <div className='relative flex items-center overflow-y-hidden	'>
        <MdChevronLeft
          className={`${
            isDarkMode
              ? "text-system-grey4 hover:text-system-grey4"
              : "text-system-grey4 hover:text-system-grey5"
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
              ? "text-system-grey5 hover:text-system-grey4"
              : "text-system-grey4 hover:text-system-grey5"
          } cursor-pointer transition-all ease-in-out `}
          onClick={() => slideX("right", id)}
          size={25}
        />
      </div>
    </>
  );
}
