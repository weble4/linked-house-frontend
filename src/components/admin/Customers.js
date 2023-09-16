import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Customers = ({ isLoggedIn }) => {
    const [customers, setCustomers] = useState([]);
    const [customer_id, setCustomerId] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (!isLoggedIn) return; //로그인상태가 아니면 데이터 X

        const fetchData = async () => {
            try {
                const response = await fetch("/api/admin/customers");
                if (response.status === 200) {
                    const data = await response.json();
                    setCustomers(data);
                } else {
                    throw new Error("유저 목록을 불러오지 못했습니다.");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [isLoggedIn]);

    const handleViewAllUsers = () => {
        console.log(customers);
    };

    const handleViewUser = () => {
        if (customer_id) {
            history.push(`/admin/customers/${customer_id}`); // 페이지 이동 처리
        }
    };

    const handleSuspendUser = () => {
        if (customer_id) {
            fetch(`/api/admin/customers/suspend/${customer_id}`, {
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

    const handleCustomerIdChange = (event) => {
        setCustomerId(event.target.value);
    };

    return (
        <div>
            <h1>유저 관리 페이지</h1>
            <input type="text" placeholder="고객 ID 입력" value={customer_id} onChange={handleCustomerIdChange} />

            <div className="mt-6 flex justify-center items-center space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleViewAllUsers} disabled={customers.length === 0}>
                    유저 전체 조회
                </button>

                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleViewUser} disabled={!customer_id}>
                    유저 개별 조회
                </button>

                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSuspendUser} disabled={!customer_id}>
                    유저 정지
                </button>
            </div>
        </div>
    );
};

export default Customers;
