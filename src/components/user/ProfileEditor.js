import React, { useState } from 'react';
import './ProfileEditor.css';

function ProfileEditor() {
  // 초기 상태를 로컬 스토리지에서 불러오기
  const initialProfile = JSON.parse(localStorage.getItem('customerProfile')) || {
    customer: '',
    nickname: '',
    gender: '',
    birthDay: '',
    phoneNum: '',
    ispublicAt: false,
  };

  const [CustomerProfile, setCustomerProfile] = useState(initialProfile);
  const [isSaved] = useState(false);

  // const accessToken = localStorage.getItem('accessToken');

    // 사용자의 액세스 토큰을 가져오는 로직 (예: 로그인 후에 토큰을 저장하고 이곳에서 가져옴)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerProfile({
      ...CustomerProfile,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCustomerProfile({
      ...CustomerProfile,
      [name]: checked,
    });
  };

  const handleSave = async () => {
    // 변경된 프로필 정보만 서버에 전송
    const updateProfile = {
      customer: CustomerProfile.customer,
      nickname: CustomerProfile.nickname,
      gender: CustomerProfile.gender,
      birthDay: CustomerProfile.birthDay,
      phoneNum: CustomerProfile.phoneNum,
      ispublicAt: CustomerProfile.ispublicAt,
    };

    alert('프로필 정보 저장에 성공했습니다.');

    // 브라우저의 로컬 스토리지에도 저장
    localStorage.setItem('customerProfile', JSON.stringify(updateProfile));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">프로필</h1>
      <div className="form-group">
        <label className="profile-label">이름:</label>
        <input
          className="profile-input"
          type="text"
          name="customer"
          value={CustomerProfile.customer}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <label className="profile-label">닉네임:</label>
        <input
          className="profile-input"
          type="text"
          name="nickname"
          value={CustomerProfile.nickname}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
         <label className="profile-label">성별:</label>
        <div className="gender-options">
          <label className="gender-label">
            <input
              type="radio"
              name="gender"
              value="남성"
              checked={CustomerProfile.gender === '남성'}
              onChange={handleInputChange}
            />
            남성
          </label>
          <label className="gender-label">
            <input
              type="radio"
              name="gender"
              value="여성"
              checked={CustomerProfile.gender === '여성'}
              onChange={handleInputChange}
            />
            여성
          </label>
        </div>
        <label className="profile-label">생년월일:</label>
        <input
          className="profile-input"
          type="text"
          name="birthDay"
          value={CustomerProfile.birthDay}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <label className="profile-label">전화번호:</label>
        <input
          className="profile-input"
          type="text"
          name="phoneNum"
          value={CustomerProfile.phoneNum}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <label className="profile-label">프로필 공개 여부:</label>
        <input
          type="checkbox"
          name="ispublicAt"
          checked={CustomerProfile.ispublicAt}
          onChange={handleCheckboxChange}
          onKeyPress={handleKeyPress}
        />
        <button className="save-button" onClick={handleSave}>
          저장
        </button>
      </div>
      {isSaved && (
        <div className="saved-message">
          <h2>현재 프로필 정보</h2>
          <p>이름: {CustomerProfile.customer}</p>
          <p>닉네임: {CustomerProfile.nickname}</p>
          <p>성별: {CustomerProfile.gender}</p>
          <p>생년월일: {CustomerProfile.birthDay}</p>
          <p>전화번호: {CustomerProfile.phoneNum}</p>
          <p>프로필 공개 여부: {CustomerProfile.ispublicAt ? '공개' : '비공개'}</p>
        </div>
      )}
    </div>
  );
}

export default ProfileEditor;