import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/globals.css";
import "tailwindcss/tailwind.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export const MapDetailsContext = createContext({});
export const MapRefContext = createContext({});

function App() {
  const [mapRefContext, setMapRefContext] = useState(null);
  const [mapDetails, setMapDetails] = useState({
    resObj: null,
    routeIdx: null,
    markers: [],
  });

  return (
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
  );
}

export default App;
