import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './app/App';
import { setContentLanguage } from './content';
import { getRouteFromPath } from './app/routes';
import './styles/index.css';

// Use the same language as the prerendered HTML from the very first render,
// otherwise Arabic/Turkish pages are rebuilt from scratch on load.
setContentLanguage(getRouteFromPath(window.location.pathname).language);

const container = document.getElementById('root');

if (container) {
  if (container.hasChildNodes()) {
    hydrateRoot(container, <App />);
  } else {
    createRoot(container).render(<App />);
  }
}
