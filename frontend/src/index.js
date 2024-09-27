// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '../src/contexts/ThemeContext';  // Asegúrate de importar el ThemeProvider

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
