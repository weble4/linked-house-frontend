import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Main from "./components/Main";

const App = () => {
    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="" element={<Main />} />
                    {/* Other routes go here */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
