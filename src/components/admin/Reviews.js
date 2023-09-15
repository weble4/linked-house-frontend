import React, { useState, useEffect } from "react";

const Reviews = ({ isLoggedIn }) => {
    const [customerReviews, setCustomerReviews] = useState([]);
    const [hostReviews, setHostReviews] = useState([]);
    const [selectedReviewId, setSelectedReviewId] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) return;

        const fetchCustomerReviews = async () => {
            try {
                const response = await fetch("/api/reviews/houses/all/rentalId"); // 수정 필요
                if (response.status === 200) {
                    const data = await response.json();
                    setCustomerReviews(data);
                } else {
                    throw new Error("고객 리뷰 목록을 불러오지 못했습니다.");
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchHostReviews = async () => {
            try {
                const response = await fetch("/api/reviews/hosts/all/customerId"); // 수정 필요
                if (response.status === 200) {
                    const data = await response.json();
                    setHostReviews(data);
                } else {
                    throw new Error("호스트 리뷰 목록을 불러오지 못했습니다.");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCustomerReviews();
        fetchHostReviews();
    }, [isLoggedIn]);

    const handleDeleteReview = (reviewId, type) => {
        if (reviewId) {
            const apiUrl = type === "customer" ? `/api/reviews/houses/${reviewId}` : `/api/reviews/hosts/${reviewId}`;
            fetch(apiUrl, {
                method: "DELETE",
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.text();
                    } else {
                        throw new Error(`리뷰 삭제에 실패했습니다. (${response.status})`);
                    }
                })
                .then((data) => {
                    console.log(data);

                    if (type === "customer") {
                        setCustomerReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
                    } else {
                        setHostReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <h1>Reviews 페이지</h1>
            <div>
                <h2>고객 리뷰</h2>
                <ul>
                    {customerReviews.map((review) => (
                        <li key={review.id}>
                            {review.content}
                            <button onClick={() => setSelectedReviewId(review.id)}>선택</button>
                            <button onClick={() => handleDeleteReview(review.id, "customer")}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>호스트 리뷰</h2>
                <ul>
                    {hostReviews.map((review) => (
                        <li key={review.id}>
                            {review.content}
                            <button onClick={() => setSelectedReviewId(review.id)}>선택</button>
                            <button onClick={() => handleDeleteReview(review.id, "host")}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Reviews;
