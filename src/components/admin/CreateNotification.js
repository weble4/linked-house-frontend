import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateNotification = () => {
    const [notificationContent, setNotificationContent] = useState("");
    const navigate = useNavigate();

    const handleCreateNotification = () => {
        if (notificationContent) {
            axios
                .post("http://localhost:8080/api/admin/notifications", {
                    content: notificationContent,
                })
                .then((response) => {
                    if (response.status === 201) {
                        navigate("/admin-notification");
                    } else {
                        throw new Error("공지사항 작성에 실패했습니다.");
                    }
                })
                .catch((error) => {
                    console.error("공지사항 작성에 실패했습니다.", error);
                });
        }
    };

    return (
        <div>
            <h2>공지사항 작성</h2>
            <textarea
                value={notificationContent}
                onChange={(e) => setNotificationContent(e.target.value)}
                placeholder="새로운 공지사항을 입력하세요"
            ></textarea>
            <button onClick={handleCreateNotification}>확인</button>
            <button onClick={() => navigate("/admin-notification")}>취소</button>
        </div>
    );
};

export default CreateNotification;
