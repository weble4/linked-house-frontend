import React from "react";
import Hotel8 from "../images/hotel8.png";
import Hotel7 from "../images/hotel7.png"; // Hotel7 이미지 추가

// 더미 데이터
const dummyReservation = [
    {
        rentalId: 1,
        description: "안락한 분위기의 더블 베드 룸",
        imagePath: Hotel8,
        checkinDate: "2023-09-25",
        checkoutDate: "2023-09-27",
        paymentState: "결제 완료",
        reservationState: "승인",
    },
    {
        rentalId: 2,
        description: "큰 창문과 푹신한 침대가 있는 방",
        imagePath: Hotel7,
        checkinDate: "2023-09-28",
        checkoutDate: "2023-09-30",
        paymentState: "결제 완료",
        reservationState: "승인",
    },
    // 다른 더미 데이터 추가 가능
];

const Reservation = () => {
    return (
        <div>
            {dummyReservation.map((reservation) => (
                <div key={reservation.rentalId} className="p-4 border rounded-lg my-4 shadow-md bg-white">
                    <img src={reservation.imagePath} alt={reservation.description} className="w-64 h-40 object-cover rounded-lg m-4" />
                    <div className="p-4">
                        <p className="text-xl font-semibold mb-2">숙소 설명:</p>
                        <p className="text-gray-700">{reservation.description}</p>
                        <p className="text-xl font-semibold mt-4">체크인 날짜:</p>
                        <p className="text-gray-700">{reservation.checkinDate}</p>
                        <p className="text-xl font-semibold mt-4">체크아웃 날짜:</p>
                        <p className="text-gray-700">{reservation.checkoutDate}</p>
                        <p className="text-xl font-semibold mt-4">결제 상태:</p>
                        <p className="text-gray-700">{reservation.paymentState}</p>
                        <p className="text-xl font-semibold mt-4">예약 상태:</p>
                        <p className="text-gray-700">{reservation.reservationState}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Reservation;
