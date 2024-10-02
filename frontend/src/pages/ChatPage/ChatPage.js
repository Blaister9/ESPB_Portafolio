///home/epaz/Documentos/2_Conversation/frontend/src/pages/ChatPage/ChatPage.js
import React from 'react';
import FloatingSection from '../../components/common/FloatingSection'; // Usamos el FloatingSection para mantener el diseño flotante
import { motion } from 'framer-motion';
import ChatWebSocket from '../../components/features/Chat/ChatWebSocket';

const ChatPage = () => {
  return (
    <FloatingSection>
      <div className="container mx-auto p-8">
        <motion.h1
          className="text-5xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
        >
          Conversación en Tiempo Real
        </motion.h1>
        
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <ChatWebSocket />
        </motion.div>
      </div>
    </FloatingSection>
  );
};

export default ChatPage;
