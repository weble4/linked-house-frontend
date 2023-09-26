import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNotification = () => {
    const [notificationContent, setNotificationContent] = useState("");
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleCreateNotification = async () => {
        try {
            if (notificationContent) {
                // 서버로 공지사항을 전송하거나 다른 필요한 작업 수행

                // 공지사항 작성 후 성공 메시지를 표시
                setShowSuccessMessage(true);

                // 5초 후에 adminpage로 이동
                setTimeout(() => {
                    setShowSuccessMessage(false);
                    navigate("/adminpage");
                }, 5000); // 5초 대기

                // 공지하였습니다 메시지를 window.alert로 표시
                window.alert("공지하였습니다.");
            }
        } catch (error) {
            console.error("공지사항 작성에 실패했습니다.", error);
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">공지사항 작성</h2>
                <textarea
                    value={notificationContent}
                    onChange={(e) => setNotificationContent(e.target.value)}
                    className="w-full h-32 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="새로운 공지사항을 입력하세요"
                ></textarea>
                <button
                    onClick={handleCreateNotification}
                    disabled={!notificationContent}
                    className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg focus:outline-none"
                >
                    확인
                </button>
                {showSuccessMessage && (
                    <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-lg text-center">
                        <p>공지하였습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateNotification;
