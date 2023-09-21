import React, { useState } from "react";
import axios from "axios";

const ReservationItem = ({ house }) => {

  // AutoReservation 상태를 관리할 로컬 state 추가
  const [autoReservationState, setAutoReservationState] =
    useState(house.autoReservation);

  // AutoReservation 수정을 처리하는 함수
  const handleAutoReservationToggle = async () => {
    // 현재 AutoReservation 상태를 토글
    const updatedAutoReservation =
      autoReservationState === "MANUAL" ? "AUTO" : "MANUAL";

    console.log(updatedAutoReservation);

    const accessToken = localStorage.getItem("accessToken");
    try {
      // house 객체를 업데이트하여 autoReservation 값을 수정
      const updatedHouse = {
        ...house,
        autoReservation: updatedAutoReservation,
      };

      await axios.patch(
        `http://110.165.18.244:8080/api/host/houses/reservation/${house.rentalId}`,
        updatedHouse, // 업데이트된 house 객체를 전달
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json", // JSON 요청을 보내도록 설정
          },
        }
      );

      // 업데이트 성공시 로컬 state 업데이트
      setAutoReservationState(updatedAutoReservation);
    } catch (error) {
      console.error("Error updating AutoReservation:", error);
    }
  };

  return (
    <div className="flex items-center hover:bg-gray-100 p-4 mb-4">
      {house.imagePath && (
        <div className="flex-shrink-0 w-24 h-24">
          <img
            src={house.imagePath[0]}
            alt={`House`}
            className="w-full h-full object-cover rounded"
          />
        </div>
      )}
      <div className="ml-4">
        <h2 className="text-xl font-semibold">{house.description}</h2>
        <p className="text-gray-600">위치: {house.location}</p>
        <p className="text-gray-600">가격: {house.price}</p>
        {/* AutoReservation 상태에 따라 표시되는 단추 */}
        <button
          className={`${
            autoReservationState === "AUTO" ? "bg-green-500" : "bg-red-500"
          } text-white px-4 py-2 rounded`}
          onClick={handleAutoReservationToggle}
        >
          {autoReservationState}
        </button>
      </div>
    </div>
  );
};

export default ReservationItem;
