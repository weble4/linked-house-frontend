import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bookmarkIcon from "./images/bookmark.png";

const HouseDetail = () => {
  const { rentalId } = useParams();
  const [house, setHouse] = useState({});
  const [imagePath, setImagePath] = useState([]);
  const [bookmark, setBookmark] = useState();
  const [showMore, setShowMore] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [reservationNum, setReservationNum] = useState(1);
  const [reservationSuccess, setReservationSuccess] = useState(false);

  // 토큰 가져오기
  // 만약 토큰 만료 상태인데 북마크나 예약 누를 경우 로그인 창으로 redirect 또는 로그인 하도록 유도
  const accessToken = localStorage.getItem("accessToken");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  const currentTime = Date.now();
  const [isLoggedInLocalStorage, setIsLoggedInLocalStorage] = useState(
    !!accessToken && tokenExpiration && currentTime < tokenExpiration
  );

  // const nickname = house.host.nickname;
  // console.log(nickname);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // House fetch
        const houseResponse = await axios.get(
          `http://localhost:8080/api/houses/${rentalId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setHouse(houseResponse.data);
        setImagePath(houseResponse.data.imagePath);

        // Review fetch
        const reviewsResponse = await axios.get(
          `http://localhost:8080/api/reviews/houses/${rentalId}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // reviewsResponse 가 배열인지 확인
        if (Array.isArray(reviewsResponse.data)) {
          // 배열이라면 데이터 넣기
          setReviews(reviewsResponse.data);
        } else {
          // 예외 처리
          console.error(
            "Invalid data format for reviews:",
            reviewsResponse.data
          );
        }
        // console.log(houseResponse.data);
        // console.log(reviewsResponse.data);
        console.log(localStorage.getItem("id"));
      } catch (error) {
        console.error("Fetch Error", error);
      }
    };
    fetchData();
  }, [rentalId]);

  // 더보기 버튼 클릭 시 이미지 더보기 활성화
  const handleShowMore = () => {
    setShowMore(true);
  };

  const addBookmark = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/bookmarks/${rentalId}`,
        null,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setBookmark(true);
    } catch (error) {
      console.error("Error adding bookmark", error);
    }
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
      // Make a POST request to create a reservation
      const reservationData = {
        rentalId: rentalId,
        checkinDate: checkinDate,
        checkoutDate: checkoutDate,
        reservationNum: reservationNum,
      };

      await axios.post(
        `http://localhost:8080/api/reservations/customer/${rentalId}`,
        reservationData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      setReservationSuccess(true);
      // Handle success, e.g., show a success message or redirect to a confirmation page
      console.log("Reservation successful!");
    } catch (error) {
      console.error("Error creating reservation", error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  const ReservationSuccessPopup = ({ onClose }) => {
    return (
      <div className="reservation-success-popup">
        <p>예약이 성공적으로 완료되었습니다!</p>
        <button onClick={onClose}>닫기</button>
      </div>
    );
  };

  const formatDateTimeForInput = (dateTime) => {
    const formattedDateTime = dateTime.replace(" ", "T"); // Replace space with 'T' to match format
    return formattedDateTime;
  };

  return (
    <div>
      {/** 제목, 설명 태그 */}
      <div className="title flex flex-col">
        <p className="px-8 py-4 font-extrabold text-2xl">{house.description}</p>
        <div className="flex flex-row">
          {/** <span className="px-8 pb-4 font-semibold text-sm">설명설명{house.description}</span>*/}
          <span className="px-8 pb-4 text-sm">호스트에게 연락하기</span>
          {/** 로그인 되어 있을때만 북마크 표시 */}
          {isLoggedInLocalStorage ? (
            <button
              className="bookmark px-8 pb-4 text-sm justify-end ml-auto"
              onClick={addBookmark}
            >
              <img alt="북마크" src={bookmarkIcon} className="h-6 w-6"></img>
            </button>
          ) : (
            <span></span>
          )}
        </div>
      </div>
      {/** hr 태그 */}
      <div className="p-4">
        <hr></hr>
      </div>

      {/** img */}
      <div className="flex">
        {/** 첫 번째 이미지 크게 표시 */}
        <img
          alt={`img0`}
          className="px-8 pb-4 flex-1"
          src={imagePath.length > 0 ? imagePath[0] : ""}
        ></img>
        <div className="flex-1">
          {/** 나머지 이미지 리스트 작게 표시 */}
          {showMore
            ? imagePath
                .slice(1)
                .map((path, index) => (
                  <img
                    key={index}
                    alt={`img${index + 1}`}
                    className="px-8 pb-4"
                    src={path}
                  ></img>
                ))
            : imagePath
                .slice(1, 4)
                .map((path, index) => (
                  <img
                    key={index}
                    alt={`img${index + 1}`}
                    className="px-8 pb-4"
                    src={path}
                  ></img>
                ))}

          {/** 더보기 버튼 */}
          {imagePath.length > 4 && !showMore && (
            <button
              onClick={handleShowMore}
              className="px-8 pb-4 text-sm cursor-pointer text-blue-500"
            >
              더보기
            </button>
          )}
        </div>
        {/** 설명 */}
        <div className="p-8 flex-4 border rounded-md mr-8">
          <div className="flex flex-row">
            <span>님의 방</span>
          </div>
          <div className="text-sm">
            최소인원 {house.minCapacity}명 - 최대인원 {house.maxCapacity}명 -
            침실 {house.room}개 - 침대 {house.bed}개 - 욕실 {house.bathRoom}개
          </div>
          <div className="text-sm">위치</div>
          <br></br>
          <p className="text-sm">{house.location}</p>
        </div>
      </div>
      {/** hr 태그 */}
      <div className="p-4">
        <hr></hr>
      </div>
      {/** 리뷰, 예약 버튼 */}
      <div className="flex">
        {/** 리뷰 */}
        {/** */}
        <div className="flex-1">
          {reviews ? (
            Array.isArray(reviews) && reviews.length === 0 ? (
              <p className="p-4">리뷰가 없습니다.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.feedbackCustomerId}>
                  <h3 className="p-4">{review.customer} 님이 작성한 리뷰</h3>
                  <div className="p-4 text-sm">{review.title}</div>
                  <div className="p-4 text-sm">{review.content}</div>
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
            <label className="text-sm">Check-in Date and Time:</label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded-md"
              value={checkinDate}
              onChange={handleCheckInDateTimeChange}
            />
          </div>

          <div className="px-8 pb-4">
            <label className="text-sm">Check-out Date and Time:</label>
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

          <button
            onClick={handleReservation}
            className="w-full p-2 border rounded-md bg-lime-200 w-48 h-16"
          >
            예약하기
          </button>
          {reservationSuccess && (
            <ReservationSuccessPopup
              onClose={() => setReservationSuccess(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseDetail;
