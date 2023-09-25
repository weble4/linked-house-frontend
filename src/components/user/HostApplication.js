import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HostApplication.css"; // CSS 파일을 import

const HostApplication = () => {
  const [isHost, setIsHost] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleHostApplication = () => {
    // 호스트 신청 로직을 처리하고 성공적으로 호스트가 되었다면 setIsHost(true)로 설정하세요.
    // 예를 들어, API 요청을 보내고 응답을 받아서 호스트 상태를 업데이트할 수 있습니다.
    // 호스트로 승인되었다면 setIsHost(true)로 상태를 변경하고 모달 창을 열어줍니다.
    // 호스트로 승인되지 않았다면 오류 메시지를 표시하거나 다른 처리를 수행합니다.

    // 호스트로 승인되면 모달을 열어줍니다.
    setIsHost(true);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    // 모달을 닫고 호스트 페이지로 이동합니다.
    setIsModalOpen(false);
    navigate("/host-settings"); // 호스트 페이지로 이동
  };

  return (
    <div>
      {/* 호스트 신청 버튼 */}
      {!isHost ? (
        <button onClick={handleHostApplication} className="host-application-button">
          호스트 신청하기
        </button>
      ) : (
        <p>호스트로 승인되었습니다. 호스트 페이지로 이동합니다.</p>
      )}

      {/* 호스트 승인 모달 */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleModalClose}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostApplication;