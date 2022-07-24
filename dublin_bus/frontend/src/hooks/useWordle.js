import { useState } from "react";

// Code inspiration https://github.com/iamshaunjp/React-Wordle

export const useWordle = (solution) => {
  const [old, setOld] = useState([]);
  const [turn, setTurn] = useState(0);
  const [usedKeys, setUsedKeys] = useState({});
  const [currGuess, setCurrGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [guesses, setGuesses] = useState([...Array(6)]);

  // Function to format the guess
  const formatGuess = () => {
    let solutionArr = [...solution];
    let fg = [...currGuess].map((item) => {
      return { key: item, color: "grey" };
    });

    fg.forEach((item, i) => {
      if (solutionArr[i] === item.key) {
        fg[i].color = "green";
        solutionArr[i] = null;
      }
    });

    fg.forEach((item, i) => {
      if (solutionArr.includes(item.key) && item.color !== "green") {
        fg[i].color = "yellow";
        solutionArr[solutionArr.indexOf(item.key)] = null;
      }
    });

    return fg;
  };

  // Function to add a new guess
  const addNewGuess = (formattedGuess) => {
    if (currGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setOld((prevHistory) => {
      return [...prevHistory, currGuess];
    });

    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key];

        if (l.color === "green") {
          prevUsedKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[l.key] = "yellow";
          return;
        }
        if (l.color === "grey" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[l.key] = "grey";
          return;
        }
      });

      return prevUsedKeys;
    });
    setCurrGuess("");
  };

  // Function to handle key presses and
  const handleKeyup = ({ key }) => {
    if (key.toLowerCase() === "enter") {
      if (turn > 5) {
        console.log("you used all your guesses!");
        return;
      }

      if (old.includes(currGuess)) {
        console.log("you already tried that word.");
        return;
      }

      if (currGuess.length !== 5) {
        console.log("word must be 5 chars.");
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === "Backspace" || key === "DEL") {
      setCurrGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currGuess.length < 5) {
        setCurrGuess((prev) => prev + key);
      }
    }
  };

  return {
    turn,
    setOld,
    setTurn,
    guesses,
    usedKeys,
    isCorrect,
    currGuess,
    setGuesses,
    setUsedKeys,
    handleKeyup,
    setIsCorrect,
    setCurrGuess,
  };
};
