import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, onLogout }) => {
  const accessToken = localStorage.getItem("accessToken");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  const currentTime = Date.now();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const [isLoggedInLocalStorage, setIsLoggedInLocalStorage] = useState(
    !!accessToken && tokenExpiration && currentTime < tokenExpiration
  );

  useEffect(() => {
    setIsLoggedInLocalStorage(
      !!accessToken && tokenExpiration && currentTime < tokenExpiration
    );
  }, [accessToken, tokenExpiration, currentTime]);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    // Clear all tokens and token-related data from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiration");

    // Call the onLogout function to handle any additional logout logic
    onLogout();
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Link to="/" className="text-xl font-bold hover:text-blue-500">
        Linked House
      </Link>
      <nav className="flex space-x-4">
        {isLoggedInLocalStorage ? (
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              유저 정보
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-md">
                <ul>
                  <li>
                    <Link
                      to="/account-settings"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={closeProfileMenu}
                    >
                      설정
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeProfileMenu();
                      }}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      로그아웃
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login
          </Link>
        )}

          <Link
            to="/account-settings"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            User
          </Link>
      </nav>
    </header>
  );
};

export default Header;
