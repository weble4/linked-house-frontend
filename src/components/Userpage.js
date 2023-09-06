import React from 'react';
import { Link } from "react-router-dom";

function App() {
  // 8개의 네모 블록을 담을 배열을 생성합니다.
  const squares = [];

  for (let i = 1; i <= 1; i++) {
    squares.push( <div key={i} className="square">
        <Link to={`/private`}>
          개인정보
        </Link>
      </div>
    );
  }

  for (let i = 1; i <= 1; i++) {
    squares.push( <div key={i} className="square">
        <Link to={`/message`}>
          메시지
        </Link>
      </div>
    );
  }
  
  for (let i = 1; i <= 1; i++) {
    squares.push( <div key={i} className="square">
        <Link to={`/profile`}>
          프로필
        </Link>
      </div>
    );
  }

  for (let i = 1; i <= 1; i++) {
    squares.push( <div key={i} className="square">
        <Link to={`/reservation`}>
          예약 확인
        </Link>
      </div>
    );
  }

  for (let i = 1; i <= 1; i++) {
    squares.push( <div key={i} className="square">
        <Link to={`/bookmark`}>
          북마크
        </Link>
      </div>
    );
  }

  for (let i = 1; i <= 1; i++) {
    squares.push( <div key={i} className="square">
        <Link to={`/review`}>
          리뷰
        </Link>
      </div>
    );
  }

  for (let i = 1; i <= 1; i++) {
    squares.push( <div key={i} className="square">
        <Link to={`/notify`}>
          알림
        </Link>
      </div>
    );
  }

  for (let i = 1; i <= 1; i++) {
    squares.push( <div key={i} className="square">
        <Link to={`/host`}>
          호스트 신청
        </Link>
      </div>
    );
  }

  const rows = [];
    for (let i = 0; i < 3; i++) {
      const startIndex = i * 3;
      const endIndex = startIndex + 3;
      const row = squares.slice(startIndex, endIndex);
      rows.push(
        <div key={i} className="row">
          {row}
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