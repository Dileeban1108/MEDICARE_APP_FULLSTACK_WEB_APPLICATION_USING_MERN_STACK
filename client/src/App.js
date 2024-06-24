import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import BookDoctorPage from "./Pages/BookDoctorPage";
import BuyMedicine from "./Pages/BuyMedicine";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookdoctor" element={<BookDoctorPage />} />
        <Route path="/buymedicine" element={<BuyMedicine />} />
      </Routes>
    </Router>
  );
}

export default App;
