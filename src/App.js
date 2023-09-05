import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Certified from "./components/Certified";
import HostPages from "./components/host/HostPages";
import HouseManagement from "./components/host/HouseManagement";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize with false

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/certified" element={<Certified />} />
          <Route path="/host-settings" element={<HostPages />} />
          <Route
            path="/host-settings/house-management"
            element={<HouseManagement />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
