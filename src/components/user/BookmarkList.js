import React, { useState } from 'react';

function BookmarkList() {
  const [bookmarks, setBookmarks] = useState([]);
  const [newBookmark, setNewBookmark] = useState('');

  const addBookmark = () => {
    if (newBookmark) {
      setBookmarks([...bookmarks, newBookmark]);
      setNewBookmark('');
    }
  };

  const removeBookmark = (index) => {
    const updatedBookmarks = [...bookmarks];
    updatedBookmarks.splice(index, 1);
    setBookmarks(updatedBookmarks);
  };

  return (
    <div>
      <h1>북마크</h1>
      <div>
        <input
          type="text"
          value={newBookmark}
          onChange={(e) => setNewBookmark(e.target.value)}
          placeholder="새 북마크 추가"
        />
        <button onClick={addBookmark}>추가</button>
      </div>
      <ul>
        {bookmarks.map((bookmark, index) => (
          <li key={index}>
            {bookmark}
            <button onClick={() => removeBookmark(index)}>제거</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookmarkList;