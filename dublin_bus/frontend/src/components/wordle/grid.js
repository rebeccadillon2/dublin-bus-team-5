import React from "react";

import { Row } from ".";
import { useTheme } from "../../hooks";

export function Grid({ currentGuess, guesses, turn }) {
  const [isDarkMode] = useTheme();

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
