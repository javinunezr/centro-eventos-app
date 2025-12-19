import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Configurar el servidor MSW para pruebas
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MSW Handlers - Veterinaria', () => {
  describe('REST API - /api/citas', () => {
    test('returns appointments for a specific date', async () => {
      const response = await fetch('http://localhost/api/citas?fecha=2025-12-18');
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data.length).toBeLessThanOrEqual(8);
      
      // Verificar estructura de cita completa
      const cita = data[0];
      expect(cita).toHaveProperty('id');
      expect(cita).toHaveProperty('hora');
      expect(cita).toHaveProperty('motivo');
      expect(cita).toHaveProperty('veterinario');
      expect(cita).toHaveProperty('mascota');
      expect(cita).toHaveProperty('dueno');
    });

    test('returns empty array for date with no appointments', async () => {
      const response = await fetch('http://localhost/api/citas?fecha=2025-12-25');
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(0);
    });

    test('returns default date appointments when no date specified', async () => {
      const response = await fetch('http://localhost/api/citas');
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
    });

    test('appointments have valid veterinarian data', async () => {
      const response = await fetch('http://localhost/api/citas?fecha=2025-12-18');
      const data = await response.json();
      
      data.forEach(cita => {
        expect(cita.veterinario).toHaveProperty('nombre');
        expect(cita.veterinario).toHaveProperty('especialidad');
      });
    });

    test('appointments have valid pet data', async () => {
      const response = await fetch('http://localhost/api/citas?fecha=2025-12-18');
      const data = await response.json();
      
      data.forEach(cita => {
        expect(cita.mascota).toHaveProperty('nombre');
        expect(cita.mascota).toHaveProperty('especie');
        expect(cita.mascota).toHaveProperty('raza');
      });
    });

    test('appointments have valid owner data', async () => {
      const response = await fetch('http://localhost/api/citas?fecha=2025-12-18');
      const data = await response.json();
      
      data.forEach(cita => {
        expect(cita.dueno).toHaveProperty('nombre');
        expect(cita.dueno).toHaveProperty('telefono');
        expect(cita.dueno).toHaveProperty('direccion');
      });
    });
  });

  describe('REST API - /api/clientes', () => {
    test('returns list of clients', async () => {
      const response = await fetch('http://localhost/api/clientes');
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThanOrEqual(8);
    });

    test('clients have required fields', async () => {
      const response = await fetch('http://localhost/api/clientes');
      const data = await response.json();
      
      data.forEach(cliente => {
        expect(cliente).toHaveProperty('id');
        expect(cliente).toHaveProperty('nombre');
        expect(cliente).toHaveProperty('telefono');
        expect(cliente).toHaveProperty('direccion');
      });
    });
  });

  describe('REST API - /api/mascotas', () => {
    test('returns all pets when no filter', async () => {
      const response = await fetch('http://localhost/api/mascotas');
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThanOrEqual(10);
    });

    test('filters pets by client ID', async () => {
      const response = await fetch('http://localhost/api/mascotas?clienteId=1');
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      data.forEach(mascota => {
        expect(mascota.duenoId).toBe(1);
      });
    });

    test('pets have required fields', async () => {
      const response = await fetch('http://localhost/api/mascotas');
      const data = await response.json();
      
      data.forEach(mascota => {
        expect(mascota).toHaveProperty('id');
        expect(mascota).toHaveProperty('nombre');
        expect(mascota).toHaveProperty('especie');
        expect(mascota).toHaveProperty('raza');
        expect(mascota).toHaveProperty('edad');
        expect(mascota).toHaveProperty('duenoId');
      });
    });
  });

  describe('GraphQL API - /api/graphql', () => {
    test('returns medical history for a pet', async () => {
      const query = `
        query {
          historialMedico(mascotaId: 1) {
            mascotaId
            vacunas
            alergias
            peso
          }
        }
      `;

      const response = await fetch('http://localhost/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toHaveProperty('data');
      expect(data.data).toHaveProperty('historialMedico');
      expect(data.data.historialMedico.mascotaId).toBe(1);
    });

    test('medical history includes pet and owner data', async () => {
      const query = `
        query {
          historialMedico(mascotaId: 1) {
            mascota {
              nombre
              especie
            }
            dueno {
              nombre
            }
          }
        }
      `;

      const response = await fetch('http://localhost/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      const data = await response.json();
      
      expect(data.data.historialMedico).toHaveProperty('mascota');
      expect(data.data.historialMedico).toHaveProperty('dueno');
      expect(data.data.historialMedico.mascota).toHaveProperty('nombre');
      expect(data.data.historialMedico.dueno).toHaveProperty('nombre');
    });

    test('returns error for non-existent pet', async () => {
      const query = `
        query {
          historialMedico(mascotaId: 999) {
            mascotaId
          }
        }
      `;

      const response = await fetch('http://localhost/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      const data = await response.json();
      
      expect(data).toHaveProperty('errors');
      expect(data.errors[0].message).toContain('999');
    });

    test('returns client details with pets', async () => {
      const query = `
        query {
          clienteDetalle(id: 1) {
            nombre
            telefono
            mascotas {
              nombre
              especie
            }
          }
        }
      `;

      const response = await fetch('http://localhost/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      const data = await response.json();
      
      expect(data.data).toHaveProperty('clienteDetalle');
      expect(data.data.clienteDetalle).toHaveProperty('mascotas');
      expect(Array.isArray(data.data.clienteDetalle.mascotas)).toBe(true);
    });

    test('returns error for invalid GraphQL query', async () => {
      const query = `
        query {
          invalidQuery {
            field
          }
        }
      `;

      const response = await fetch('http://localhost/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      const data = await response.json();
      
      expect(data).toHaveProperty('errors');
    });
  });
});
