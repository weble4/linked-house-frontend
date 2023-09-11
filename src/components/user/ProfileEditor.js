import React, { useState } from 'react';

function ProfileEditor() {
  const [name, setName] = useState(''); // 이름 상태
  const [profileText, setProfileText] = useState(''); // 프로필 내용 상태

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProfileTextChange = (e) => {
    setProfileText(e.target.value);
  };

  const handleSave = () => {
    // 이곳에서 사용자 프로필 정보를 서버에 저장하는 로직을 추가합니다.
    console.log('이름:', name);
    console.log('자기소개:', profileText);
  };

  return (
    <div>
      <h1>프로필</h1>
      <div>
        <label>이름:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>자기소개:</label>
        <textarea value={profileText} onChange={handleProfileTextChange} />
      </div>
      <button onClick={handleSave}>저장</button>
    </div>
  );
}

export default ProfileEditor;