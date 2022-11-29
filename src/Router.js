import React, { Component } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
// import App from "./App";
import Multi from "./Multi";
import App from "./App";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/multi" element={<App />} />
        <Route path="/" element={<Multi />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
