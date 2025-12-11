import { recetasPorCategoria, recetasDetalladas } from './recetasData';

describe('recetasData', () => {
  describe('recetasPorCategoria', () => {
    test('contains all categories', () => {
      expect(recetasPorCategoria).toHaveProperty('postres');
      expect(recetasPorCategoria).toHaveProperty('platos-principales');
      expect(recetasPorCategoria).toHaveProperty('ensaladas');
      expect(recetasPorCategoria).toHaveProperty('bebidas');
    });

    test('postres category has correct recipes', () => {
      const postres = recetasPorCategoria.postres;
      expect(postres).toHaveLength(3);
      expect(postres[0]).toHaveProperty('id', 1);
      expect(postres[0]).toHaveProperty('titulo', 'Torta de Chocolate');
      expect(postres[0]).toHaveProperty('categoria', 'Postres');
    });

    test('platos-principales category has correct recipes', () => {
      const platosPrincipales = recetasPorCategoria['platos-principales'];
      expect(platosPrincipales).toHaveLength(3);
      expect(platosPrincipales[0]).toHaveProperty('id', 4);
      expect(platosPrincipales[0]).toHaveProperty('titulo', 'Pasta Carbonara');
    });

    test('ensaladas category has correct recipes', () => {
      const ensaladas = recetasPorCategoria.ensaladas;
      expect(ensaladas).toHaveLength(3);
      expect(ensaladas[0]).toHaveProperty('id', 7);
      expect(ensaladas[0]).toHaveProperty('titulo', 'Ensalada César');
    });

    test('bebidas category has correct recipes', () => {
      const bebidas = recetasPorCategoria.bebidas;
      expect(bebidas).toHaveLength(3);
      expect(bebidas[0]).toHaveProperty('id', 10);
      expect(bebidas[0]).toHaveProperty('titulo', 'Smoothie de Frutas');
    });

    test('all recipes have required fields', () => {
      Object.values(recetasPorCategoria).flat().forEach((receta) => {
        expect(receta).toHaveProperty('id');
        expect(receta).toHaveProperty('titulo');
        expect(receta).toHaveProperty('dificultad');
        expect(receta).toHaveProperty('categoria');
      });
    });
  });

  describe('recetasDetalladas', () => {
    test('contains details for all recipe IDs', () => {
      for (let i = 1; i <= 12; i++) {
        expect(recetasDetalladas).toHaveProperty(i.toString());
      }
    });

    test('recipe details have required fields', () => {
      Object.values(recetasDetalladas).forEach((detalle) => {
        expect(detalle).toHaveProperty('id');
        expect(detalle).toHaveProperty('ingredientes');
        expect(detalle).toHaveProperty('metodoPreparacion');
        expect(detalle).toHaveProperty('tiempoCoccion');
      });
    });

    test('specific recipe details are correct', () => {
      const receta1 = recetasDetalladas[1];
      expect(receta1.ingredientes).toContain('Chocolate');
      expect(receta1.tiempoCoccion).toBe('35 minutos');
      expect(receta1.metodoPreparacion).toContain('hornear');
    });

    test('tiempo de coccion is string', () => {
      Object.values(recetasDetalladas).forEach((detalle) => {
        expect(typeof detalle.tiempoCoccion).toBe('string');
        expect(detalle.tiempoCoccion.length).toBeGreaterThan(0);
      });
    });
  });
});
