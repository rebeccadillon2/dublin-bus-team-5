import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/globals.css";
import "tailwindcss/tailwind.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export const MapDetailsContext = createContext({});
export const MapRefContext = createContext({});
export const ExpandedContext = createContext({});
export const ThemeContext = createContext({});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isExpanded, toggleExpanded] = useState(false);
  const [mapRefContext, setMapRefContext] = useState(null);
  const [mapDetails, setMapDetails] = useState({
    resObj: null,
    routeIdx: null,
    markers: [],
  });

  if (typeof document === "undefined") {
    React.useLayoutEffect = React.useEffect;
  }

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      setIsDarkMode(localStorage.getItem("darkMode") === "true");
    }
    // if (localStorage.getItem("token")) {
    //   toggleAuthenticated(isUserAuthenticated());
    // }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <ExpandedContext.Provider value={{ isExpanded, toggleExpanded }}>
        <MapRefContext.Provider value={{ mapRefContext, setMapRefContext }}>
          <MapDetailsContext.Provider value={{ mapDetails, setMapDetails }}>
            <BrowserRouter>
              <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/signup"} element={<Signup />} />
              </Routes>
            </BrowserRouter>
          </MapDetailsContext.Provider>
        </MapRefContext.Provider>
      </ExpandedContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
