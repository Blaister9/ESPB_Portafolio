// frontend/src/pages/ChatPage.js
import React from 'react';
import ChatWebSocket from '../../components/features/Chat/ChatWebSocket';

const ChatPage = () => {
    return (
        <div>
            <h1>Conversación en Tiempo Real</h1>
            <ChatWebSocket />
        </div>
    );
};

export default ChatPage;
