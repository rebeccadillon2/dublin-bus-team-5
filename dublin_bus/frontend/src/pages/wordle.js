import React, { useState, useEffect } from "react";

import { useTheme } from "../hooks";
import myData from "../components/wordle/db.json";
import { WordleContainer } from "../components/wordle";

export function Wordle() {
  const [isDarkMode] = useTheme();
  const [reset, setReset] = useState(false);
  const [solution, setSolution] = useState(null);
  const classes = `${isDarkMode ? "bg-black" : "bg-white"} width-full h-screen`;

  useEffect(() => {
    setSolution(myData.solutions[Math.floor(Math.random() * 20)].word);
  }, [reset]);

  return (
    <div className={classes}>
      {solution && (
        <WordleContainer
          solution={solution}
          setReset={setReset}
          reset={reset}
        />
      )}
    </div>
  );
}
