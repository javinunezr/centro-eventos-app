import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

async function enableMocking() {
  // Habilitar MSW solo en el navegador
  console.log('Iniciando MSW...');
  
  const { worker } = await import('./mocks/browser');
  
  return worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js'
    },
    onUnhandledRequest: 'bypass',
    quiet: false
  }).then(() => {
    console.log('MSW iniciado correctamente');
  }).catch((error) => {
    console.error('Error iniciando MSW:', error);
    // No lanzar el error para que la app pueda iniciarse sin MSW si falla
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
