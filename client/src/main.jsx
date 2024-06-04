import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './Routes';

// Find the root element
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Render the app
root.render(<AppRoutes />);
