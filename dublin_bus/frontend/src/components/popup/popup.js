import React from "react";
import { Transition } from "@headlessui/react";

export function Popup(props) {
  const { popup, text, color, ...rest } = props;
  const classes = `fixed ${
    color === "red" ? "bg-primary-red" : "bg-primary-green"
  } text-primary-white top-6 right-6 p-4 rounded-lg shadow-lg z-50`;

  return (
    <Transition
      show={popup}
      enter='transition-all ease-in-out duration-500'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-all ease-in-out duration-500'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      {...rest}
    >
      <div className={classes}>
        <p>{text}</p>
      </div>
    </Transition>
  );
}
