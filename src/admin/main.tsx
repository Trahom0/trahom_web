import { createRoot } from 'react-dom/client';
import { AdminApp } from './AdminApp';
import '../styles/index.css';

const container = document.getElementById('admin-root');

if (container) {
  createRoot(container).render(<AdminApp />);
}
