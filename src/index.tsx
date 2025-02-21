import { createRoot } from 'react-dom/client';
import React from 'react';
import { App } from './App';
import 'bulma/css/bulma.css';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
