import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UserDetailPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/admin/customers/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error("유저 정보 조회에 실패했습니다.", error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleSuspendUser = async () => {
        try {
            await axios.post(`http://localhost:8080/api/customers/suspend/${userId}`);
            navigate("/");
        } catch (error) {
            console.error("유저 정지에 실패했습니다.", error);
        }
    };

    return (
        <div className="mt-16">
            {userData ? (
                <>
                    <h2 className="text-2xl font-semibold mb-4">유저 정보</h2>
                    <p>유저 ID: {userData.id}</p>
                    <p>유저 이메일: {userData.customer_email}</p>
                    <p>가입일: {userData.created_at}</p>
                    <p>수정일: {userData.updated_at}</p>
                    <p>역할: {userData.role}</p>
                    <p>정지 여부: {userData.suspend}</p>

                    <button onClick={handleSuspendUser} className="mt-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                        유저 정지
                    </button>
                </>
            ) : (
                <p>유저 정보를 불러오는 중입니다...</p>
            )}
        </div>
    );
};

export default UserDetailPage;
