import { FiX } from "react-icons/fi";
import { useTheme } from "../../hooks";
import React, { useState } from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";

export const Warning = ({ title, body, exitable }) => {
  const [isDarkMode] = useTheme();
  const [hidden, setHidden] = useState(false);

  const hiddenClasses = `${hidden ? "hidden" : ""}`;
  const themeClasses = `${isDarkMode ? "bg-system-grey7	" : "bg-system-grey1"}`;
  const classes = `${themeClasses} ${hiddenClasses} rounded-xl  p-4 my-2 shadow-lg transition-all ease-in-out duration-300`;

  return (
    <div className={classes}>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <BsExclamationTriangleFill
            className='h-5 w-5 text-yellow-400'
            aria-hidden='true'
          />
        </div>
        <div className='ml-3'>
          <div className='flex justify-between'>
            <h3 className='text-sm  font-semibold	text-yellow-700'>{title}</h3>
            {exitable && (
              <FiX
                onClick={() => setHidden(true)}
                className={`${
                  isDarkMode
                    ? "text-system-grey5 hover-system-grey6"
                    : "text-system-grey4 hover-system-grey3"
                } cursor-pointer`}
              />
            )}
          </div>
          <div className='mt-2 text-sm text-yellow-700'>
            <p>{body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
