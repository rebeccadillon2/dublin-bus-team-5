import React from "react";

import { useTheme } from "../../hooks";

export function TimeTable({ displayValues }) {
  const [isDarkMode] = useTheme();

  return (
    <div className='w-90 '>
      <table
        className={`flex flex-col item-center border rounded-xl shadow-lg ${
          isDarkMode
            ? "border-system-grey7  bg-system-grey7"
            : "border-system-grey3  bg-system-grey1"
        }`}
      >
        <tbody className='flex flex-col'>
          <tr
            className={`flex justify-around  rounded-t-xl py-1 text-md  ${
              isDarkMode
                ? "bg-system-grey7 text-system-grey2 border-b border-b-system-grey6"
                : "bg-system-grey2 text-system-grey7"
            }`}
          >
            <td className='min-w-40 text-center'>Bus Route</td>
            <td className='min-w-40 text-center'>ETA</td>
          </tr>
          {displayValues.map((value, idx) => (
            <tr
              className={`flex justify-around py-1 text-sm  ${
                isDarkMode ? "text-system-grey3" : "text-system-grey6"
              } ${
                displayValues.length - 1 === idx
                  ? ""
                  : isDarkMode
                  ? "border-b border-b-system-grey6"
                  : "border-b border-b-system-grey2"
              }`}
              key={idx}
            >
              <td className='min-w-40 text-center'>{value.routeShortName}</td>
              <td className='min-w-40 text-center'>
                {value.arrivingIn} {value.arrivingIn < 2 ? "min" : "mins"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
