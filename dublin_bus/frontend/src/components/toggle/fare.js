import React, { useEffect, useState } from "react";
import { IoIosMan } from "react-icons/io";
import { MdChildFriendly } from "react-icons/md";

import { Toggle } from ".";

export function FareToggle() {
  const [isAdult, setIsAdult] = useState(true);

  useEffect(() => {
    const type = window.localStorage.getItem("fare");
    console.log("type", type);
    if (!type) {
      window.localStorage.setItem("fare", "adult");
      setIsAdult(true);
    } else if (type === "adult") {
      setIsAdult(true);
    } else {
      setIsAdult(false);
    }
  }, []);

  const handleToggle = async () => {
    const type = window.localStorage.getItem("fare");
    if (!type || type === "adult") {
      await window.localStorage.setItem("fare", "child");
      setIsAdult(false);
    } else {
      await window.localStorage.setItem("fare", "adult");
      setIsAdult(true);
    }
  };
  return (
    <Toggle
      check={isAdult}
      iconOne={MdChildFriendly}
      fillOne={"#000000"}
      fillTwo={"#000000"}
      callback={handleToggle}
      iconTwo={IoIosMan}
    />
  );
}
