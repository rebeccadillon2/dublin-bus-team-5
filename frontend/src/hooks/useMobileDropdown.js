import { useContext } from "react";
import { MobileDropDownContext } from "../App";

export function useMobileDropDown() {
  const { isMobileDropDown, setIsMobileDropDown } = useContext(
    MobileDropDownContext
  );

  const handleMobileDropdownToggle = () => {
    setIsMobileDropDown(!isMobileDropDown);
  };

  return [isMobileDropDown, handleMobileDropdownToggle];
}
