import React, { useContext } from "react";

import { Row } from ".";
import { ThemeContext } from "../../App";

export function Grid({ currentGuess, guesses, turn }) {
  const [isDarkMode] = useContext(ThemeContext);

  return (
    <div className={`${isDarkMode ? "text-zinc-700" : "text-black"}`}>
      {guesses.map((g, idx) => {
        if (turn === idx) {
          return <Row key={idx} currentGuess={currentGuess} />;
        }
        return <Row guess={g} key={idx} />;
      })}
    </div>
  );
}
