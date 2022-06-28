import { errorTypes } from ".";

export function routeErrorCheck(originVal, destinationVal, setInputError) {
  if (originVal === "" || destinationVal === "") {
    setInputError(errorTypes.MISSING_INPUT);
    return true;
  }
  if (originVal === destinationVal) {
    setInputError(errorTypes.SAME);
    return true;
  }
  return false;
}

export function getMapContainerStyle(width, isExpanded) {
  return {
    width: "100vw",
    height:
      width >= 768
        ? "calc(100vh - 64px)"
        : isExpanded
        ? "calc(100vh - 64px - 80vh)"
        : "calc(100vh - 64px - 216px)",
  };
}
