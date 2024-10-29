import React from "react";
import {  Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/LoginSignup";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
      </Routes>

  );
};

export default App;
