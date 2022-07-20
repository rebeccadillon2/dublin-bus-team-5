import React from "react";
import { Dialog } from "@headlessui/react";

import { useTheme } from "../../hooks";

export function ModalHeader(props) {
  const { title, subtitle, ...rest } = props;
  const [isDarkMode] = useTheme();

  return (
    <div {...rest}>
      <div className='mx-auto mt-1 mb-4 flex items-center justify-center h-16 w-16 rounded-full '>
        <img
          alt={"logo"}
          className='block'
          height={90}
          width={90}
          style={{ height: "4.5rem", width: "7rem" }}
          src={
            "https://res.cloudinary.com/dk0r9bcxy/image/upload/v1654877396/research-practicum/bl2e_qkc1u6.png"
          }
        />
      </div>
      <div className='mt-1 text-center sm:mt-5'>
        <Dialog.Title
          as='h3'
          className={`${
            isDarkMode ? "text-system-grey2" : "text-system-grey7"
          } text-lg leading-6 font-medium `}
        >
          {title}
        </Dialog.Title>
        <div className='mt-2'>
          <p
            className={`${
              isDarkMode ? "text-system-grey4" : "text-system-grey5"
            } text-sm `}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
