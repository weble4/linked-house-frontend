import React from "react";
import { Link } from "react-router-dom";

const AdminNotification = () => {
    return (
        <div>
            <h1>공지사항 관리 페이지</h1>
            <div>
                {/* 공지사항 목록 페이지로 이동하는 버튼 */}
                <Link to="/admin-notification/list">공지사항 목록</Link>
                <br />
                {/* 공지사항 작성 페이지로 이동하는 버튼 */}
                <Link to="/admin-notification/create">공지사항 작성</Link>
                <br />
            </div>
        </div>
    );
};

export default AdminNotification;
