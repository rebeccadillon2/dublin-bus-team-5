import React, { useEffect, useState } from "react";

import { Grid, Keypad } from ".";
import { useWordle } from "../../hooks";

export function WordleContainer({ solution, setReset, reset }) {
  const {
    turn,
    setOld,
    guesses,
    setTurn,
    usedKeys,
    currGuess,
    isCorrect,
    setGuesses,
    setUsedKeys,
    handleKeyup,
    setIsCorrect,
    setCurrGuess,
  } = useWordle(solution);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setTimeout(() => {
        setIsModalOpen(true);
      }, 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5) {
      setTimeout(() => {
        setIsModalOpen(true);
      }, 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  const handleStartOver = () => {
    setGuesses([...Array(6)]);
    setCurrGuess("");
    setTurn(0);
    setOld([]);
    setIsCorrect(false);
    setUsedKeys({});
    setReset(!reset);
  };

  return (
    <div
      className={`flex flex-col justify-between items-center width-full h-screen`}
    >
      <div className='flex flex-col mt-2 items-center justify-center'>
        <div>
          <p className='text-2xl font-strong'>Dublin Street Wordle</p>
        </div>
        <div className='flex items-center'>
          <div>Current solution - {solution}</div>
          <div>
            {/* <button
            className='rounded-lg p-2 bg-neutral-500'
            onClick={handleStartOver}
          >
            Start Over
          </button> */}
          </div>
        </div>
      </div>
      <Grid currentGuess={currGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} handleKeyup={handleKeyup} />
      {/* {isModalOpen && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )} */}
    </div>
  );
}
