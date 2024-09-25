// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/" element={<h1>Bienvenido a Mi Portafolio</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
