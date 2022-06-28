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
