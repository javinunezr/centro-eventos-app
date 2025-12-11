import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

// Configuración para desarrollo
if (process.env.NODE_ENV === 'development') {
  console.log('MSW handlers registrados:', handlers.length);
  handlers.forEach((handler, index) => {
    console.log(`Handler ${index + 1}:`, handler.info || 'Handler definido');
  });
}
