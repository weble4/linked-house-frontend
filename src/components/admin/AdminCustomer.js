import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserListPage from "./UserListPage";

const AdminCustomer = () => {
    const [users, setUsers] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [customerId, setCustomerId] = useState("");

    const handleAllUsers = () => {
        axios
            .get("http://localhost:8080/api/admin/customers")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("유저 조회에 실패했습니다.", error);
            });
    };

    const handleSingleUser = () => {
        axios
            .get("http://localhost:8080/api/admin/customers/${customerId}")
            .then((response) => {
                setCustomer(response.data);
            })
            .catch((error) => {
                console.error("유저 조회에 실패했습니다.", error);
            });
    };

    useEffect(() => {
        handleAllUsers();
    }, []);

    const handleSuspendUser = () => {
        if (customerId) {
            fetch(`http://localhost:8080/api/admin/customers/suspend/${customerId}`, {
                method: "POST",
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.text();
                    } else {
                        throw new Error("유저 정지에 실패했습니다.");
                    }
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <div className="flex justify-center mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <Link to="/admin-customer/all" className="p-8 bg-white rounded-xl shadow-xl hover:bg-gray-100 block text-center">
                    <h2 className="text-2xl font-semibold mb-4">유저 전체 조회</h2>
                    <p className="text-lg">모든 유저를 조회하는 페이지로 이동합니다.</p>
                </Link>

                <div>
                    <input
                        type="text"
                        placeholder="유저 ID를 입력하세요"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <button onClick={handleSingleUser} className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 block">
                        개별 조회
                    </button>
                    <button onClick={handleSuspendUser} className="mt-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 block">
                        정지
                    </button>
                </div>

                <div className="col-span-3">
                    {customer ? (
                        <>
                            <h2 className="text-2xl font-semibold mb-4">개별 유저 정보</h2>
                            <p>유저 ID: {customer.id}</p>
                            <p>유저 이름: {customer.username}</p>
                        </>
                    ) : (
                        <p>개별 유저 정보를 조회하려면 유저 ID를 입력하고 '개별 조회' 버튼을 클릭하세요.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminCustomer;
