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
import { Signup, Journey, Account, Login } from "./pages";
import { getPayload, isUserAuthenticated } from "./lib/auth";
import SetupSpotifyWebPlayer from "./components/spotify/setup";
import UpdateCurrentTrack from "./components/spotify/update-track";
import { CurrentTrackContextProvider } from "./components/spotify/context";

export const ThemeContext = createContext({});
export const MapRefContext = createContext({});
export const ExpandedContext = createContext({});
export const MapDetailsContext = createContext({});
export const UserDetailsContext = createContext({});
export const AuthenticatedContext = createContext({});
export const SpotifyContext = createContext({
  playSpotifyTrack: null,
  playerReady: false,
  authenticated: false,
  updateSpotifyState: null,
  updateSpotifyStateTwo: null,
});

function App() {
  const [sdkReady, setSdkReady] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isExpanded, toggleExpanded] = useState(false);
  const [mapRefContext, setMapRefContext] = useState(null);
  const [isAuthenticated, toggleAuthenticated] = useState(false);
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
  const [spotifyPlayer, setSpotifyPlayer] = useState({
    playTrack: null,
    playerReady: false,
    authenticated: false,
    failedToConnect: false,
  });
  const [currentTrackDetails, setCurrentTrackDetails] = useState({
    currentTrackName: null,
    currentTrackId: null,
    progress: null,
    isPlaying: null,
  });
  const [spotAuth, setSpotAuth] = useState(false);

  const updateSpotifyPlayerState = (state) => {
    setSpotifyPlayer({ ...spotifyPlayer, ...state });
  };

  const updateSpotifyPlayerStateTwo = (state) => {
    setSpotAuth(state);
  };
  if (typeof document === "undefined") {
    React.useLayoutEffect = React.useEffect;
  }

  const UpdateCurrentTrackDetailsNow = (details) => {
    setCurrentTrackDetails({ ...currentTrackDetails, ...details });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      toggleAuthenticated(isUserAuthenticated());
    }
    if (localStorage.getItem("darkMode")) {
      setIsDarkMode(localStorage.getItem("darkMode") === "true");
    }
    if (!userDetails.email && isUserAuthenticated()) {
      const getUserInfo = async () => {
        const userId = getPayload().sub;
        console.log(userId);
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

  window.onSpotifyWebPlaybackSDKReady = () => setSdkReady(true);

  const ProtectedRoute = () => {
    return isUserAuthenticated() ? <Outlet /> : <Navigate to='/' replace />;
  };

  return (
    <SpotifyContext.Provider
      value={{
        updateSpotifyStateTwo: updateSpotifyPlayerStateTwo,
        updateSpotifyState: updateSpotifyPlayerState,
        playSpotifyTrack: spotifyPlayer.playSpotifyTrack,
        authenticated: spotifyPlayer.authenticated,
      }}
    >
      <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
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
                  <CurrentTrackContextProvider
                    value={{
                      currentTrackName: currentTrackDetails.currentTrackName,
                      currentTrackId: currentTrackDetails.currentTrackId,
                      progress: currentTrackDetails.progress,
                      isPlaying: currentTrackDetails.isPlaying,
                      updateCurrentTrackDetails: UpdateCurrentTrackDetailsNow,
                    }}
                  >
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
                    <SetupSpotifyWebPlayer
                      sdkReady={sdkReady}
                      authenticated={spotAuth}
                    />
                    <UpdateCurrentTrack authenticated={spotAuth} />
                  </CurrentTrackContextProvider>
                </MapDetailsContext.Provider>
              </MapRefContext.Provider>
            </ExpandedContext.Provider>
          </ThemeContext.Provider>
        </AuthenticatedContext.Provider>
      </UserDetailsContext.Provider>
    </SpotifyContext.Provider>
  );
}

export default App;
