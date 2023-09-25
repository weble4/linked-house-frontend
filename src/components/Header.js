import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, onLogout }) => {
  const accessToken = localStorage.getItem("accessToken");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  const currentTime = Date.now();

  const userRoles = localStorage.getItem("role");

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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("role");

    onLogout();
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  // const handleRefreshToken = async () => {
  //   try {
  //     const refreshToken = localStorage.getItem("refreshToken");
  //     const response = await axios.post(
  //       "http://localhost:8080/api/customers/reissue",
  //       null,
  //       {
  //         headers: {
  //           refresh: refreshToken,
  //         },
  //       }
  //     );
  //     const token = response.data.tokenDto;
  //     const newAccessToken = token.accessToken;
  //     const newTokenExpiration = Date.now() + token.tokenExpiration;
  //     localStorage.setItem("accessToken", newAccessToken);
  //     localStorage.setItem("tokenExpiration", newTokenExpiration);
  //   } catch {
  //     //catch
  //   }
  // };

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
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 border-b"
                      onClick={closeProfileMenu}
                    >
                      개인 정보
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/admin-settings"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 border-b"
                      onClick={closeProfileMenu}
                    >
                      관리 정보
                    </Link>
                  </li>  

                  {userRoles.includes("ROLE_HOST") && (
                    <li>
                      <Link
                        to="/host-settings"
                        className="block px-4 py-2 w-[125px] text-gray-800 hover:bg-gray-100 border-b"
                        onClick={closeProfileMenu}
                      >
                        호스트 설정
                      </Link>
                    </li>
                  )}

                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeProfileMenu();
                      }}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 border-b"
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
            로그인
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;