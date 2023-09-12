import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const HouseSearchResult = () => {
    const [searchParams] = useSearchParams();
    const filterKeyword = searchParams.get("filterKeyword");
    const room = searchParams.get("room");
    const bed = searchParams.get("bed");
    const maxPrice = searchParams.get("maxPrice");
    const minPrice = searchParams.get("minPrice");

    const [houses, setHouses] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://localhost:8080/api/houses?filterKeyword=${filterKeyword}&room=${room}&bed=${bed}&maxPrice=${maxPrice}&minPrice=${minPrice}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            // API 응답 데이터 처리
            const data = response.data;
            // data를 상태에 설정하거나 화면에 렌더링
        } catch (error) {
            // 오류 처리
            console.log("검색에 실패했습니다.");
        }
    };

    useEffect(() => {
        fetchData();
    }, [filterKeyword, room, bed, maxPrice, minPrice]);

    return (
        <div>
            {houses.map(({ description, imagePath }) => (
                <p>
                    <div>description: {description}</div>
                    <div>imagePath: {imagePath}</div>
                </p>
            ))}
        </div>
    );
};

export default HouseSearchResult;
