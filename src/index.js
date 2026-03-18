/* ============================================
   ENVISAGE TRAINING ACADEMY
   Entry Point
   ============================================ */

import React from 'react';
import ReactDOM from 'react-dom/client';

// Global styles (must be imported first)
import './index.css';

// Main App component
import App from './App';

// Get root element
const rootElement = document.getElementById('root');

// Create React root and render
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance measurement (optional)
// If you want to measure performance, you can log results
// or send to an analytics endpoint
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Uncomment to measure performance
// reportWebVitals(console.log);