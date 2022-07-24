import React, { useEffect, useState } from "react";

import myData from "./db.json";
import { useTheme } from "../../hooks";

export function Keypad({ usedKeys, handleKeyup }) {
  const [isDarkMode] = useTheme();
  const [letters, setLetters] = useState(null);

  const theme = `${isDarkMode ? "bg-zinc-500" : "bg-zinc-100"}`;
  const keypad = `md:max-w-[500px] max-w-[350px] my-5 mx-auto text-center`;
  const tile = `md:m-1 m-0.5 md:min-w-[40px] min-w-[30px] height-[50px] inline-block rounded-md leading-10  text-center ${theme}`;

  useEffect(() => {
    setLetters(myData.letters);
  }, []);

  const handleClick = (key) => {
    handleKeyup({ key });
  };

  return (
    <div className={`${keypad} keypad `}>
      {letters &&
        letters.map((letter, idx) => {
          const color = usedKeys[letter.key];
          return (
            <div
              onClick={() => handleClick(letter.key)}
              className={`${tile} ${
                idx === 10
                  ? "md:ml-5 ml-2"
                  : idx === 18
                  ? "md:mr-5 mr-2"
                  : idx === 19
                  ? "md:px-2 px-1"
                  : idx === 27
                  ? "md:px-2 px-1"
                  : ""
              } ${color} child cursor-pointer`}
              key={letter.key}
            >
              {letter.key}
            </div>
          );
        })}
    </div>
  );
}
