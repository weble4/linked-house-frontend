import React from "react";

const dummyNotification = [
    {
        notificationType: "NEW",
        notificationContent: "NEW : 9월 27일 숙박하신 곳의 리뷰를 작성해 주세요.",
    },
    {
        notificationType: "ALERT",
        notificationContent: "서울역과 가까운 호텔 에 대한 숙박 예약이 완료되었습니다.",
    },
    {
        notificationType: "ALERT",
        notificationContent: "서울역과 가까운 호텔 에 대한 예약이 신청 완료되었습니다.",
    },
    {
        notificationType: "ALERT",
        notificationContent: "서울역과 가까운 호텔 을 북마크에 추가했습니다.",
    },
    {
        notificationType: "ALERT",
        notificationContent: "가입을 환영합니다. 원하시는 숙박 업소를 찾아보세요.",
    },
];

const Notification = () => {
    return (
        <div className="flex justify-center">
            <div className="w-1/2">
                {dummyNotification.map((notification, index) => (
                    <div key={index} className="p-16 text-xl border rounded-md">
                        <p>{notification.notificationContent}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;
