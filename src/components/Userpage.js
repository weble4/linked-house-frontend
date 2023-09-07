import React from 'react';
import { Link } from "react-router-dom";

function App() {
  // 8개의 네모 블록을 담을 배열을 생성합니다.
  
// Define an array of menu items
  const menuItems = [
    { to: '/private', label: '개인정보' },
    { to: '/message', label: '메시지' },
    { to: '/profile', label: '프로필' },
    { to: '/reservation', label: '예약 확인' },
    { to: '/bookmark', label: '북마크' },
    { to: '/review', label: '리뷰' },
    { to: '/notify', label: '알림' },
    { to: '/host', label: '호스트 신청' },
  ];

  // Generate menu items using map
  const menuItemsJSX = menuItems.map((menuItem, index) => (
    <div key={index} className="square">
      <Link to={menuItem.to}>
        {menuItem.label}
      </Link>
    </div>
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