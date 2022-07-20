import React from "react";
import { useTheme } from "../../hooks";

export function Display(props) {
  const [isDarkMode] = useTheme();

  const base = `overflow-hidden rounded-md divide-y`;
  const theme = `${
    isDarkMode
      ? "divide-system-grey5 border border-system-grey5"
      : "divide-system-grey3 border border-system-grey3"
  }`;
  const classes = `${base} ${theme}`;

  return (
    <ul className={classes} {...props}>
      {props.children}
    </ul>
  );
}
