import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, createContext, useEffect } from "react";

import "./styles/globals.css";
import "tailwindcss/tailwind.css";

import Nav from "./Nav";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Journey from "./journey/Journey";
import { isUserAuthenticated } from "./lib/auth";

export const MapDetailsContext = createContext({});
export const MapRefContext = createContext({});
export const ExpandedContext = createContext({});
export const ThemeContext = createContext({});
export const AuthenticatedContext = createContext({});
export const ProfileDropdownContext = createContext({});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isExpanded, toggleExpanded] = useState(false);
  const [mapRefContext, setMapRefContext] = useState(null);
  const [isAuthenticated, toggleAuthenticated] = useState(false);
  const [isProfileDropDown, setIsProfileDropDown] = useState(false);

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
    if (localStorage.getItem("token")) {
      toggleAuthenticated(isUserAuthenticated());
    }
  }, []);

  const handleClick = () => {
    if (!isProfileDropDown) {
      return;
    }
    setIsProfileDropDown(false);
  };

  return (
    <ProfileDropdownContext.Provider
      value={{ isProfileDropDown, setIsProfileDropDown }}
    >
      <AuthenticatedContext.Provider
        value={{ isAuthenticated, toggleAuthenticated }}
      >
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
          <ExpandedContext.Provider value={{ isExpanded, toggleExpanded }}>
            <MapRefContext.Provider value={{ mapRefContext, setMapRefContext }}>
              <MapDetailsContext.Provider value={{ mapDetails, setMapDetails }}>
                <div onClick={handleClick}>
                  <BrowserRouter>
                    <Nav />
                    <Routes>
                      <Route path={"/"} element={<Journey />} />
                      <Route path={"/login"} element={<Login />} />
                      <Route path={"/signup"} element={<Signup />} />
                    </Routes>
                  </BrowserRouter>
                </div>
              </MapDetailsContext.Provider>
            </MapRefContext.Provider>
          </ExpandedContext.Provider>
        </ThemeContext.Provider>
      </AuthenticatedContext.Provider>
    </ProfileDropdownContext.Provider>
  );
}

export default App;
