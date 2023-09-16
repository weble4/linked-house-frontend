import React, { useState } from 'react';
import './Private.css';

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUpdate = () => {
    // 사용자 정보를 업데이트할 데이터 객체 생성
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    // 백엔드 API 엔드포인트 설정
    const updateApiUrl = '/api/customers/update'; // 사용자 정보 업데이트 엔드포인트

    // API 호출을 위한 옵션 설정
    const requestOptions = {
      method: 'PATCH', // 업데이트 요청을 보냅니다.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), // JSON 형식으로 데이터 전송
    };

    // 업데이트 요청
    fetch(updateApiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // 업데이트 성공 또는 오류 처리
        console.log('업데이트 결과:', data);
        // 성공 또는 오류 메시지를 처리할 수 있습니다.
        // 탈퇴 버튼을 활성화하거나 다른 작업을 수행합니다.
      })
      .catch((error) => {
        console.error('Update Error:', error);
        // 오류 처리
      });
  };

  const handleWithdrawal = () => {
    // 백엔드 API 엔드포인트 설정
    const withdrawalApiUrl = '/api/customers/withdrawal'; // 계정 탈퇴 엔드포인트
  
    // 탈퇴 요청
    fetch(withdrawalApiUrl, {
      method: 'POST', // POST 요청을 보냅니다.
    })
      .then((response) => response.json())
      .then((data) => {
        // 탈퇴 성공 또는 오류 처리
        console.log('탈퇴 결과:', data);
        // 성공 또는 오류 메시지를 처리할 수 있습니다.
        if (data.success) {
          // 탈퇴 성공 시 추가 동작을 수행할 수 있습니다.
          // 예를 들어 로그아웃 등의 동작을 수행할 수 있습니다.
          alert('계정이 성공적으로 삭제되었습니다.');
          // 로그아웃 등의 동작을 수행하는 함수를 호출하세요.
          // 예를 들어, logout();
        } else {
          // 탈퇴 실패 시 오류 메시지를 표시하거나 다른 처리를 수행하세요.
          alert('탈퇴 요청을 처리할 수 없습니다.');
        }
      })
      .catch((error) => {
        console.error('Withdrawal Error:', error);
        // 오류 처리
      });
  };

  return (
    <div>
      <label>이름: </label>
      <input type="text" value={name} onChange={handleNameChange} className="private-input" />
      <button onClick={handleUpdate}>변경</button>

      <label>이메일: </label>
      <input type="email" value={email} onChange={handleEmailChange} className="private-input" />
      <button onClick={handleUpdate}>변경</button>

      <label>비밀번호: </label>
      <input type="password" value={password} onChange={handlePasswordChange} className="private-input" />
      
      <button onClick={handleUpdate}>변경</button>
      <button onClick={handleWithdrawal}>계정 삭제</button>
    </div>
  );
}

export default Home;

