import { useContext } from "react";
import { AuthenticatedContext } from "../App";

export function useAuthenticate() {
  const { isAuthenticated, toggleAuthenticated } =
    useContext(AuthenticatedContext);
  return [isAuthenticated, toggleAuthenticated];
}
