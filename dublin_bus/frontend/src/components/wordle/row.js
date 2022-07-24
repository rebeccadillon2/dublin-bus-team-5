import React from "react";
import { useTheme } from "../../hooks";

export function Row({ guess, currentGuess }) {
  const [isDarkMode] = useTheme();
  const rowParent = `flex justify-center text-center row`;
  const themeClasses = `${isDarkMode ? "border-grey" : "border-system-grey3"}`;
  const rowClasses = `flex items-center justify-center md:w-[60px] md:h-[60px] w-[50px] h-[50px] border  m-1 text-center md:leading-10 leading-8	uppercase font-bold md:text-4xl text-2xl ${themeClasses}`;

  if (guess) {
    return (
      <div className={`${rowParent}`}>
        {guess.map((item, idx) => (
          <div
            key={idx}
            className={`${
              item.color === "grey"
                ? "grey"
                : item.color === "green"
                ? "green"
                : " yellow"
            }  child ${rowClasses}`}
          >
            {item.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    const letters = currentGuess.split("");

    return (
      <div className={`${rowParent} current`}>
        {letters.map((item, idx) => (
          <div key={idx} className={`${rowClasses} filled child`}>
            {item}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((_, idx) => (
          <div key={idx} className={`${rowClasses} child`}></div>
        ))}
      </div>
    );
  }

  return (
    <div className={rowParent}>
      <div className={`${rowClasses} child`} />
      <div className={`${rowClasses} child`} />
      <div className={`${rowClasses} child`} />
      <div className={`${rowClasses} child`} />
      <div className={`${rowClasses} child`} />
    </div>
  );
}
