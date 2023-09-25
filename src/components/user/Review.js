import React, { useState } from "react";
import Hotel1 from "../images/hotel1.jpg";

const dummyHouses = [
    {
        rentalId: 1,
        description: "서울역과 가까운 호텔",
        imagePath: Hotel1,
        minCapacity: 2,
        maxCapacity: 4,
        room: 2,
        bed: 2,
        bathRoom: 1,
        location: "서울, 한국",
        reviews: [
            {
                customer: "Choi",
                title: "5점만점에 5점이에요.",
                content: "아주아주 좋았습니다~ 다시한번 꼭 방문하고싶네요 최고였습니다!",
            },
            {
                customer: "Choi",
                title: "만족스러운 숙소",
                content: "위치도 좋고 시설도 깔끔해서 만족스러웠습니다. 추천합니다!",
            },
            {
                customer: "Choi",
                title: "훌륭한 숙소 경험",
                content: "이 숙소에서의 숙박은 정말 훌륭했습니다. 다음에 또 올게요!",
            },
            // 추가적인 리뷰를 계속해서 추가할 수 있습니다.
        ],
    },
    // 다른 더미 데이터 추가 가능
];

const Review = () => {
    const [reviews, setReviews] = useState(dummyHouses[0].reviews);

    const handleDeleteReview = (index) => {
        // 선택한 인덱스의 리뷰를 삭제
        const updatedReviews = reviews.filter((_, i) => i !== index);
        setReviews(updatedReviews);
    };

    return (
        <div>
            <div className="p-8 text-xl font-bold">내가 작성한 리뷰</div>
            {reviews.length === 0 ? (
                <p className="p-8 border rounded-md">작성한 리뷰가 없습니다.</p>
            ) : (
                <div>
                    {reviews.map((review, index) => (
                        <div key={index} className="p-8 border rounded-md mb-4">
                            <h2 className="p-4 text-xl font-bold">{review.title}</h2>
                            <p className="p-4 text-xl">{review.content}</p>
                            <button className="m-4" onClick={() => handleDeleteReview(index)}>
                                리뷰 삭제
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Review;
