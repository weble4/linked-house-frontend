import React, { useState, useEffect } from 'react';
import './ProfileEditor.css';

function ProfileEditor() {
  // 이전에 저장된 프로필 데이터를 로컬 스토리지에서 가져옵니다.
  const storedProfile = JSON.parse(localStorage.getItem('profile')) || {};

  const [name, setName] = useState(storedProfile.name || '');
  const [profileText, setProfileText] = useState(storedProfile.profileText || '');
  const [birthdate, setBirthdate] = useState(storedProfile.birthdate || '');
  const [phoneNumber, setPhoneNumber] = useState(storedProfile.phoneNumber || '');
  const [gender, setGender] = useState(storedProfile.gender || '');
  const [isProfilePublic, setIsProfilePublic] = useState(storedProfile.isProfilePublic || false);
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  // 컴포넌트가 업데이트될 때마다 현재 프로필 데이터를 로컬 스토리지에 저장합니다.
  useEffect(() => {
    localStorage.setItem(
      'profile',
      JSON.stringify({
        name,
        profileText,
        birthdate,
        phoneNumber,
        gender,
        isProfilePublic,
      })
    );
  }, [name, profileText, birthdate, phoneNumber, gender, isProfilePublic]);

  return (
    <div className="profile-container">
      <h1 className="profile-title">프로필</h1>
      <div className="form-group">
        <label className="profile-label">이름:</label>
        <input
          className="profile-input"
          type="text"
          value={name}
          onChange={handleNameChange}
          onKeyPress={handleKeyPress} // 엔터 키 이벤트 처리
        />
        <label className="profile-label">자기소개:</label>
        <textarea
          className="profile-input"
          value={profileText}
          onChange={handleProfileTextChange}
          onKeyPress={handleKeyPress} // 엔터 키 이벤트 처리
        />
        <label className="profile-label">생년월일:</label>
        <input
          className="profile-input"
          type="text"
          value={birthdate}
          onChange={handleBirthdateChange}
          onKeyPress={handleKeyPress} // 엔터 키 이벤트 처리
        />
        <label className="profile-label">전화번호:</label>
        <input
          className="profile-input"
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          onKeyPress={handleKeyPress} // 엔터 키 이벤트 처리
        />
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
        <input
          type="checkbox"
          checked={isProfilePublic}
          onChange={handleProfilePublicChange}
          onKeyPress={handleKeyPress} // 엔터 키 이벤트 처리
        />
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