import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ResidentLogin from "./Pages/ResidentLogin";
import React, { useEffect } from "react";
import VisitorLogin from "./Pages/VisitorLogin";
import SecurityLogin from "./Pages/SecurityLogin";
import { useState } from "react";
import ResidentQR from "./Pages/ResidentQR";
import Dashboard from "./Components/Dashboard/Dashboard";
import QRCode from "./Components/Dashboard/QRCode";
import EntryRequest from "./Components/Dashboard/EntryRequest";
import Notification from "./Components/Dashboard/Notification";


function Router() {
    const [residentData, setResidentData] = useState(null);
    const [securityData, setSecurityData] = useState(null);
    const [residentID, setResidentID] = useState(null);
    useEffect(() => {
        console.log(securityData);
    })
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/resident/login" element={<ResidentLogin setResidentData={setResidentData} setResidentID={setResidentID} />} />
        <Route path="/resident/QR" element={<ResidentQR residentData={residentData} residentID={residentID}/>} />
        <Route path="/visitor/login" element={<VisitorLogin />} />
        <Route path="/security/login" element={<SecurityLogin setSecurityData={setSecurityData}/>} />
        <Route path="/security/dashboard" element={<Dashboard securityData={securityData} setSecurityData={setSecurityData}/>} />
        <Route path="/security/entryreq" element={<EntryRequest securityData={securityData} setSecurityData={setSecurityData}/>} />
        <Route path="/security/notif" element={<Notification securityData={securityData} setSecurityData={setSecurityData}/>} />
        <Route path="/security/qr/entry" element={<QRCode securityData={securityData} status={"Entry"}/>} />
        <Route path="/security/qr/exit" element={<QRCode securityData={securityData}  status={"Exit"}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
