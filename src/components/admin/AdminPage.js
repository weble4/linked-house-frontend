import React from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
    return (
        <div className="flex justify-center mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <Link to="/admin-notification" className="p-8 bg-white rounded-xl shadow-xl hover:bg-gray-100 block text-center">
                        <h2 className="text-2xl font-semibold mb-4">공지사항 관리</h2>
                        <p className="text-lg">공지사항 정보를 위한 페이지입니다. 공지사항을 관리 할 수 있습니다.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
