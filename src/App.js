import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Certified from "./components/Certified";
import HostPages from "./components/host/HostPages";
import HouseManagement from "./components/host/HouseManagement";
import HouseRegist from "./components/host/HouseRegist";
import Userpage from "./components/user/Userpage";
import Private from "./components/user/Private";
import ProfileEditor from "./components/user/ProfileEditor";
import BookmarkList from "./components/user/BookmarkList";
import "./userpage.css";
import HouseUpdateForm from "./components/host/HouseUpdateForm";
import Userpage from "./components/Userpage";
import Private from './components/Private';
import ProfileEditor from './components/ProfileEditor';
import BookmarkList from './components/BookmarkList';
import './userpage.css';
import './private.css';
import './profileEditor.css';
import './bookmark.css';

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
          <Route path="/account-settings" element={<Userpage />} />
          <Route path="/private" element={<Private />} />
          <Route path="/profile" element={<ProfileEditor />} />
          <Route path="/bookmark" element={<BookmarkList />} />

          <Route path="/house-management" element={<HouseManagement />} />
          <Route path="/house-regist" element={<HouseRegist />} />
          <Route path="/house-update" element={<HouseUpdateForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
