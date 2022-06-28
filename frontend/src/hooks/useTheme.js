import { useContext } from "react";
import { ThemeContext } from "../App";

export function useTheme() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    toggleDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", String(!isDarkMode));
  };

  return [isDarkMode, handleThemeToggle];
}
