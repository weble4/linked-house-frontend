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
        <div>
            <h2>공지사항 목록</h2>
            <div>
                <ul>
                    {notifications.map((notification) => (
                        <li
                            key={notification.id}
                            style={{
                                border: selectedNotificationId === notification.id ? "2px solid red" : "2px solid transparent", // Transparent border for unselected notifications
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>{notification.title}</span>
                                <button
                                    onClick={() => {
                                        handleDeleteNotification(notification.id);
                                    }}
                                >
                                    삭제
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={handleDeleteSelectedNotification}>선택한 공지사항 삭제</button>
            </div>
        </div>
    );
};

export default NotificationList;
