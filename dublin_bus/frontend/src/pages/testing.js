import React from "react";
import { getMLPrediction } from "../lib/api";

export function Testing() {
  const handlePrediction = async () => {
    try {
      const res = await getMLPrediction();
      console.log("res", res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={handlePrediction}
          className='p-2 rounded-lg bg-primary-blue m-4'
        >
          Get prediction
        </button>
      </div>
    </>
  );
}
