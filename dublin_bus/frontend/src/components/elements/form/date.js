import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useTheme, useWindowSize } from "../../../hooks";

export function BasicDateTimePicker({ time, setTime }) {
  const today = new Date();
  const [isDarkMode] = useTheme();
  const [width] = useWindowSize();
  const theme = isDarkMode
    ? {
        backgroundColor: "#0C0C0D",
        color: "#969ba5",
      }
    : {
        backgroundColor: "#FFFFFF",
        color: "#969ba5",
      };

  const widthStyle =
    width < 768
      ? { width: "18rem", maxWidth: "18rem", minWidth: "18rem" }
      : { width: "320px", maxWidth: "320px", minWidth: "320px" };

  const style = {
    maxHeight: "40px",
    padding: 0,
    paddingRight: "10px",
    borderRadius: "10px",
    fontFamily: "Manrope",
    letterSpacing: "0.02rem",
    fontWeight: "500",
    ...theme,
    ...widthStyle,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        minDate={today}
        InputProps={{
          style,
        }}
        renderInput={(props) => <TextField {...props} />}
        value={time}
        onChange={(newValue) => {
          console.log("NV", newValue);
          setTime(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
