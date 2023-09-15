import React, { useState, useEffect } from "react";

const Notifications = ({ isLoggedIn }) => {
    const [notifications, setNotifications] = useState([]);
    const [selectedNotificationId, setSelectedNotificationId] = useState(null);
    const [newNotificationContent, setNewNotificationContent] = useState("");

    useEffect(() => {
        if (!isLoggedIn) return;

        const fetchNotifications = async () => {
            try {
                const response = await fetch("/api/admin/notifications");
                if (response.status === 200) {
                    const data = await response.json();
                    setNotifications(data);
                } else {
                    throw new Error("공지사항 목록을 불러오지 못했습니다.");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchNotifications();
    }, [isLoggedIn]);

    const handleDeleteNotification = () => {
        if (selectedNotificationId) {
            fetch(`/api/admin/notifications/${selectedNotificationId}`, { method: "DELETE" })
                .then((response) => {
                    if (response.status === 200) {
                        return response.text();
                    } else {
                        throw new Error("공지사항 삭제에 실패했습니다.");
                    }
                })
                .then((data) => {
                    console.log(data);
                    setNotifications((prevNotifications) =>
                        prevNotifications.filter((notification) => notification.id !== selectedNotificationId),
                    );
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleCreateNotification = () => {
        if (newNotificationContent) {
            fetch("/api/admin/notifications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: newNotificationContent }),
            })
                .then((response) => {
                    if (response.status === 201) {
                        return response.json();
                    } else {
                        throw new Error("공지사항 작성에 실패했습니다.");
                    }
                })
                .then((data) => {
                    console.log(data);
                    setNotifications((prevNotifications) => [...prevNotifications, data]);
                    setNewNotificationContent("");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <h1>공지사항 페이지</h1>
            <div>
                <textarea
                    value={newNotificationContent}
                    onChange={(e) => setNewNotificationContent(e.target.value)}
                    placeholder="새로운 공지사항을 입력하세요"
                ></textarea>

                <button onClick={handleCreateNotification}>공지사항 작성</button>
            </div>

            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id}>
                        {notification.content}
                        <button onClick={() => setSelectedNotificationId(notification.id)}>공지사항 선택</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleDeleteNotification}>공지사항 삭제</button>
        </div>
    );
};

export default Notifications;
