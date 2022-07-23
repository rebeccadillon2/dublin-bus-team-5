import React, { useState, useEffect } from "react";

import { useTheme } from "../hooks";
import myData from "../components/wordle/db.json";
import { WordleContainer } from "../components/wordle";
import { PageContainer } from "../components/container";

export function Wordle() {
  const [isDarkMode] = useTheme();
  const [reset, setReset] = useState(false);
  const [solution, setSolution] = useState(null);
  const classes = `${
    isDarkMode ? "bg-system-grey7" : "bg-system-grey2"
  } width-full`;

  useEffect(() => {
    setSolution(myData.solutions[Math.floor(Math.random() * 20)].word);
  }, [reset]);

  return (
    <PageContainer>
      <div className={classes}>
        {solution && (
          <WordleContainer
            solution={solution}
            setReset={setReset}
            reset={reset}
          />
        )}
      </div>
    </PageContainer>
  );
}
