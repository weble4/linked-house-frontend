import React from "react";
import { Link } from "react-router-dom";

const HostPages = () => {
  return (
    <div className="flex justify-center mt-16">
      <div className="grid grid-cols-2 gap-10">
        <Link
          to="/house-management"
          className="p-8 bg-white rounded-xl shadow-xl hover:bg-gray-100 h-60 flex flex-col justify-between"
        >
          <h2 className="text-2xl font-semibold mb-4">하우스 관리</h2>
          <p className="text-lg">
            숙박 관리를 위한 페이지입니다. 여러가지 정보를 확인하고 관리할 수
            있습니다.
          </p>
        </Link>
        <Link
          to="/reservation-management"
          className="p-8 bg-white rounded-xl shadow-xl hover:bg-gray-100 h-60 flex flex-col justify-between"
        >
          <h2 className="text-2xl font-semibold mb-4">예약 관리</h2>
          <p className="text-lg">
            예약 관리를 위한 페이지입니다. 예약 상태를 확인하고 예약을 처리할 수
            있습니다.
          </p>
        </Link>
        <Link
          to="/house-regist"
          className="p-8 bg-white rounded-xl shadow-xl hover:bg-gray-100 h-60 flex flex-col justify-between"
        >
          <h2 className="text-2xl font-semibold mb-4">하우스 등록</h2>
          <p className="text-lg">
            숙박업소 정보를 작성하는 페이지입니다. 숙소의 상세한 정보를
            입력하세요.
          </p>
        </Link>
        <Link
          to="/reservation-settings"
          className="p-8 bg-white rounded-xl shadow-xl hover:bg-gray-100 h-60 flex flex-col justify-between"
        >
          <h2 className="text-2xl font-semibold mb-4">예약 설정</h2>
          <p className="text-lg">
            숙박업소 관련 예약 설정을 위한 페이지입니다. 하우스 마다 관리 할
            예약 방법을 설정하세요.
          </p>
        </Link>
        <Link
          to="/house-update"
          className="p-8 bg-white rounded-xl shadow-xl hover:bg-gray-100 h-60 flex flex-col justify-between"
        >
          <h2 className="text-2xl font-semibold mb-4">하우스 정보 수정</h2>
          <p className="text-lg">
            하우스 정보 수정 페이지 입니다. 당신의 하우스를 최신 상태로 관리하여
            주세요.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default HostPages;
