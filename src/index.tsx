import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('app-root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
);
