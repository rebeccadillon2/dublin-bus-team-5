import React, { useState } from "react";
import { BasicDateTimePicker } from "../components/elements/form";

export function Stops() {
  const [time, setTime] = useState(new Date());

  return (
    <div className='pl-2'>
      <div className='pb-4'>Stops</div>
      <BasicDateTimePicker time={time} setTime={setTime} />
    </div>
  );
}
