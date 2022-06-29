import React, { useState } from "react";
import { IoIosMan } from "react-icons/io";
import { MdChildFriendly } from "react-icons/md";

import { Toggle } from ".";

export function FareToggle() {
  const [isAdult, setIsAdult] = useState(true);

  const handleToggle = () => {
    //TODO code here for request
    setIsAdult(!isAdult);
  };
  return (
    <Toggle
      check={isAdult}
      iconOne={IoIosMan}
      fillOne={"#000000"}
      fillTwo={"#000000"}
      callback={handleToggle}
      iconTwo={MdChildFriendly}
    />
  );
}
