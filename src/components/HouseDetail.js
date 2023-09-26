import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { FiBookmark, FiBookmarkOff } from 'react-icons/fi'; // Import 필요한 아이콘
import Hotel1 from "./images/hotel1.jpg";
import Hotel2 from "./images/hotel2.jpg";
import Hotel3 from "./images/hotel3.jpg";

// 더미 데이터
const dummyHouses = [
    {
        rentalId: 1,
        description: "서울역과 가까운 호텔",
        imagePath: Hotel2,
        minCapacity: 2,
        maxCapacity: 4,
        room: 2,
        bed: 2,
        bathRoom: 1,
        location: "서울, 한국",
        reviews: [
            {
                customer: "승용",
                title: "5점만점에 5점이에요.",
                content: " 아주아주 좋았습니다~ 다시한번 꼭 방문하고싶네요 최고였습니다!",
            },
            {
                customer: "세기",
                title: "좋은 숙소였습니다.",
                content: "숙소 위치가 좋아서 관광하기 편했어요. 깨끗하고 아늑한 공간이었어요",
            },
        ],
    },
    // 다른 더미 데이터 추가 가능
];

const HouseDetail = () => {
    //    const { rentalId } = useParams();
    const house = dummyHouses[0]; // 첫 번째 항목 가져오기
    
    const [imagePath] = useState(house ? [house.imagePath] : []);
    const [bookmark, setBookmark] = useState(false); // 북마크 상태를 초기에 false로 설정
    const [showMore, setShowMore] = useState(false);
    const reviews = house ? house.reviews : []; // 리뷰 데이터를 더미 데이터에서 가져오도록 수정
    const [checkinDate, setCheckinDate] = useState("");
    const [checkoutDate, setCheckoutDate] = useState("");
    const [reservationNum, setReservationNum] = useState(1);
    const [reservationSuccess, setReservationSuccess] = useState(false);

    // 리뷰 작성을 위한 상태
    const [newReview, setNewReview] = useState({
        customer: '',
        title: '',
        content: '',
    });
    
    // 북마크 추가 또는 제거 함수
    const handleToggleBookmark = () => {
        setBookmark((prevBookmark) => !prevBookmark);
    };

    // 더보기 버튼 클릭 시 이미지 더보기 활성화
    const handleShowMore = () => {
        setShowMore(true);
    };

    const handleCheckInDateTimeChange = (event) => {
        setCheckinDate(event.target.value);
    };
    const handleCheckOutDateTimeChange = (event) => {
        setCheckoutDate(event.target.value);
    };

    const handleGuestCountChange = (event) => {
        setReservationNum(event.target.value);
    };

    const handleReservation = async () => {
        try {
            // 예약을 만들기 위한 요청 등을 이곳에 추가
            // 성공 시 reservationSuccess를 true로 설정하면 됩니다.

            setReservationSuccess(true); // 예약 성공 시
        } catch (error) {
            console.error("Error creating reservation", error);
            // 예약 실패 시 에러 처리
        }
    };

    const handleReviewChange = (event) => {
        const { name, value } = event.target;
        setNewReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };

    const handleReviewSubmit = (event) => {
        event.preventDefault();
        // 서버로 새 리뷰를 전송하는 코드를 추가해야 합니다.
        // 서버에 리뷰를 보내고, 성공하면 리뷰 목록을 다시 불러올 수 있습니다.
        // 이 부분은 서버와의 통신에 따라 다를 수 있습니다.
        // 여기에서는 리뷰를 추가하고 더미 데이터를 업데이트합니다.

        const updatedReviews = [...reviews, newReview];
        // 리뷰 작성 폼 초기화
        setNewReview({
            customer: '',
            title: '',
            content: '',
        });
        // 리뷰 목록 업데이트
        house.reviews = updatedReviews;
    };

    const ReservationSuccessPopup = ({ onClose }) => {
        return (
            <div className="reservation-success-popup">
                <p>예약이 성공적으로 완료되었습니다!</p>
                <button onClick={onClose}>닫기</button>
            </div>
        );
    };

    const imageStyle = {
        width: "1000px", // 이미지 너비를 500px로 고정
        height: "500px", // 이미지 높이를 1000px로 고정
    };

    return (
        <div>
            {/** 제목, 설명 태그 */}
            <div className="title flex flex-col">
                <p className="px-8 py-4 font-extrabold text-2xl">{house.description}</p>
                <div className="flex flex-row">
                    <span className="px-8 pb-4 text-sm">호스트에게 연락하기</span>
                </div>
            </div>
            {/** hr 태그 */}
            <div className="p-4">
                <hr></hr>
            </div>

            {/** img */}
            <div className="flex">
            {/* 북마크 토글 버튼 */}
                <button
                    className="bookmark px-8 pb-4 text-sm justify-end ml-auto"
                    onClick={handleToggleBookmark}
                    style={{ border: "none", background: "none" }}
            >
                    {/* 북마크 상태에 따라 아이콘 변경 */}
                    <FiBookmark size={24} color={bookmark ? "red" : "gray"} />
                </button>
                {/** 첫 번째 이미지 크게 표시 */}
                <img alt={`img0`} className="px-8 pb-4 flex-1" src={imagePath.length > 0 ? imagePath[0] : ""} style={imageStyle}></img>
                <div className="flex-1">
                    {/** 나머지 이미지 리스트 작게 표시 */}
                    {showMore
                        ? imagePath
                              .slice(1)
                              .map((path, index) => (
                                  <img key={index} alt={`img${index + 1}`} className="px-8 pb-4" src={path} style={imageStyle}></img>
                              ))
                        : imagePath
                              .slice(1, 4)
                              .map((path, index) => <img key={index} alt={`img${index + 1}`} className="px-8 pb-4" src={path}></img>)}

                    {/** 더보기 버튼 */}
                    {imagePath.length > 4 && !showMore && (
                        <button onClick={handleShowMore} className="px-8 pb-4 text-sm cursor-pointer text-blue-500">
                            더보기
                        </button>
                    )}
                </div>
                {/** 설명 */}
                <div className="p-8 flex-4 border rounded-md mr-8">
                    <div className="flex flex-row">
                        <span className="font-bold text-2xl">사계절 님의 방</span>
                    </div>
                    <div className="text-xl">
                        최소인원 {house.minCapacity}명 - 최대인원 {house.maxCapacity}명 - 침실 {house.room}개 - 침대 {house.bed}개 - 욕실{" "}
                        {house.bathRoom}개
                    </div>
                    <br></br>
                    <div className="text-xl">위치</div>
                    <p className="text-xl">{house.location}</p>
                </div>
            </div>
            {/** hr 태그 */}
            <div className="p-4">
                <form onSubmit={handleReviewSubmit}>
                    <h3 className="font-bold text-xl">리뷰 작성</h3>
                    <div className="p-2">
                        <label htmlFor="customer" className="text-sm">
                            고객 이름:
                        </label>
                        <input
                            type="text"
                            id="customer"
                            name="customer"
                            value={newReview.customer}
                            onChange={handleReviewChange}
                        />
                    </div>
                    <div className="p-2">
                        <label htmlFor="title" className="text-sm">
                            제목:
                        </label>
                        <input type="text" id="title" name="title" value={newReview.title} onChange={handleReviewChange} />
                    </div>
                    <div className="p-2">
                        <label htmlFor="content" className="text-sm">
                            내용:
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            rows="4"
                            cols="50"
                            value={newReview.content}
                            onChange={handleReviewChange}
                        />
                    </div>
                    <div className="p-2">
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                            리뷰 작성
                        </button>
                    </div>
                </form>
                <hr></hr>
            </div>
            {/** 리뷰, 예약 버튼 */}
            <div className="flex">
                {/** 리뷰 */}
                <div className="flex-1">
                    <span className="p-4 text-xl">평균 평점</span>
                    <span className="p-4 text-xl">5.0</span>
                    <hr className="m-8"></hr>
                    {reviews ? (
                        reviews.length === 0 ? (
                            <p className="p-4">리뷰가 없습니다.</p>
                        ) : (
                            reviews.map((review, index) => (
                                <div key={index}>
                                    <h3 className="p-4 font-bold text-xl">{review.customer} 님이 작성한 리뷰</h3>
                                    <div className="p-4 text-sm">{review.title}</div>
                                    <div className="p-4 mx-4 text-sm">{review.content}</div>
                                    <hr></hr>
                                </div>
                            ))
                        )
                    ) : (
                        <p>리뷰 정보를 불러오는 중입니다...</p>
                    )}
                </div>

                {/** 예약 */}
                <div className="p-8 flex-2 justify-center items-center border rounded-md mr-8">
                    <div className="px-8 pb-4">
                        <label className="text-sm">체크인</label>
                        <input
                            type="datetime-local"
                            className="w-full p-2 border rounded-md"
                            value={checkinDate}
                            onChange={handleCheckInDateTimeChange}
                        />
                    </div>

                    <div className="px-8 pb-4">
                        <label className="text-sm">체크아웃</label>
                        <input
                            type="datetime-local"
                            className="w-full p-2 border rounded-md"
                            value={checkoutDate}
                            onChange={handleCheckOutDateTimeChange}
                        />
                    </div>
                    <div className="px-8 pb-4">
                        <label className="text-sm">인원 수</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded-md"
                            value={reservationNum}
                            onChange={handleGuestCountChange}
                            min="1"
                        />
                    </div>

                    <button onClick={handleReservation} className="w-full p-2 border rounded-md bg-lime-200 w-48 h-16">
                        예약하기
                    </button>
                    {reservationSuccess && <ReservationSuccessPopup onClose={() => setReservationSuccess(false)} />}
                </div>
            </div>
        </div>
    );
};

export default HouseDetail;
