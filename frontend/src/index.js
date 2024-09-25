// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';  // Asegúrate de importar el ThemeProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>  {/* Envuelve todo dentro de ThemeProvider */}
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
