import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const HouseSearchResult = () => {
    const reactLocation = useLocation();
    const searchParams = new URLSearchParams(reactLocation.search);

    const location = searchParams.get("location");
    const room = searchParams.get("room");
    const bed = searchParams.get("bed");
    const maxPrice = searchParams.get("maxPrice");
    const minPrice = searchParams.get("minPrice");

    const [houses, setHouses] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // 더미 데이터를 즉시 사용하므로 로딩 상태를 false로 설정

    const navigate = useNavigate();

    // 이미지 스타일을 지정하는 CSS
    const imageStyle = {
        width: "1000px", // 이미지 너비를 500px로 고정
        height: "500px", // 이미지 높이를 1000px로 고정
    };

    // 실제 API 호출 대신 더미 데이터를 사용
    const fetchData = () => {
        setIsLoading(true); // 데이터 로딩 시작

        // 여기서는 더미 데이터를 사용하므로 별도의 HTTP 요청 없이 바로 더미 데이터를 설정
        setHouses(dummyHouses);

        setIsLoading(false); // 데이터 로딩 완료
    };

    // 컴포넌트가 마운트될 때 데이터를 가져옴
    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {houses.length === 0 ? (
                            <p>검색 조건에 해당하는 숙박 업소가 존재하지 않습니다.</p>
                        ) : (
                            houses.map((house) => (
                                <li
                                    key={house.rentalId}
                                    className="p-8 m-8 border rounded-md list-none
                            "
                                >
                                    <div>
                                        <h3 className="py-8 font-bold text-3xl">{house.description}</h3>
                                        <img
                                            src={house.imagePath}
                                            alt={house.description}
                                            style={imageStyle} // 이미지 스타일 적용
                                            onClick={() => {
                                                navigate(`/houses/result`);
                                            }}
                                        />
                                    </div>
                                </li>
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default HouseSearchResult;
