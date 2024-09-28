// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar';
import Home from '../src/pages/Home/Home';
import About from '../src/pages/About/About';
import Projects from '../src/pages/Projects/Projects';
import Contact from '../src/pages/Contact/Contact';
import ChatPage from '../src/pages/ChatPage/ChatPage';
import Footer from './components/layout/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
