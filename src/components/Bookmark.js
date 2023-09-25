import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hotel1 from "./images/hotel1.jpg";
import Hotel2 from "./images/hotel2.jpg";
import Hotel3 from "./images/hotel3.jpg";

// 더미 데이터
const dummyHouses = [
    {
        rentalId: 1,
        description: "서울역과 가까운 호텔",
        imagePath: Hotel1, // 이미지 경로 수정
    },
    {
        rentalId: 2,
        description: "5성급 호텔",
        imagePath: Hotel2, // 이미지 경로 수정
    },
    {
        rentalId: 3,
        description: "서울 인기있는 호텔",
        imagePath: Hotel3, // 이미지 경로 수정
    },
    // 더 많은 더미 데이터 추가 가능
];

const Bookmark = () => {
    const [bookmarks, setBookmarks] = useState(dummyHouses);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // 북마크 삭제 함수
    const handleDeleteBookmark = (rentalId) => {
        // rentalId를 기반으로 해당 북마크를 삭제
        const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.rentalId !== rentalId);
        setBookmarks(updatedBookmarks);
    };

    return (
        <div>
            <div className="flex flex-col">
                <p className="px-8 py-4 font-extrabold text-2xl">북마크</p>
                <hr></hr>
            </div>
            <div className="flex flex-col">
                {loading ? (
                    <p>북마크를 불러오는 중입니다...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div>
                        <ul>
                            {bookmarks.length === 0 ? (
                                <div className="p-8">북마크가 없습니다.</div>
                            ) : (
                                bookmarks.map((bookmark) => (
                                    <li
                                        key={bookmark.rentalId}
                                        className="p-8 border rounded-md list-none cursor-pointer"
                                        onClick={() => {
                                            navigate(`/api/houses/${bookmark.rentalId}`);
                                        }}
                                    >
                                        <img src={bookmark.imagePath} alt={bookmark.description} className="w-80 h-100 m-4" />
                                        <p className="m-4">설명: {bookmark.description}</p>
                                        {/* 삭제 버튼 */}
                                        <button
                                            className="m-4"
                                            onClick={(e) => {
                                                e.stopPropagation(); // 이벤트 버블링 방지
                                                handleDeleteBookmark(bookmark.rentalId);
                                            }}
                                        >
                                            삭제
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookmark;
