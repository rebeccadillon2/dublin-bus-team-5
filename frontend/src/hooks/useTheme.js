import { useContext } from "react";
import { ThemeContext } from "../App";

export function useTheme() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", String(!isDarkMode));
  };

  return [isDarkMode, handleThemeToggle];
}
