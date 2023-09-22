import React, { useState, useEffect } from 'react';
import './ChatApp.css';

function ChatApp({ userRole }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem(`${userRole}ChatMessages`)) || [];
    setMessages(storedMessages);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem(`${userRole}ChatMessages`, JSON.stringify(messages));
  }, [messages, userRole]);

  const addMessage = () => {
    if (newMessage.trim() === '') {
      return;
    }
    const updatedMessages = [...messages, { text: newMessage, sender: userRole }];
    setMessages(updatedMessages);
    setNewMessage('');
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className={`chat-container ${userRole === 'guest' ? 'guest' : 'host'}`}>
      <div className="message-list">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === userRole ? 'self' : 'other'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={newMessage}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addMessage();
            }
          }}
        />
        <button onClick={addMessage}>전송</button>
      </div>
    </div>
  );
}

export default ChatApp;