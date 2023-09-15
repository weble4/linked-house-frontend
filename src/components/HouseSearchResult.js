import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const HouseSearchResult = () => {
    // Parameter 가져오기
    const reactLocation = useLocation();
    const searchParams = new URLSearchParams(reactLocation.search);

    const location = searchParams.get("location");
    const room = searchParams.get("room");
    const bed = searchParams.get("bed");
    const maxPrice = searchParams.get("maxPrice");
    const minPrice = searchParams.get("minPrice");

    const data = {
        room,
        bed,
        maxPrice,
        minPrice,
    };

    const [houses, setHouses] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const response = axios
            .get(
                `http://localhost:8080/api/houses?location=${location}&room=${room}&bed=${bed}&maxPrice=${maxPrice}&minPrice=${minPrice}`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )
            .then((response) => {
                const { content, totalPages } = response.data;
                setIsLoading(false);
                setHouses(content);
                setTotalPages(totalPages);
                console.log(content);
            })
            .catch((error) => {
                console.log("Fetch Error", error);
                setIsLoading(false);
            });
    }, [page, pageSize]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
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
            </div>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HouseSearchResult;
