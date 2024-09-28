// src/pages/ChatPage/ChatPage.js
import React from 'react';
import ChatWebSocket from '../../components/features/Chat/ChatWebSocket';

const ChatPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
        Conversación en Tiempo Real
      </h1>
      <div className="max-w-3xl mx-auto">
        <ChatWebSocket />
      </div>
    </div>
  );
};

export default ChatPage;
