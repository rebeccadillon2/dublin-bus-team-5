import React from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "../../hooks";

export default function Confetti() {
  const [width, height] = useWindowSize();

  return (
    <>
      {" "}
      <ReactConfetti width={width} height={height} />
    </>
  );
}
