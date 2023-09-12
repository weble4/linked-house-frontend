import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  // 클릭 이벤트 핸들러 함수 정의
  const handleSquareClick = (menuItem) => {
    // 클릭된 네모 블록에 따라 다른 동작을 수행할 수 있습니다.
    console.log(`클릭된 네모 블록: ${menuItem.label}`);

    // 여기에서 원하는 동작을 추가하십시오.
  };

  // 8개의 네모 블록을 담을 배열을 생성합니다.
  // Define an array of menu items
  const menuItems = [
    { label: '개인정보', path: '/private', description: '개인정보 및 연락처' },
    { label: '메시지', path: '/message', description: '메시지 채팅창' },
    { label: '프로필', path: '/profile', description: '프로필 설정 및 공개여부' },
    { label: '예약 확인', path: '/reservation', description: '예약정보 확인하기' },
    { label: '북마크', path: '/bookmark', description: '즐겨찾기한 숙소 정보 확인하기' },
    { label: '리뷰', path: '/review', description: '직접 작성한 리뷰 관리하기' },
    { label: '알림', path: '/notify', description: '알림 설정 및 확인하기' },
    { label: '호스트 신청', path: '/host', description: '호스트로서 자신의 숙소 등록하기' },
  ];

  // Generate menu items using map
  const menuItemsJSX = menuItems.map((menuItem, index) => (
    <Link key={index} to={menuItem.path} className="square" onClick={() => handleSquareClick(menuItem)}>
       <div>
        <div className="square-label">{menuItem.label}</div>
        <div className="square-description small">{menuItem.description}</div> {/* 작은 글씨 적용 */}
      </div>
    </Link>
  ));

  // Split menu items into rows
  const rows = [];
  for (let i = 0; i < menuItemsJSX.length; i += 3) {
    const rowItems = menuItemsJSX.slice(i, i + 3);
    rows.push(
      <div key={i / 3} className="row">
        {rowItems}
      </div>
    );
  }

  return (
    <div className="container">
      {rows}
    </div>
  );
}


export default App;

