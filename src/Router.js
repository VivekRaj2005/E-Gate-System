import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ResidentLogin from "./Pages/ResidentLogin";
import React from "react";
import VisitorLogin from "./Pages/VisitorLogin";
import SecurityLogin from "./Pages/SecurityLogin";
import { useState } from "react";
import ResidentQR from "./Pages/ResidentQR";

function Router() {
    const [residentData, setResidentData] = useState(null)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/resident/login" element={<ResidentLogin setResidentData={setResidentData} />} />
        <Route path="/resident/QR" element={<ResidentQR residentData={residentData} />} />
        <Route path="/visitor/login" element={<VisitorLogin />} />
        <Route path="/security/login" element={<SecurityLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
