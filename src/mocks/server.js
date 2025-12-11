// Este archivo solo debe usarse en entorno Node.js (tests)
// No debe ser importado en el navegador

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Configurar servidor MSW para Node.js (usado en tests)
export const server = setupServer(...handlers);
