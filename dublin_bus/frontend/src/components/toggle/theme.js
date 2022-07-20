import React from "react";
import { FaSun } from "react-icons/fa";
import { BsMoonFill } from "react-icons/bs";

import { Toggle } from ".";
import { useTheme } from "../../hooks";

export function ThemeToggle() {
  const [isDarkMode, handleThemeToggle] = useTheme();

  return (
    <Toggle
      iconOne={FaSun}
      check={isDarkMode}
      fillOne={"#ffb703"}
      fillTwo={"#000000"}
      iconTwo={BsMoonFill}
      callback={handleThemeToggle}
    />
  );
}
