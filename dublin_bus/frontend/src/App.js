import { Route, Routes, BrowserRouter } from "react-router-dom";
import React, { useState, createContext, useEffect } from "react";
import { ProtectedRoute } from "./pages/protected";

import "./styles/globals.css";
import "tailwindcss/tailwind.css";

import {
  getComedyEvents,
  getFolkEvents,
  getMusicEvents,
  getPopEvents,
  getRapEvents,
  getRockEvents,
  getSportEvents,
  getUser,
} from "./lib/api";
import { Nav } from "./components/nav/";
import { Testing2 } from "./pages/testing2";
import { getPayload, isUserAuthenticated } from "./lib/auth";
import SetupSpotifyWebPlayer from "./components/spotify/setup";
import UpdateCurrentTrack from "./components/spotify/update-track";
import { CurrentTrackContextProvider } from "./components/spotify/context";
import {
  Signup,
  Journey,
  Account,
  Login,
  Testing,
  Stops,
  Wordle,
  Events,
} from "./pages";

export const ContainerType = {
  DEFAULT: "default",
  EXPLORE: "explore",
  SPOTIFY: "spotify",
  REALTIME: "realtime",
  FAV_STOPS: "fav_stops",
  WEATHER: "weather",
  ROUTES: "routes",
  FAV_ROUTES: "fav_routes",
};

export const PlaceType = {
  GYM: "gym",
  BANK: "bank",
  COFFEE: "cafe",
  HOTEL: "lodging",
  TOGGLE: "toggle",
  ROUTES: "routes",
  REALTIME: "realtime",
  HOSPITAL: "hospital",
  PHARMACY: "pharmacy",
  RESTAURANT: "restaurant",
  TAKEOUT: "meal_takeaway",
  GROCERIES: "supermarket",
};

export const ThemeContext = createContext({});
export const MapRefContext = createContext({});
export const ExpandedContext = createContext({});
export const MapDetailsContext = createContext({});
export const UserDetailsContext = createContext({});
export const MapContainerContext = createContext({});
export const AuthenticatedContext = createContext({});
export const SpotifyContext = createContext({
  playSpotifyTrack: null,
  playerReady: false,
  authenticated: false,
  updateSpotifyState: null,
  updateSpotifyStateTwo: null,
});

function App() {
  const [events, setEvents] = useState(null);
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
  const [mapContainerType, setMapContainerType] = useState({
    type: ContainerType.DEFAULT,
    place: null,
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

  useEffect(() => {
    const getEventsData = async () => {
      let obj = {};
      try {
        const popRes = await getPopEvents();
        obj = { ...obj, pops: popRes.data._embedded.events };

        const rapRes = await getRapEvents();
        obj = { ...obj, raps: rapRes.data._embedded.events };

        const sportRes = await getSportEvents();
        obj = { ...obj, sports: sportRes.data._embedded.events };

        const comedyRes = await getComedyEvents();
        obj = { ...obj, comedies: comedyRes.data._embedded.events };

        const folkRes = await getFolkEvents();
        obj = { ...obj, folks: folkRes.data._embedded.events };

        const rockRes = await getRockEvents();
        obj = { ...obj, rocks: rockRes.data._embedded.events };

        const musicRes = await getMusicEvents();
        obj = { ...obj, musics: musicRes.data._embedded.events };

        console.log("obj", obj);
        setEvents({ ...obj });
      } catch (e) {
        console.log(e);
      }
    };
    getEventsData();
  }, []);

  window.onSpotifyWebPlaybackSDKReady = () => setSdkReady(true);

  return (
    <MapContainerContext.Provider
      value={{ mapContainerType, setMapContainerType }}
    >
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
                          <Route path={"/testing"} element={<Testing />} />
                          <Route path={"/testing2"} element={<Testing2 />} />
                          <Route path={"/stops"} element={<Stops />} />
                          <Route element={<ProtectedRoute />}>
                            {" "}
                            <Route path={"/account"} element={<Account />} />
                            <Route path={"/wordle"} element={<Wordle />} />
                            <Route
                              path={"/events"}
                              element={<Events events={events} />}
                            />
                          </Route>
                        </Routes>
                      </BrowserRouter>
                      <SetupSpotifyWebPlayer
                        sdkReady={sdkReady}
                        authenticated={spotAuth}
                      />
                      {/* Uncomment when in production */}
                      {/* <UpdateCurrentTrack authenticated={spotAuth} /> */}
                    </CurrentTrackContextProvider>
                  </MapDetailsContext.Provider>
                </MapRefContext.Provider>
              </ExpandedContext.Provider>
            </ThemeContext.Provider>
          </AuthenticatedContext.Provider>
        </UserDetailsContext.Provider>
      </SpotifyContext.Provider>
    </MapContainerContext.Provider>
  );
}

export default App;
