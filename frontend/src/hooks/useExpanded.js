import { useContext } from "react";
import { ExpandedContext } from "../App";

export function useExpanded() {
  const { isExpanded, toggleExpanded } = useContext(ExpandedContext);

  const handleExpandedToggle = () => {
    toggleExpanded(!isExpanded);
  };

  return [isExpanded, handleExpandedToggle];
}
