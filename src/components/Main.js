import React, { useEffect, useState } from "react";
import SearchModal from "./modal/SearchModal";
import Logo from "./images/logo_transparent.png";
import Hotel1 from "./images/hotel1.jpg";
import Hotel2 from "./images/hotel2.jpg";
import Hotel3 from "./images/hotel3.jpg";
import Hotel4 from "./images/hotel4.jpg";
import Hotel5 from "./images/hotel5.jpg";

const Main = () => {
    // Modal 관련
    const [showModal, setShowModal] = useState(false);

    const handleScroll = () => {
        const imageList = document.querySelector(".image-list");
        if (imageList) {
            imageList.scrollLeft += 100; // 이미지가 왼쪽으로 스크롤되도록
        }
    };

    // 클릭 이벤트 핸들러 모달 열기
    const openModal = () => {
        setShowModal(true);
    };

    useEffect(() => {
        console.log("clicked");
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Todo : 스크롤 속도 조절
    return (
        // 크기 설정
        <>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px:8">
                {/** Linked-House */}
                <div className="">
                    <img
                        src={Logo}
                        alt="로고"
                        className="mx-auto" // 가로 중앙 정렬을 위한 스타일 추가
                        style={{ width: "300px", height: "300px" }}
                    />
                </div>
                {/** 폰트 적용 필요 */}
                <div className="text-3xl font-extrabold text-center m-20">
                    <span className="bg-clip-text text-dark-600">어디로 떠나시겠어요?</span>
                </div>
                {/** 검색창
                 * Todo : 침대수, 방갯수, 지역 별 검색
                 */}
                <div className="max-w-l px-20">
                    <div className="max-w-l px-20">
                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>

                            {/* 모달 열기 버튼 */}
                            <button className="rounded-lg w-full py-10 pl-12 pr-4 border border-blue-100" onClick={openModal}>
                                검색
                            </button>
                        </div>
                    </div>{" "}
                    {/* 모달 열기 상태에 따라 모달 컴포넌트 렌더링 */}
                </div>{" "}
                {showModal && <SearchModal setShowModal={setShowModal} />}
            </div>

            {/** Todo: 클릭으로 스크롤시 옆으로, 클릭 떼면 스크롤 풀림, 단건 클릭시 이동 */}
            <div>
                <div>
                    <div className="h-10 m-10 text-center text-3xl font-bold">지금 뜨는 여행지</div>
                    <div className="flex overflow-x-scroll image-list">
                        <img src={Hotel1} alt="House" className="w-96 h-72 m-2 flex-none"></img>
                        <img src={Hotel2} alt="House" className="w-96 h-72 m-2 flex-none"></img>
                        <img src={Hotel3} alt="House" className="w-96 h-72 m-2 flex-none"></img>
                        <img src={Hotel4} alt="House" className="w-96 h-72 m-2 flex-none"></img>
                        <img src={Hotel5} alt="House" className="w-96 h-72 m-2 flex-none"></img>
                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-72 m-2 flex-none"
                        ></img>
                    </div>
                    <div className="p-8"></div>
                </div>
                {/** 
                <div>
                    <div className="h-10 m-10 text-center font-bold">할인 중인 여행지</div>
                    <div className="flex overflow-x-scroll image-list">
                        <img src={Hotel1} alt="House" className="w-96 h-72 m-2 flex-none"></img>
                        <img src={Hotel2} alt="House" className="w-96 h-72 m-2 flex-none"></img>
                        <img src={Hotel3} alt="House" className="w-96 h-72 m-2 flex-none"></img>
                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-72 m-2 flex-none"
                        ></img>
                    </div>
                </div>*/}
            </div>
        </>
    );
};

export default Main;
