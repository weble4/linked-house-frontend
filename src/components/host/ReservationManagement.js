import React, { useState, useEffect } from "react";
import axios from "axios";

function ReservationManagement() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:8080/api/reservations", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  }, []);

  const changeReservationState = (reservationId) => {
    const accessToken = localStorage.getItem("accessToken");
    const url = `http://localhost:8080/api/reservations/permission/${reservationId}`;
    console.log(url);
    axios
      .post(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("예약 승인 완료");
        console.log("Reservation state changed successfully:", response.data);
      })
      .catch((error) => {
        console.log("예약 승인 실패");
        console.error("Error changing reservation state:", error);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Reservations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.reservationId}
            className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Reservation Details
              </h2>
              <p>
                <strong>Check-in Date:</strong> {reservation.checkinDate}
              </p>
              <p>
                <strong>Check-out Date:</strong> {reservation.checkoutDate}
              </p>
              <p>
                <strong>Payment State:</strong> {reservation.paymentState}
              </p>
              <p>
                <strong>Reservation State:</strong>{" "}
                {reservation.reservationState}
              </p>
            </div>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => changeReservationState(reservation.reservationId)}
            >
              Change Reservation State
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReservationManagement;
