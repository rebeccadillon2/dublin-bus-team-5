import React, { useState } from "react";
import { getMLPrediction } from "../lib/api";

export function Testing() {
  const handlePrediction = async () => {
    try {
      const res = await getMLPrediction(
        "Outside Train Station - Phoenix Park Gate",
        "46A"
      );
      console.log("res", res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <button
        onClick={handlePrediction}
        className='p-2 rounded-lg bg-primary-blue m-4'
      >
        Get prediction
      </button>
    </>
  );
}
