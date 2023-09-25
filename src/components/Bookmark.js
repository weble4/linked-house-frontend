import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Bookmark = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const accessToken = localStorage.getItem("accessToken");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const currentTime = Date.now();
    const [isLoggedInLocalStorage, setIsLoggedInLocalStorage] = useState(!!accessToken && tokenExpiration && currentTime < tokenExpiration);
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/bookmarks`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (Array.isArray(response.data)) {
                setBookmarks(response.data);
                setLoading(false);
                setError(null); // 에러가 해결되었으므로 에러 상태 초기화
            } else {
                // 데이터가 배열이 아닌 경우 에러 처리
                setLoading(false);
                setError("북마크 데이터가 잘못되었습니다.");
            }
        } catch (error) {
            setError("북마크를 불러오는 중에 오류가 발생했습니다.");
            setLoading(false);
        }
    }, [accessToken]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <div className="flex flex-col">
                <p className="px-8 py-4 font-extrabold text-2xl">북마크</p>
                <hr></hr>
            </div>
            {isLoggedInLocalStorage ? (
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
                                            className="p-8 border rounded-md list-none"
                                            onClick={() => {
                                                navigate(`/api/houses/${bookmark.rentalId}`);
                                            }}
                                        >
                                            <p>이미지 경로: {bookmark.imagePath}</p>
                                            <p>위치: {bookmark.location}</p>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div>로그인 해주세요.</div>
            )}
        </div>
    );
};

export default Bookmark;
