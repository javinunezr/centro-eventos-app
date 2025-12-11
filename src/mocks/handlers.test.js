import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Aumentar timeout para pruebas con delays más largos
jest.setTimeout(15000);

describe('MSW Handlers', () => {
  describe('REST API - /api/recetas', () => {
    test('returns recipes for postres category', async () => {
      const response = await fetch('/api/recetas?categoria=postres');
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data).toHaveLength(3);
      expect(data[0].titulo).toBe('Torta de Chocolate');
      expect(data[0].categoria).toBe('Postres');
    });

    test('returns recipes for platos-principales category', async () => {
      const response = await fetch('/api/recetas?categoria=platos-principales');
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data).toHaveLength(3);
      expect(data[0].titulo).toBe('Pasta Carbonara');
    });

    test('returns recipes for ensaladas category', async () => {
      const response = await fetch('/api/recetas?categoria=ensaladas');
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data).toHaveLength(3);
      expect(data[0].titulo).toBe('Ensalada César');
    });

    test('returns recipes for bebidas category', async () => {
      const response = await fetch('/api/recetas?categoria=bebidas');
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data).toHaveLength(3);
      expect(data[0].titulo).toBe('Smoothie de Frutas');
    });

    test('returns 404 for non-existent category', async () => {
      const response = await fetch('/api/recetas?categoria=inexistente');
      
      expect(response.ok).toBe(false);
      expect(response.status).toBe(404);
    });

    test('returns all recipes when no category specified', async () => {
      const response = await fetch('/api/recetas');
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.length).toBeGreaterThanOrEqual(12);
    });
  });

  describe('GraphQL API - /api/graphql', () => {
    test('returns recipe details for valid ID', async () => {
      const query = `
        query {
          recetaDetalle(id: 1) {
            id
            ingredientes
            metodoPreparacion
            tiempoCoccion
          }
        }
      `;

      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.data.recetaDetalle).toBeDefined();
      expect(data.data.recetaDetalle.id).toBe(1);
      expect(data.data.recetaDetalle.ingredientes).toContain('Chocolate');
      expect(data.data.recetaDetalle.tiempoCoccion).toBe('35 minutos');
    });

    test('returns recipe details for different IDs', async () => {
      const query = `
        query {
          recetaDetalle(id: 4) {
            id
            ingredientes
            metodoPreparacion
            tiempoCoccion
          }
        }
      `;

      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.data.recetaDetalle.ingredientes).toContain('Pasta');
      expect(data.data.recetaDetalle.tiempoCoccion).toBe('15 minutos');
    });

    test('returns error for non-existent recipe ID', async () => {
      const query = `
        query {
          recetaDetalle(id: 999) {
            id
            ingredientes
            metodoPreparacion
            tiempoCoccion
          }
        }
      `;

      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      expect(data.errors).toBeDefined();
      expect(data.errors[0].message).toContain('no encontrada');
    });

    test('handles multiple recipe detail queries', async () => {
      const ids = [1, 2, 3, 4, 5];
      
      for (const id of ids) {
        const query = `
          query {
            recetaDetalle(id: ${id}) {
              id
              ingredientes
            }
          }
        `;

        const response = await fetch('/api/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        expect(data.data.recetaDetalle.id).toBe(id);
      }
    });
  });
});
