import {
  Route,
  Routes,
  Outlet,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import React, { useState, createContext, useEffect } from "react";

import "./styles/globals.css";
import "tailwindcss/tailwind.css";

import { getUser } from "./lib/api";
import { Nav } from "./components/nav/";
import Journey from "./journey/Journey";
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";
import Account from "./components/account/Account";
import { getPayload, isUserAuthenticated } from "./lib/auth";

export const ThemeContext = createContext({});
export const MapRefContext = createContext({});
export const ExpandedContext = createContext({});
export const MapDetailsContext = createContext({});
export const UserDetailsContext = createContext({});
export const AuthenticatedContext = createContext({});
export const MobileDropDownContext = createContext({});
export const ProfileDropdownContext = createContext({});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isExpanded, toggleExpanded] = useState(false);
  const [mapRefContext, setMapRefContext] = useState(null);
  const [isAuthenticated, toggleAuthenticated] = useState(false);
  const [isMobileDropDown, setIsMobileDropDown] = useState(false);
  const [isProfileDropDown, setIsProfileDropDown] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: null,
    userId: null,
    profileImage: null,
  });
  const [mapDetails, setMapDetails] = useState({
    resObj: null,
    routeIdx: null,
    markers: [],
  });

  if (typeof document === "undefined") {
    React.useLayoutEffect = React.useEffect;
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      toggleAuthenticated(isUserAuthenticated());
    }
    if (!userDetails.email) {
      if (localStorage.getItem("darkMode")) {
        setIsDarkMode(localStorage.getItem("darkMode") === "true");
      }
      const getUserInfo = async () => {
        const userId = getPayload().sub;
        const { data } = await getUser(userId);
        setUserDetails({
          email: data.email,
          userId: data.id,
          profileImage: data.profileImage,
        });
      };
      getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProfileClick = () => {
    if (!isProfileDropDown) {
      return;
    }
    setIsProfileDropDown(false);
  };

  const handleMobileClick = () => {
    if (!isMobileDropDown) {
      return;
    }
    setIsProfileDropDown(false);
  };

  const ProtectedRoute = () => {
    return isUserAuthenticated() ? <Outlet /> : <Navigate to='/' replace />;
  };

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      <MobileDropDownContext.Provider
        value={{ isMobileDropDown, setIsMobileDropDown }}
      >
        <ProfileDropdownContext.Provider
          value={{ isProfileDropDown, setIsProfileDropDown }}
        >
          <AuthenticatedContext.Provider
            value={{ isAuthenticated, toggleAuthenticated }}
          >
            <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
              <ExpandedContext.Provider value={{ isExpanded, toggleExpanded }}>
                <MapRefContext.Provider
                  value={{ mapRefContext, setMapRefContext }}
                >
                  <MapDetailsContext.Provider
                    value={{ mapDetails, setMapDetails }}
                  >
                    <div onClick={handleMobileClick}>
                      <div onClick={handleProfileClick}>
                        <BrowserRouter>
                          <Nav />
                          <Routes>
                            <Route path={"/"} element={<Journey />} />
                            <Route path={"/login"} element={<Login />} />
                            <Route path={"/signup"} element={<Signup />} />
                            <Route element={<ProtectedRoute />}>
                              <Route path={"/account"} element={<Account />} />
                            </Route>
                          </Routes>
                        </BrowserRouter>
                      </div>
                    </div>
                  </MapDetailsContext.Provider>
                </MapRefContext.Provider>
              </ExpandedContext.Provider>
            </ThemeContext.Provider>
          </AuthenticatedContext.Provider>
        </ProfileDropdownContext.Provider>
      </MobileDropDownContext.Provider>
    </UserDetailsContext.Provider>
  );
}

export default App;
