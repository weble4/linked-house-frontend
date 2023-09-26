import React from "react";
import { Link } from "react-router-dom";

const AdminNotification = () => {
    return (
        <div className="bg-gray-200 min-h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-4xl font-semibold mb-8">공지사항 관리</h1>
                <div className="space-y-4 text-lg">
                    <Link to="/admin-notification/list" className="text-blue-500 hover:underline block">
                        <div className="bg-white rounded-lg p-4 shadow-md hover:bg-gray-100">
                            <h2 className="text-xl font-semibold mb-2">공지사항 목록</h2>
                            <p className="text-gray-600">현재 공지사항 목록을 확인합니다.</p>
                        </div>
                    </Link>
                    <Link to="/admin-notification/create" className="text-blue-500 hover:underline block mt-4">
                        <div className="bg-white rounded-lg p-4 shadow-md hover:bg-gray-100">
                            <h2 className="text-xl font-semibold mb-2">공지사항 작성</h2>
                            <p className="text-gray-600">새로운 공지사항을 작성합니다.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminNotification;
