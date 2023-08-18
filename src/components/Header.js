import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Link to="/" className="text-xl font-bold hover:text-blue-500">
        Linked House
      </Link>
      <nav className="flex space-x-4">
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login
          </Link>
        )}
        {/* Add other navigation links here */}
      </nav>
    </header>
  );
};

export default Header;
