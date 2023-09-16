import React, { useState } from 'react';

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
    // 여기서 실제로 사용자 정보를 업데이트하는 API 호출 등을 수행합니다.
    // name, email, password 상태를 사용하여 업데이트를 처리합니다.
  };

  return (
    <div>
      <h1>개인정보</h1>
      <div>
        <label>이름: </label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>이메일: </label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>비밀번호: </label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
    
  );
}

export default Home;