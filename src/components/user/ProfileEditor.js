import React, { useState } from 'react';
import './ProfileEditor.css';

function ProfileEditor() {
  const [name, setName] = useState(''); // 이름 상태
  const [profileText, setProfileText] = useState(''); // 프로필 내용 상태
  const [birthdate, setBirthdate] = useState(''); // 생년월일 상태
  const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 상태
  const [gender, setGender] = useState(''); // 성별 상태
  const [isProfilePublic, setIsProfilePublic] = useState(false); // 프로필 공개 여부 상태

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProfileTextChange = (e) => {
    setProfileText(e.target.value);
  };

  const handleBirthdateChange = (e) => {
    setBirthdate(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleProfilePublicChange = () => {
    setIsProfilePublic(!isProfilePublic);
  };

  const handleSave = () => {
    // 이곳에서 사용자 프로필 정보를 서버에 저장하는 로직을 추가합니다.
    console.log('이름:', name);
    console.log('자기소개:', profileText);
    console.log('생년월일:', birthdate);
    console.log('전화번호:', phoneNumber);
    console.log('성별:', gender);
    console.log('프로필 공개 여부:', isProfilePublic);
  };

  return (
    <div>
      <h1>프로필</h1>
      <div className="form-group">
        <label>이름:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div className="form-group">
        <label>자기소개:</label>
        <textarea value={profileText} onChange={handleProfileTextChange} />
      </div>
      <div className="form-group">
        <label>생년월일:</label>
        <input type="text" value={birthdate} onChange={handleBirthdateChange} />
      </div>
      <div className="form-group">
        <label>전화번호:</label>
        <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
      </div>
      <div className="form-group">
        <label>성별:</label>
        <input type="text" value={gender} onChange={handleGenderChange} />
      </div>
      <div className="form-group">
        <label>프로필 공개 여부:</label>
        <input type="checkbox" checked={isProfilePublic} onChange={handleProfilePublicChange} />
      </div>
      <button onClick={handleSave}>저장</button>
    </div>
  );
}

export default ProfileEditor;