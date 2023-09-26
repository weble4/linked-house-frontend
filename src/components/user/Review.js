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
                customer: "찬희",
                title: "훌륭한 숙소입니다.",
                content: "최고",
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
