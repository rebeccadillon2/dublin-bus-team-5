import React, { useEffect, useState } from "react";
import { BsCash } from "react-icons/bs";
import { GoCreditCard } from "react-icons/go";

import { Toggle } from ".";

export function PaymentToggle() {
  const [isCash, setIsCash] = useState(true);

  useEffect(() => {
    const type = window.localStorage.getItem("payment");
    if (!type) {
      window.localStorage.setItem("payment", "cash");
      setIsCash(true);
    } else if (type === "cash") {
      setIsCash(true);
    } else {
      setIsCash(false);
    }
  }, []);

  const handleToggle = async () => {
    const type = window.localStorage.getItem("payment");
    if (!type || type === "cash") {
      await window.localStorage.setItem("payment", "leap");
      setIsCash(false);
    } else {
      await window.localStorage.setItem("payment", "cash");
      setIsCash(true);
    }
  };
  return (
    <Toggle
      check={isCash}
      iconOne={GoCreditCard}
      fillOne={"#000000"}
      fillTwo={"#000000"}
      callback={handleToggle}
      iconTwo={BsCash}
    />
  );
}
