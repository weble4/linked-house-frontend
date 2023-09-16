import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HouseSearchResult = () => {
    // Parameter 가져오기
    const reactLocation = useLocation();
    const searchParams = new URLSearchParams(reactLocation.search);

    const location = searchParams.get("location");
    const room = searchParams.get("room");
    const bed = searchParams.get("bed");
    const maxPrice = searchParams.get("maxPrice");
    const minPrice = searchParams.get("minPrice");

    const [houses, setHouses] = useState([]);
    const [page, setPage] = useState(0);
    const pageSize = useState(20);
    const [totalPages, setTotalPages] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/houses`, {
                    params: {
                        location,
                        minPrice,
                        maxPrice,
                        room,
                        bed,
                    },
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const { data } = response;
                const { content, totalPages } = data;
                setIsLoading(false);
                setHouses(content);
                setTotalPages(totalPages);
                console.log(content);
            } catch (error) {
                console.error("Fetch Error", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [location, minPrice, maxPrice, room, bed, page, pageSize]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

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
                                <li key={house.rentalId}>
                                    <div>
                                        <h3>{house.description}</h3>
                                        <img src={house.imagePath} alt={house.name} />
                                    </div>
                                </li>
                            ))
                        )}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button key={index} onClick={() => handlePageChange(index)}>
                                {index + 1}
                            </button>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default HouseSearchResult;