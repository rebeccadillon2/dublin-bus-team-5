import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useTheme } from "../../../hooks";

export function BasicDateTimePicker({ time, setTime }) {
  const [isDarkMode] = useTheme();
  const theme = isDarkMode
    ? {
        backgroundColor: "#0C0C0D",
        color: "#969ba5",
      }
    : {
        backgroundColor: "#FFFFFF",
        color: "#969ba5",
      };

  const style = {
    maxHeight: "40px",
    padding: 0,
    paddingRight: "10px",
    maxWidth: "320px",
    minWidth: "320px",
    borderRadius: "10px",
    fontFamily: "Manrope",
    letterSpacing: "0.02rem",
    fontWeight: "500",
    ...theme,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        InputProps={{
          style,
        }}
        renderInput={(props) => <TextField {...props} />}
        value={time}
        onChange={(newValue) => {
          setTime(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
