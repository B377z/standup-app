import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './Routes';
import { AuthProvider } from './context/AuthContext';
import './index.css'; // Ensure this import is here


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);

