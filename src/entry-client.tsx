import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

const container = document.getElementById('root');

if (container) {
  if (container.hasChildNodes()) {
    hydrateRoot(container, <App />);
  } else {
    createRoot(container).render(<App />);
  }
}
