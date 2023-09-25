import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminReview = ({ isLoggedIn }) => {
    const [customerReviews, setCustomerReviews] = useState([]);
    const [hostReviews, setHostReviews] = useState([]);
    const [selectedReviewId, setSelectedReviewId] = useState(null);

    // 리뷰 데이터를 가져오는 함수
    const fetchReviews = (url, setData) => {
        axios
            .get(url)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error("데이터가 배열이 아닙니다.");
                }
            })
            .catch((error) => {
                console.error("리뷰 목록을 가져오는데 실패했습니다.", error);
            });
    };

    useEffect(() => {
        if (isLoggedIn) {
            // 고객 리뷰 데이터 가져오기
            fetchReviews("http://localhost:8080/api/reviews/houses/all/rentalId", setCustomerReviews);

            // 호스트 리뷰 데이터 가져오기
            fetchReviews("http://localhost:8080/api/reviews/all/customerId", setHostReviews);
        }
    }, [isLoggedIn]);

    const handleDeleteReview = (reviewId, type) => {
        if (reviewId) {
            const apiUrl =
                type === "customer"
                    ? `http://localhost:8080/api/reviews/houses/${reviewId}`
                    : `http://localhost:8080/api/reviews/hosts/${reviewId}`;

            axios
                .delete(apiUrl)
                .then((response) => {
                    if (response.status === 200) {
                        if (type === "customer") {
                            setCustomerReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
                        } else {
                            setHostReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
                        }
                    } else {
                        throw new Error("리뷰 삭제에 실패했습니다.");
                    }
                })
                .catch((error) => {
                    console.error("리뷰 삭제에 실패했습니다.", error);
                });
        }
    };

    const handleViewAllReview = async (rentalId) => {
        try {
            const apiUrl = `http://localhost:8080/api/reviews/houses/all/?rentalId=${rentalId}`;
            const response = await axios.get(apiUrl);

            if (response.status === 200) {
                const data = response.data;
                console.log("숙소 리뷰 전체 조회 버튼이 클릭되었습니다.");
                console.log("리뷰 내용:", data.content);
            } else {
                throw new Error(`리뷰 내용을 불러오지 못했습니다. (${response.status})`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleViewSingleReview = async (feedback_customer_id) => {
        try {
            const apiUrl = `http://localhost:8080/api/reviews/houses/${feedback_customer_id}`;
            const response = await axios.get(apiUrl);

            if (response.status === 200) {
                const data = response.data;
                console.log(`숙소 리뷰 개별 조회 버튼이 클릭되었습니다. 리뷰 ID: ${feedback_customer_id}`);
                console.log("리뷰 내용:", data.content);
                setSelectedReviewId(feedback_customer_id);
            } else {
                throw new Error(`리뷰 내용을 불러오지 못했습니다. (${response.status})`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>리뷰 관리 페이지</h1>
            <div>
                <h2>고객 리뷰</h2>
                <ul>
                    {customerReviews.map((review) => (
                        <li key={review.id}>
                            {review.content}
                            <button onClick={() => handleViewAllReview(review.id)}>숙소 리뷰 전체 조회</button>
                            <button onClick={() => handleViewSingleReview(review.feedback_customer_id)}>숙소 리뷰 개별 조회</button>
                            <button
                                onClick={() => handleDeleteReview(review.id, "customer")}
                                disabled={selectedReviewId !== review.feedback_customer_id}
                            >
                                삭제
                            </button>
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
                            <button onClick={() => handleViewAllReview(review.id)}>호스트 리뷰 전체 조회</button>
                            <button onClick={() => handleViewSingleReview(review.feedback_host_id)}>호스트 리뷰 개별 조회</button>
                            <button
                                onClick={() => handleDeleteReview(review.id, "host")}
                                disabled={selectedReviewId !== review.feedback_host_id}
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminReview;
