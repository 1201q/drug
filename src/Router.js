import React, { Component } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Multi from "./Multi";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Multi />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
