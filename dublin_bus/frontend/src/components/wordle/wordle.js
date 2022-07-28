import React, { useEffect, useState } from "react";

import { Grid, Keypad, WordleModal } from ".";
import { useTheme, useWordle } from "../../hooks";
import { Popup } from "../popup";

export function WordleContainer({ solution, setReset, reset }) {
  const {
    popup,
    popupMessage,
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
  const [hasModalBeenOpened, setHasModalBeenOpened] = useState(false);
  const [isDarkMode] = useTheme();

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      if (!hasModalBeenOpened) {
        setHasModalBeenOpened(true);
        setTimeout(() => {
          setIsModalOpen(true);
        }, 2000);
      }

      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5) {
      setHasModalBeenOpened(true);

      if (!hasModalBeenOpened) {
        setTimeout(() => {
          setIsModalOpen(true);
        }, 2000);
      }
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  useEffect(() => {}, [guesses, turn, isCorrect]);

  const handleStartOver = () => {
    setGuesses([...Array(6)]);
    setCurrGuess("");
    setTurn(0);
    setOld([]);
    setIsCorrect(false);
    setUsedKeys({});
    setReset(!reset);
    setIsModalOpen(false);
    setHasModalBeenOpened(false);
  };

  return (
    <>
      <div
        className={`flex flex-col justify-between items-center width-full md:h-[calc(100vh-64px)] h-[calc(100vh-40px)]`}
      >
        <div
          className={`${
            isDarkMode ? "text-system-grey4" : "text-system-grey6"
          } flex flex-col mt-2 items-center justify-center md:mt-10 mt-3`}
        >
          <div>
            <p className='text-3xl font-strong'>Dublin Street Wordle</p>
          </div>
          <div className='flex items-center'>
            <div>Current solution - {solution}</div>
          </div>
        </div>
        <Grid currentGuess={currGuess} guesses={guesses} turn={turn} />
        <Keypad usedKeys={usedKeys} handleKeyup={handleKeyup} />
        <WordleModal
          turn={turn}
          open={isModalOpen}
          solution={solution}
          isCorrect={isCorrect}
          setOpen={setIsModalOpen}
          handleStartOver={handleStartOver}
        />
      </div>
      <Popup popup={popup} text={popupMessage} color={"red"} />
    </>
  );
}
