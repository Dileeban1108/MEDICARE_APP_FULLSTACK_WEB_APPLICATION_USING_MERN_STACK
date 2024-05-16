import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Register from "./Pages/Register"
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;