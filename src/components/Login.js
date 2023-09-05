import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({ isLoggedIn, onLogin }) => {
  const [customerEmail, setCustomerId] = useState("");
  const [customerPw, setCustomerPw] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (customerEmail.trim() === "" || customerPw.trim() === "") {
      setError("아이디와 비밀번호를 입력해주세요");
      return;
    }

    if (!emailPattern.test(customerEmail)) {
      setError("올바른 아이디 형식이 아닙니다.");
      return;
    }
    //실제 LoginRequestDto의 이름에 맞게 사용
    const data = {
      customerEmail,
      customerPw,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/customers/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("accessToken", data.token.accessToken);
        localStorage.setItem("refreshToken", data.token.refreshToken);
        localStorage.setItem(
          "tokenExpiration",
          Date.now() + data.token.accessTokenExpiresIn
        );
        localStorage.setItem("role", data.role)
        onLogin();
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("로그인 중에 문제가 발생하였습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96 h-96">
        <h1 className="text-2xl font-bold mb-7">로그인</h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-7">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="customerEmail"
            >
              아이디
            </label>
            <input
              type="text"
              id="customerEmail"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your email"
              value={customerEmail}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </div>
          <div className="mb-9">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="customerPw"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="customerPw"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your customerPw"
              value={customerPw}
              onChange={(e) => setCustomerPw(e.target.value)}
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="w-1/2 p-2 bg-blue-500 text-white text-center rounded mr-2"
            >
              로그인
            </button>
            <Link
              to="/signup"
              className="w-1/2 p-2 bg-blue-500 text-white text-center rounded ml-2"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
