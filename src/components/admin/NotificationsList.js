import React, { useState } from "react";

const NotificationList = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "NEW : 9월 27일 숙박하신 곳의 리뷰를 작성해 주세요.",
        },
        {
            id: 2,
            title: "서울역과 가까운 호텔 에 대한 숙박 예약이 완료되었습니다.",
        },
        {
            id: 3,
            title: "서울역과 가까운 호텔 에 대한 예약이 신청 완료되었습니다.",
        },
        {
            id: 4,
            title: "서울역과 가까운 호텔 을 북마크에 추가했습니다.",
        },
        {
            id: 5,
            title: "가입을 환영합니다. 원하시는 숙박 업소를 찾아보세요.",
        },
    ]);

    const [selectedNotificationId, setSelectedNotificationId] = useState(null);

    const handleDeleteNotification = (notificationId) => {
        // Set the selected notification when the delete button is clicked
        setSelectedNotificationId(notificationId);
    };

    const handleDeleteSelectedNotification = () => {
        if (selectedNotificationId !== null) {
            // Filter out the selected notification by its id
            const updatedNotifications = notifications.filter((notification) => notification.id !== selectedNotificationId);
            setNotifications(updatedNotifications);
            setSelectedNotificationId(null); // Reset the selected notification
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">공지사항 목록</h2>
                <ul className="space-y-2">
                    {notifications.map((notification) => (
                        <li
                            key={notification.id}
                            className={`p-2 border rounded-lg ${
                                selectedNotificationId === notification.id
                                    ? "border-red-500" // Red border for selected notifications
                                    : "border-transparent"
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <span>{notification.title}</span>
                                <button
                                    onClick={() => {
                                        handleDeleteNotification(notification.id);
                                    }}
                                    className="text-red-300 hover:text-red-500 bg-yellow-300 hover:bg-yellow-500 rounded-lg px-2 py-1 focus:outline-none"
                                >
                                    삭제
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleDeleteSelectedNotification}
                    className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg focus:outline-none"
                    disabled={selectedNotificationId === null}
                >
                    선택한 공지사항 삭제
                </button>
            </div>
        </div>
    );
};

export default NotificationList;
