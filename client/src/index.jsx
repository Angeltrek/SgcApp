import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

const script2 = document.createElement('script');
script2.src = 'https://kit.fontawesome.com/75fcf71049.js';
script2.crossOrigin = 'anonymous';
document.body.appendChild(script2);