import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

async function enableMocking() {
  // Habilitar MSW tanto en desarrollo como en producción para GitHub Pages
  console.log('Iniciando MSW...');
  const { worker } = await import('./mocks/browser')
  
  return worker.start({
    onUnhandledRequest: 'bypass',
  }).then(() => {
    console.log('MSW iniciado correctamente');
  }).catch((error) => {
    console.error('Error iniciando MSW:', error);
  });
}

enableMocking().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})

reportWebVitals();
