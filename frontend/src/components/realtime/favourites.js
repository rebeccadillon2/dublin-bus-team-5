import React from "react";

import { Navigation, Header } from "../journey";

export function FavouriteStops() {
  return (
    <div className='mb-6'>
      <Navigation type={"realtime"} />
      <Header variant={true} title={"Favourite Stops"} />
    </div>
  );
}
