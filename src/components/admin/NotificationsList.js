import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);
    const [selectedNotificationId, setSelectedNotificationId] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/notification")
            .then((response) => {
                setNotifications(response.data);
            })
            .catch((error) => {
                console.error("공지사항 목록을 가져오는데 실패했습니다.", error);
            });
    }, []);

    const handleDeleteNotification = () => {
        if (selectedNotificationId) {
            axios
                .delete(`http://localhost:8080/api/notification/${selectedNotificationId}`)
                .then((response) => {
                    if (response.status === 200) {
                        setNotifications((prevNotifications) =>
                            prevNotifications.filter((notification) => notification.id !== selectedNotificationId),
                        );
                        setSelectedNotificationId(null);
                    } else {
                        throw new Error("공지사항 삭제에 실패했습니다.");
                    }
                })
                .catch((error) => {
                    console.error("공지사항 삭제에 실패했습니다.", error);
                });
        }
    };

    return (
        <div>
            <h2>공지사항 목록</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id}>
                        {notification.title}
                        <button onClick={() => setSelectedNotificationId(notification.id)}>삭제</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleDeleteNotification}>선택한 공지사항 삭제</button>
        </div>
    );
};

export default NotificationList;
