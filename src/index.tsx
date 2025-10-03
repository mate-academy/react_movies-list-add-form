import { createRoot } from 'react-dom/client';
import { App } from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bulma/css/bulma.css';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
