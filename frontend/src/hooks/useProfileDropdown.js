import { useContext } from "react";
import { ProfileDropdownContext } from "../App";

export function useProfileDropDown() {
  const { isProfileDropDown, setIsProfileDropDown } = useContext(
    ProfileDropdownContext
  );

  const handleProfileDropdownToggle = () => {
    setIsProfileDropDown(!isProfileDropDown);
  };

  return [isProfileDropDown, handleProfileDropdownToggle];
}
