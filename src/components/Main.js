import React, { useState, useEffect } from "react";

const Main = () => {
    const handleScroll = () => {
        const imageList = document.querySelector(".image-list");
        if (imageList) {
            imageList.scrollLeft += 100; // 이미지가 왼쪽으로 스크롤되도록
        }
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
                <div className="text-5xl font-extrabold text-center m-8">
                    <span className="bg-clip-text text-blue-600">Linked-House</span>
                </div>
                {/** 폰트 적용 필요 */}
                <div className="text-3xl font-extrabold text-center m-20">
                    <span className="bg-clip-text text-dark-600">어디로 떠나시겠어요?</span>
                </div>
                {/** 검색창
                 * Todo : 침대수, 방갯수, 지역 별 검색
                 */}
                <form className="max-w-l px-20" action="/houses/" method="GET">
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

                        {/** Todo : Modal창 띄우기 */}
                        <button className="rounded-lg w-full py-10 pl-12 pr-4 border bg-blue-100"></button>
                    </div>
                </form>{" "}
            </div>

            {/** Todo: 클릭으로 스크롤시 옆으로, 클릭 떼면 스크롤 풀림, 단건 클릭시 이동 */}
            <div>
                <div>
                    <div className="h-10 m-10 text-center font-bold">지금 뜨는 여행지</div>
                    <div className="flex overflow-x-scroll image-list">
                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-96 m-2 flex-none"
                        ></img>
                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-96 m-2 flex-none"
                        ></img>

                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-96 m-2 flex-none"
                        ></img>
                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-96 m-2 flex-none"
                        ></img>

                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-96 m-2 flex-none"
                        ></img>
                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-96 m-2 flex-none"
                        ></img>
                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-96 m-2 flex-none"
                        ></img>
                    </div>
                </div>
                <div>
                    <div className="h-10 m-10 text-center font-bold">할인 중인 여행지</div>
                    <div className="flex overflow-x-scroll image-list">
                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-96 m-2 flex-none"
                        ></img>
                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-96 m-2 flex-none"
                        ></img>

                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-96 m-2 flex-none"
                        ></img>
                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-96 m-2 flex-none"
                        ></img>

                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-96 m-2 flex-none"
                        ></img>
                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-96 m-2 flex-none"
                        ></img>
                        <img
                            src="https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="House"
                            className="w-96 h-96 m-2 flex-none"
                        ></img>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;
