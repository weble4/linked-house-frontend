import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HostApplication.css"; // CSS 파일을 import

const HostApplication = () => {
  const [isHost, setIsHost] = useState(false);
  const navigate = useNavigate();

  const handleHostApplication = () => {
    // 호스트 신청 로직을 처리하고 성공적으로 호스트가 되었다면 setIsHost(true)로 설정하세요.
    // 예를 들어, API 요청을 보내고 응답을 받아서 호스트 상태를 업데이트할 수 있습니다.
    // 호스트로 승인되었다면 setIsHost(true)로 상태를 변경합니다.
    // 호스트로 승인되지 않았다면 오류 메시지를 표시하거나 다른 처리를 수행합니다.

    // 호스트로 승인되면 확인 팝업을 표시합니다.
    const isApproved = true; // 호스트 승인 여부 (API 요청 결과 등을 기반으로 설정)

    if (isApproved) {
      // 호스트로 승인되었을 때
      setIsHost(true);

      // 확인 팝업을 표시합니다.
      const isConfirmed = window.confirm("호스트로 승인하시겠습니까?");
      if (isConfirmed) {
        // 확인 버튼을 클릭하면 호스트 페이지로 이동합니다.
        navigate("/host-settings"); // 호스트 페이지로 이동
      }
    } else {
      // 호스트로 승인되지 않았을 때
      // 오류 메시지를 표시하거나 다른 처리를 수행합니다.
    }
  };

  return (
    <div className="host-application-container">
      {/* 호스트 신청 버튼 */}
        <button onClick={handleHostApplication} className="host-application-button">
          호스트 신청하기
        </button>
    </div>
  );
};

export default HostApplication;