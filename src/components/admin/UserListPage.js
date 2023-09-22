import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserListPage = () => {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/admin/customers");
                setUserList(response.data);
            } catch (error) {
                console.error("유저 목록 조회에 실패했습니다.", error);
            }
        };

        fetchUserList();
    }, []);

    const handleUserClick = (userId) => {
        navigate(`/admin-customer/${userId}`);
    };

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-4">전체 유저 목록</h2>
            <ul>
                {userList.map((user) => (
                    <li
                        key={user.id}
                        onClick={() => handleUserClick(user.id)}
                        style={{ cursor: "pointer" }}
                        className="text-blue-500 hover:underline"
                    >
                        {user.id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserListPage;
