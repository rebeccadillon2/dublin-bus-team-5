import React, { useContext } from "react";
import { MapDetailsContext } from "../App";

export default function RouteOptions() {
  const { mapDetails, setMapDetails } = useContext(MapDetailsContext);

  const pickRoute = (id) => {
    console.log("id", id);
    setMapDetails({ ...mapDetails, routeIdx: id });
  };

  const bgColor = (id) => {
    if (id === mapDetails.routeIdx) {
      return { backgroundColor: "blue" };
    }
    return { backgroundColor: "white" };
  };

  return (
    <ul>
      {mapDetails.resObj.routes.map((route, index) => (
        <li key={index}>
          <button style={bgColor(index)} onClick={() => pickRoute(index)}>
            Route {index}
          </button>
        </li>
      ))}
    </ul>
  );
}
