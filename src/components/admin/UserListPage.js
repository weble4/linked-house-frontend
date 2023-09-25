import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserListPage = () => {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/admin/customers");
                setUserList(response.data.content || []);
            } catch (error) {
                console.error("유저 목록 조회에 실패했습니다.", error);
            }
        };

        fetchUserList();
    }, []);

    const handleUserClick = (customerId) => {
        navigate(`/admin-customer/${customerId}`);
    };

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-4">전체 유저 목록</h2>
            <ul className="list-disc pl-4">
                {userList.length === 0 ? (
                    <p>데이터 로딩 중...</p>
                ) : (
                    userList.map((customer) => (
                        <li
                            key={customer.customerId}
                            onClick={() => handleUserClick(customer.customerId)}
                            style={{ cursor: "pointer" }}
                            className="text-blue-500 hover:underline mb-2"
                        >
                            {customer.customerId}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default UserListPage;
