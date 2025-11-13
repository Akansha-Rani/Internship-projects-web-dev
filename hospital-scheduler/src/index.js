import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { SchedulerProvider } from './context/SchedulerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <SchedulerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SchedulerProvider>
  </ThemeProvider>
);
