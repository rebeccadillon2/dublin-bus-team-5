import { useContext } from "react";
import { MapContainerContext } from "../App";

export function useMapContainerType() {
  const { mapContainerType, setMapContainerType } =
    useContext(MapContainerContext);

  const changeMapContainerType = (state) => {
    setMapContainerType({ ...mapContainerType, ...state });
  };

  return [mapContainerType, changeMapContainerType];
}
