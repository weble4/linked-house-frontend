import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Certified = () => {
  console.log("Certified component rendered"); // Add this line
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const customerId = searchParams.get("customerId");

    if (customerId) {
      console.log("Customer ID:", customerId);

      axios
        .get(
          `http://110.165.18.244:8080/api/customers/activate-state?customerId=${customerId}`
        )
        .then((response) => {
          const responseData = response.data.message;
          window.alert(JSON.stringify(responseData));
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
          window.alert(JSON.stringify(error.response.data.message));
          navigate("/");
        });
    }
  }, [navigate]); // navigate를 의존성 배열에 추가

  return <div></div>;
};

export default Certified;
