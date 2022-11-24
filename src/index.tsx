import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/index.css';
import '@fontsource/barlow';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'Barlow, sans-serif',
        },
    },
});

ReactDOM.createRoot(document.getElementById('app-root')).render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
);
