import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure this is 'react-dom/client'
import './index.css';
import App from './App';

// Create a root for the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
