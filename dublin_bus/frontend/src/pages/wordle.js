import React, { useState, useEffect } from "react";

import { useTheme } from "../hooks";
import myData from "../components/wordle/db.json";
import { WordleContainer } from "../components/wordle";
import { PageContainer } from "../components/container";

export function Wordle() {
  const [isDarkMode] = useTheme();
  const [reset, setReset] = useState(false);
  const [solution, setSolution] = useState(null);
  const [coords, setCoords] = useState(null);
  const classes = `${
    isDarkMode ? "bg-system-grey7" : "bg-system-grey2"
  } width-full`;

  useEffect(() => {
    const obj = myData.solutions[Math.floor(Math.random() * 8)];
    setSolution(obj.word);
    setCoords(obj.location);
  }, [reset]);

  return (
    <PageContainer>
      <div className={classes}>
        {solution && (
          <WordleContainer
            coords={coords}
            solution={solution}
            setReset={setReset}
            reset={reset}
          />
        )}
      </div>
    </PageContainer>
  );
}
