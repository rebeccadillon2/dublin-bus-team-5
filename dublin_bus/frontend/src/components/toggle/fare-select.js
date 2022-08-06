import React, { useEffect, useState } from "react";

import { useTheme } from "../../hooks";

export function FareSelect() {
  const [type, setType] = useState("adult");
  const [isDarkMode] = useTheme();

  const base = `form-select appearance-none w-25 px-2 py-1.5 text-sm bg-clip-padding bg-no-repeat border-2 border-solid rounded-xl transition ease-in-out m-0 focus:outline-none focus:outline-system-grey2`;
  const themeClasses = ` ${
    isDarkMode
      ? "bg-system-grey6 text-system-grey3 focus:text-system-grey2 focus:outline-primary-black border-0"
      : "bg-system-grey1 text-system-grey6 border-system-grey2 focus:text-system-grey7 "
  }`;
  const classes = `${base} ${themeClasses}`;

  useEffect(() => {
    const fare = window.localStorage.getItem("fare");
    if (!fare || fare === "adult") {
      setType("adult");
    } else if (fare === "student") {
      setType("student");
    } else {
      setType("child");
    }
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);

    const fare = window.localStorage.getItem("fare");
    if (!fare || e.target.value === "adult") {
      window.localStorage.setItem("fare", "adult");
    } else if (e.target.value === "student") {
      window.localStorage.setItem("fare", "student");
    } else {
      window.localStorage.setItem("fare", "child");
    }
    setType(e.target.value);
  };

  return (
    <div className='flex items-center justify-center mt-3'>
      <div className='mb-3 text-sm'>
        <select aria-label='select' className={classes} onChange={handleChange}>
          <option selected={type === "adult"} value='adult'>
            Adult
          </option>
          <option selected={type === "student"} value='student'>
            Student
          </option>
          <option selected={type === "child"} value='child'>
            Child
          </option>
        </select>
      </div>
    </div>
  );
}
