import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const defaultRole = "ROLE_CUSTOMER";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerEmail: "",
    customerPw: "",
    role: [defaultRole],
    nickname: "",
    gender: "",
    phoneNum: "",
    birthDay: "",
  });
  const [emailError, setEmailError] = useState(null);
  const [emailExists, setEmailExists] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const passwordCheck = formData.password_check;
    setFormData({ ...formData, customerPw: password });
    setPasswordError(passwordCheck !== password);
  };

  const handlePasswordCheckChange = (e) => {
    const password = formData.customerPw;
    const passwordCheck = e.target.value;
    setFormData({ ...formData, password_check: passwordCheck });
    setPasswordError(password !== passwordCheck);
  };

  const validateEmailFormat = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleVerifyEmail = async () => {
    if (!validateEmailFormat(formData.customerEmail)) {
      setEmailError("유효한 이메일 형식이 아닙니다.");
      return;
    }

    try {
      const response = await axios.get(
        `http://110.165.18.244/api/customers/check-email?email=${formData.customerEmail}`
        // `http://localhost:8080/api/customers/check-email?email=${formData.customerEmail}`
      );
      setEmailError(null); // Clear any previous email error
      setEmailExists(response.data);
    } catch (error) {
      // Handle error (e.g., display error message)
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const phoneNum = e.target.value;
    const phoneRegex = /^(01[016789]{1})-[0-9]{3,4}-[0-9]{4}$/;

    setFormData({ ...formData, phoneNum });

    if (phoneRegex.test(phoneNum)) {
      setPhoneError(false); // Clear the phone error when the format is correct
    } else {
      setPhoneError(true); // Set the phone error when the format is incorrect
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (passwordError || phoneError) {
      return;
    }

    try {
      window.alert("이메일 발송 중입니다..알림창을 끄고 잠시만 기다려주세요");

      const response = await axios.post(
        "http://110.165.18.244:8080/api/customers/signup",
        // "http://localhost:8080/api/customers/signup",
        formData
      );

      if (response.status === 200) {
        const responseData = response.data.response;
        window.alert(`${JSON.stringify(responseData)}`);
        navigate("/login");
      }
    } catch (error) {
      const responseMessage = error.response.data.validation;
      if (responseMessage != null) {
        const validationMessages = [];

        for (const field in responseMessage) {
          if (responseMessage.hasOwnProperty(field)) {
            const message = responseMessage[field];
            validationMessages.push(`${field}: ${message}`);
          }
        }
        const formattedMessages = validationMessages.join("\n");
        window.alert(formattedMessages);
      } else {
        window.alert("다시 입력을 진행하세요");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              이메일 아이디
            </label>
            <div className="flex">
              <input
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={formData.customerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, customerEmail: e.target.value })
                }
              />
              <button
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-1/5 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleVerifyEmail}
                disabled={loading}
              >
                {loading ? "Checking..." : "중복검사"}
              </button>
            </div>
            {emailError && <p className="mt-2 text-red-600">{emailError}</p>}
            {emailExists !== null && !emailError && (
              <p
                className={`mt-2 ${
                  emailExists ? "text-red-600" : "text-green-600"
                }`}
              >
                {emailExists
                  ? "중복 아이디 입니다."
                  : "사용 가능한 아이디입니다."}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              패스워드
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.customerPw}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password_check"
            >
              패스워드 확인
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                passwordError ? "border-red-500" : ""
              }`}
              id="password_check"
              type="password"
              placeholder="비밀번호 체크"
              value={formData.password_check}
              onChange={handlePasswordCheckChange}
            />
            {passwordError && (
              <p className="text-red-500 text-xs italic">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              성별
            </label>
            <div className="flex">
              <label className="mr-5">
                <input
                  type="radio"
                  value="man"
                  checked={formData.gender === "man"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="mr-1"
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  value="woman"
                  checked={formData.gender === "woman"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="mr-1"
                />
                여성
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nickname"
            >
              닉네임
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nickname"
              type="text"
              placeholder="nickname"
              value={formData.nickname}
              onChange={(e) =>
                setFormData({ ...formData, nickname: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNum"
            >
              휴대폰 번호
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                phoneError ? "border-red-500" : ""
              }`}
              id="phoneNum"
              type="text"
              placeholder="휴대폰 번호를 010-1234-1234 형식으로 입력해주세요"
              value={formData.phoneNum}
              onChange={handlePhoneChange}
            />
            {phoneError && (
              <p className="mt-2 text-red-600">
                010-3432-3414 같은 형식으로 입력해주세요.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="birthDay"
            >
              생년월일
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="birthDay"
              type="text"
              placeholder=" 주민번호 앞 6자리를 입력해주세요. 예시 : 950305"
              value={formData.birthDay}
              onChange={(e) =>
                setFormData({ ...formData, birthDay: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
