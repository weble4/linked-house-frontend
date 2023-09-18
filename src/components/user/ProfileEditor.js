import React, { useState } from 'react';
import './ProfileEditor.css';

function ProfileEditor() {
  const [name, setName] = useState('');
  const [profileText, setProfileText] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [isProfilePublic, setIsProfilePublic] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
    // 저장 로직 추가

    // 저장 성공 시 isSaved 상태를 true로 설정합니다.
    setIsSaved(true);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">프로필</h1>
      <div className="form-group">
        <label className="profile-label">이름:</label>
        <input className="profile-input" type="text" value={name} onChange={handleNameChange} />
        <label className="profile-label">자기소개:</label>
        <textarea className="profile-input" value={profileText} onChange={handleProfileTextChange} />
        <label className="profile-label">생년월일:</label>
        <input className="profile-input" type="text" value={birthdate} onChange={handleBirthdateChange} />
        <label className="profile-label">전화번호:</label>
        <input className="profile-input" type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
        <label className="profile-label">성별:</label>
        <div className="gender-container">
          <label className="gender-label" htmlFor="male">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={handleGenderChange}
            />
            남성
          </label>

          <label className="gender-label" htmlFor="female">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={handleGenderChange}
            />
            여성
          </label>
        </div>
        <label className="profile-label">프로필 공개 여부:</label>
        <input type="checkbox" checked={isProfilePublic} onChange={handleProfilePublicChange} />
        <button className="save-button" onClick={handleSave}>저장</button>
      </div>
      {isSaved && (
        <div className="saved-message">
          <h2>현재 프로필 정보</h2>
          <p>이름: {name}</p>
          <p>자기소개: {profileText}</p>
          <p>생년월일: {birthdate}</p>
          <p>전화번호: {phoneNumber}</p>
          <p>성별: {gender}</p>
          <p>프로필 공개 여부: {isProfilePublic ? '공개' : '비공개'}</p>
        </div>
      )}
    </div>
  );
}

export default ProfileEditor;
