import React, { useState } from 'react';
import axios from 'axios';

function HouseUpdateForm() {
  const [houseData, setHouseData] = useState({
    id: '', // 업데이트할 집의 ID
    address: '', // 새 주소
    numberOfRooms: 0, // 변경된 방의 수
    // 필요한 다른 필드 추가
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHouseData({ ...houseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // House 업데이트 API 엔드포인트 URL
    const apiUrl = `/house/${houseData.id}`;
    
    // axios를 사용하여 업데이트 요청을 보냅니다.
    axios
      .put(apiUrl, houseData)
      .then((response) => {
        // 업데이트가 성공한 경우
        console.log('집 정보가 업데이트되었습니다.', response.data);
      })
      .catch((error) => {
        // 업데이트가 실패한 경우
        console.error('집 정보 업데이트 중 오류 발생:', error);
      });
  };

  return (
    <div>
      <h2>집 정보 업데이트</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={houseData.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>새 주소:</label>
          <input
            type="text"
            name="address"
            value={houseData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>변경된 방의 수:</label>
          <input
            type="number"
            name="numberOfRooms"
            value={houseData.numberOfRooms}
            onChange={handleChange}
          />
        </div>
        {/* 필요한 다른 입력 필드 추가 */}
        <div>
          <button type="submit">업데이트</button>
        </div>
      </form>
    </div>
  );
}

export default HouseUpdateForm;
