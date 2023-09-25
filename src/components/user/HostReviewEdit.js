import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const HostReviewEdit = () => {
    const { reviewId } = useParams();
    const navigate = useNavigate();

    const [reviewData, setReviewData] = useState({});

    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/api/reviews/${reviewId}`).then((response) => {
            setReviewData(response.data);

            setFormData({
                title: response.data.title,
                content: response.data.content,
            });
        });
    }, [reviewId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8080/api/reviews/${reviewId}`, formData)
            .then((response) => {
                console.log("리뷰 수정이 완료되었습니다.");
                navigate("/host-reviews");
            })
            .catch((error) => {
                console.error("리뷰 수정 실패:", error);
            });
    };

    return (
        <div>
            <h2>호스트 리뷰 수정 페이지</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">제목:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">내용:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                    ></textarea>
                </div>
                <button type="submit">리뷰 수정</button>
            </form>
        </div>
    );
};

export default HostReviewEdit;
