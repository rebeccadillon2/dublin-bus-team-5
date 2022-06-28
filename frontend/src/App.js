import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/globals.css";
import "tailwindcss/tailwind.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
