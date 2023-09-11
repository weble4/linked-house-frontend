import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ setShowModal }) => {
    // 인원수 등 조건 증감 관련
    const [bed, setBed] = useState(1);
    const [room, setRoom] = useState(1);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [minPrice, setMinPrice] = useState(0);
    const [filterKeyword, setFilterKeyword] = useState("");

    const bedMinusCount = () => {
        if (bed === 1) {
            setBed(bed);
        } else {
            setBed(bed - 1);
        }
    };

    const bedPlusCount = () => {
        setBed(bed + 1);
    };

    const roomMinusCount = () => {
        if (room === 1) {
            setRoom(room);
        } else {
            setRoom(room - 1);
        }
    };

    const roomPlusCount = () => {
        setRoom(room + 1);
    };

    useEffect(() => {
        const roomResult = document.querySelector("#room");
        const bedResult = document.querySelector("#bed");
        if (roomResult) {
            roomResult.textContent = room;
        }
        if (bedResult) {
            bedResult.textContent = bed;
        }
    }, [room, bed]);

    // 결과창으로 이동하는 라우터
    const navigate = useNavigate();

    // 서버로 보내주기
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:8080/api/house";
        const params = `?filterKeyword=${filterKeyword}&room=${room}&bed=${bed}&maxPrice=${maxPrice}&minPrice=${minPrice}`;

        try {
            const response = await axios.get(url + params, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = response.data;
            console.log("반환 데이터 : ", data);

            const searchResult = `/api/house/?filterKeyword=${filterKeyword}&room=${room}&bed=${bed}&maxPrice=${maxPrice}&minPrice=${minPrice}`;
            navigate(searchResult);
        } catch (error) {
            console.log("검색에 실패했습니다.");
        }
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            숙박 검색
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <div>
                                <span className="mx-8">지역 선택</span>
                                <select
                                    className="px-16 py-3 border rounded-md"
                                    id="filterKeyword"
                                    onChange={(e) => setFilterKeyword(e.target.value)}
                                    value={filterKeyword}
                                >
                                    <option key="seoul" value="seoul">
                                        서울
                                    </option>
                                    <option key="sejong" value="sejong">
                                        세종
                                    </option>
                                    <option key="incheon" value="incheon">
                                        인천
                                    </option>
                                    <option key="daejeon" value="daejeon">
                                        대전
                                    </option>
                                    <option key="gwangju" value="gwangju">
                                        광주
                                    </option>
                                    <option key="busan" value="busan">
                                        부산
                                    </option>
                                    <option key="daegu" value="daegu">
                                        대구
                                    </option>
                                    <option key="ulsan" value="ulsan">
                                        울산
                                    </option>
                                    <option key="gyeonggido" value="gyeonggido">
                                        경기도
                                    </option>
                                    <option key="gangwondo" value="gangwondo">
                                        강원도
                                    </option>
                                    <option key="chungcheongdo" value="chungcheongdo">
                                        충청도
                                    </option>
                                    <option key="jeollado" value="jeollado">
                                        전라도
                                    </option>
                                    <option key="gyeongsangdo" value="gyeongsangdo">
                                        경상도
                                    </option>
                                    <option key="jeju" value="jeju">
                                        제주도
                                    </option>
                                </select>
                            </div>
                            <div>
                                <span className="mx-8">방 갯수</span>

                                <button className="plus text-black-500 text-lg font-bold px-2 py-2" onClick={roomPlusCount} type="button">
                                    +
                                </button>
                                <span id="room" className="w-3 h-3">
                                    1
                                </span>
                                <button className="plus text-black-500 text-lg font-bold px-2 py-2" onClick={roomMinusCount} type="button">
                                    -
                                </button>
                            </div>
                            <div>
                                <span className="mx-8">침대 갯수</span>
                                <button className="plus text-black-500 text-lg font-bold px-2 py-2" onClick={bedPlusCount} type="button">
                                    +
                                </button>
                                <span id="bed" className="w-3 h-3">
                                    1
                                </span>
                                <button className="plus text-black-500 text-lg font-bold px-2 py-2" onClick={bedMinusCount} type="button">
                                    -
                                </button>
                            </div>
                            <div>
                                <span className="mx-8">최소 가격</span>
                                <input
                                    type="number"
                                    id="minPrice"
                                    className="px-3 py-3 border rounded-md"
                                    placeholder="0"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <span className="mx-8">최대 가격</span>
                                <input
                                    type="number"
                                    id="maxPrice"
                                    className="px-3 py-3 border rounded-md"
                                    placeholder="0"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                취소
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={(e) => handleSubmit(e)}
                            >
                                검색
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default SearchModal;
