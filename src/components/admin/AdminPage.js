import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                if (accessToken) {
                    setIsLoggedIn(true);

                    const headers = {
                        Authorization: `Bearer ${accessToken}`,
                    };

                    const response = await axios.get("/api/admin", { headers });

                    if (response.status === 200) {
                        setUsers(response.data);
                    } else {
                        throw new Error("유저 정보를 불러오지 못했습니다.");
                    }
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="flex justify-center mt-16">
            <div className="grid grid-cols-2 gap-10">
                <button>
                    <Link
                        to="/admin/customers"
                        className={`p-8 bg-white rounded-xl shadow-xl hover:bg-gray-100 h-60 flex flex-col justify-between ${
                            !isLoggedIn && "pointer-events-none opacity-50"
                        }`}
                    >
                        <h2 className="text-2xl font-semibold mb-4">유저 관리</h2>
                    </Link>
                </button>
                <p className="text-lg">유저 관리를 위한 페이지입니다. 여러 유저 관련 정보를 확인하고 관리 할 수 있습니다.</p>
                <button>
                    <Link
                        to="/admin/reviews"
                        className={`p-8 bg-white rounded-xl shadow-xl hover:bg-gray-100 h-60 flex flex-col justify-between ${
                            !isLoggedIn && "pointer-events-none opacity-50"
                        }`}
                    >
                        <h2 className="text-2xl font-semibold mb-4">리뷰 관리</h2>
                    </Link>
                </button>
                <p className="text-lg">리뷰 관리를 위한 페이지입니다. 여러 리뷰 관련 확인하고 관리 할 수 있습니다.</p>
                <button>
                    <Link
                        to="/admin/notifications"
                        className={`p-8 bg-white rounded-xl shadow-xl hover:bg-gray-100 h-60 flex flex-col justify-between ${
                            !isLoggedIn && "pointer-events-none opacity-50"
                        }`}
                    >
                        <h2 className="text-2xl font-semibold mb-4">공지사항 관리</h2>
                    </Link>
                </button>
                <p className="text-lg">공지사항 정보를 위한 페이지입니다. 공지사항을 관리 할 수 있습니다.</p>
            </div>
        </div>
    );
};

export default AdminPage;
