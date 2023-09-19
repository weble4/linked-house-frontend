import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bookmarkIcon from "./images/bookmark.png";

const HouseDetail = () => {
    const { rentalId } = useParams();
    const [house, setHouse] = useState([]);
    const [imagePath, setImagePath] = useState([]);
    const [bookmark, setBookmark] = useState();
    const [showMore, setShowMore] = useState(false);

    // 토큰 가져오기
    // 만약 토큰 만료 상태인데 북마크나 예약 누를 경우 로그인 창으로 redirect 또는 로그인 하도록 유도
    const accessToken = localStorage.getItem("accessToken");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const currentTime = Date.now();
    const [isLoggedInLocalStorage, setIsLoggedInLocalStorage] = useState(!!accessToken && tokenExpiration && currentTime < tokenExpiration);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/houses/${rentalId}`, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setHouse(response.data);
                setImagePath(response.data.imagePath);
                console.log(response);
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

    return (
        <div>
            {/** 제목, 설명 태그 */}
            <div className="title flex flex-col">
                <p className="px-8 py-4 font-extrabold text-2xl">제목제목제목제목{house.description}</p>
                <div className="flex flex-row">
                    <span className="px-8 pb-4 font-semibold text-sm">설명설명{house.description}</span>
                    <span className="px-8 pb-4 text-sm">호스트에게 연락하기</span>
                    {/** 로그인 되어 있을때만 북마크 표시 */}
                    {isLoggedInLocalStorage ? (
                        <span className="bookmark px-8 pb-4 text-sm justify-end ml-auto">
                            <img alt="북마크" src={bookmarkIcon} className="h-6 w-6"></img>
                        </span>
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
                <img alt={`img0`} className="px-8 pb-4 flex-1" src={imagePath.length > 0 ? imagePath[0] : ""}></img>
                <div className="flex-4">
                    {/** 나머지 이미지 리스트 작게 표시 */}
                    {showMore
                        ? imagePath
                              .slice(1)
                              .map((path, index) => (
                                  <img key={index} alt={`img${index + 1}`} className="px-8 pb-4 flex-auto" src={path}></img>
                              ))
                        : imagePath
                              .slice(1, 4)
                              .map((path, index) => (
                                  <img key={index} alt={`img${index + 1}`} className="px-8 pb-4 flex-auto" src={path}></img>
                              ))}

                    {/** 더보기 버튼 */}
                    {imagePath.length > 4 && !showMore && (
                        <button onClick={handleShowMore} className="px-8 pb-4 text-sm cursor-pointer text-blue-500">
                            더보기
                        </button>
                    )}
                </div>
                {/** 설명 */}
                <div className="p-8 flex-1 border rounded-md mr-8">
                    <div className="flex flex-row">
                        <span>JW 메리어트 님의 방</span>
                        <span className="flex justify-end ml-auto">호스트 아이콘</span>
                    </div>
                    <div className="text-sm">최소인원 0명 - 최대인원 0명 - 침실 0개 - 침대 0개 - 욕실 0개</div>
                    <div className="text-sm">위치</div>
                    <br></br>
                    <p className="text-sm">
                        나라에 자리한 JW Marriott Hotel Nara에서는 컨시어지 서비스, 금연실 객실, 테라스, 무료 Wi-Fi, 바 등을 제공합니다.
                        숙소는 나라역에서 1.8km 거리에 있습니다. 숙소는 레스토랑, 실내 수영장, 피트니스 센터뿐 아니라 무료 자전거도 갖추고
                        있습니다. 구내에는 전용 주차장이 마련되어 있습니다. JW Marriott Hotel Nara의 숙박 옵션에는 커피 머신 등이 갖춰져
                        있습니다.
                    </p>
                </div>
            </div>
            {/** hr 태그 */}
            <div className="p-4">
                <hr></hr>
            </div>
            {/** 리뷰, 예약 버튼 */}
            <div className="flex">
                {/** 리뷰 */}
                <div className="flex-1">
                    <div className="px-8">
                        <div className="p-4">리뷰 평균 평점</div>
                        <hr></hr>
                        <div className="p-4">작성자 님이 작성한 리뷰</div>
                        <div className="p-4 text-sm">
                            1) 22.00에 어머니 한 명, 세 딸, 세 마리의 안내견이 도착. 호텔에서 booking.com의 확인 코드를 받았음에도 불구하고
                            내 예약이 등록되어 있지 않았습니다.|2) 로비에서 1시간 대기한 후, 우리에게 방을 안내해 주었습니다.|3) 첫째 날
                            인터넷이 안 됐는데 로비에서 인터넷을 사용해야 한다고 안내 받았습니다. 불만을 제기하자 호텔에서 기기를 한 대
                            줬는데 웹사이트도 제대로 열리지 않았습니다. 금요일 밤부터 월요일까지(거의 3일) 인터넷이 안 됐습니다| 4) 우리
                            모두가 머물 수 있는 패밀리룸을 예약했는데 예약 혼선 때문에 연결된 두 개의 객실을 주었고 원래 예약 요금보다 두
                            배를 청구했습니다.||이 모든 것들이 5성급 호텔답지 않았으며 타당하지 않습니다. 호텔과 booking.com 모두에게 여러
                            번 편지를 썼지만 아무도 답변을 하지 않습니다. 정말 슬프고 속상한 경험입니다. 모든 것이 그저 돈만 벌려고 하는
                            것이었습니다. 하룻밤에 800 유로를 결제했는데 너무 실망스러웠어요!
                        </div>
                    </div>
                </div>

                {/** 예약 */}
                <div className="p-8 flex-2 border rounded-md mr-8">
                    <div className="border rounded-md">
                        <div className="px-8 flex flex-row place-content-between">
                            <div className="p-4">
                                <div className="text-sm flex justify-center">체크인</div>
                                <br />
                                <div className="flex justify-center">12:30</div>
                            </div>
                            <div className="p-4">
                                <div className="text-sm flex justify-center">체크아웃</div>
                                <br />
                                <div className="flex justify-center">11:30</div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="px-4 flex flex-row justify-center">
                            <div className="p-4 text-sm">인원수</div>
                        </div>
                        <div className="px-4 flex flex-row justify-center">
                            <div className="p-4 text-sm">3명</div>
                        </div>
                    </div>
                    <div className="p-8 flex flex-row justify-center">
                        <button className="p-4 border rounded-md bg-lime-200 w-48 h-16">예약하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseDetail;
