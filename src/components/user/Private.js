import React, { useState } from 'react';
import './Private.css';

function Private() {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangeEmail = () => {
    // 이메일 변경을 위한 요청을 서버로 전송
    fetch('/api/change-email', {
      method: 'POST',
      body: JSON.stringify({ newEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // 성공적으로 변경되면 메시지 표시 또는 리디렉션
          alert('이메일이 변경되었습니다.');
        } else {
          // 오류 처리
          alert('이메일 변경에 실패했습니다.');
        }
      });
  };

  const handleChangePassword = () => {
    // 비밀번호 변경을 위한 요청을 서버로 전송
    fetch('/api/change-password', {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // 성공적으로 변경되면 메시지 표시 또는 리디렉션
          alert('비밀번호가 변경되었습니다.');
        } else {
          // 오류 처리
          alert('비밀번호 변경에 실패했습니다.');
        }
      });
  };

  const handleDeleteAccount = () => {
    // 계정 삭제를 위한 요청을 서버로 전송
    fetch('/api/delete-account', {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // 성공적으로 삭제되면 메시지 표시 또는 리디렉션
          alert('계정이 삭제되었습니다.');
        } else {
          // 오류 처리
          alert('계정 삭제에 실패했습니다.');
        }
      });
  };

  return (
    <div className="centered-container"> {/* 수정된 클래스를 적용합니다 */}
      <h2 className="centered-title">계정 설정</h2>
      <div className="form-group">
        <h3>이메일 변경</h3>
        <input
          type="email"
          placeholder="새 이메일 주소"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button onClick={handleChangeEmail}>변경</button>
      </div>
      <div className="form-group">
        <h3>비밀번호 변경</h3>
        <input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>변경</button>
      </div>
      <div className="form-group">
        <h3>계정 삭제</h3>
        <button onClick={handleDeleteAccount}>삭제</button>
      </div>
    </div>
  );
}

export default Private;