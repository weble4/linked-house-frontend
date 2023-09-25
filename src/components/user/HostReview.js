import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HostReview = ({ loggedInUserId }) => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/reviews/`).then((response) => {
            const reviewsArray = Array.isArray(response.data) ? response.data : [];
            const filteredReviews = reviewsArray.filter((review) => review.authorId === loggedInUserId);
            setReviews(filteredReviews);
        });
    }, [loggedInUserId]);

    const handleEditReview = (reviewId) => {
        navigate(`/hostReviewedit/${reviewId}`);
    };

    const handleDeleteReview = (reviewId, reviewAuthorId) => {
        if (loggedInUserId === reviewAuthorId) {
            axios
                .delete(`http://localhost:8080/api/reviews/${reviewId}`)
                .then(() => {
                    setReviews((prevReviews) => prevReviews.filter((review) => review.feedbackCustomerId !== reviewId));
                })
                .catch((error) => {
                    console.error("리뷰 삭제 실패:", error);
                });
        } else {
            console.error("리뷰를 삭제할 권한이 없습니다.");
        }
    };

    return (
        <div>
            <h2>호스트 리뷰 목록</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review.feedbackCustomerId}>
                        <p>{review.title}</p>
                        <p>{review.content}</p>
                        {loggedInUserId === review.authorId && (
                            <>
                                <button onClick={() => handleEditReview(review.feedbackCustomerId)}>수정</button>
                                <button onClick={() => handleDeleteReview(review.feedbackCustomerId, review.authorId)}>삭제</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HostReview;
