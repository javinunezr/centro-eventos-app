// Datos de recetas para fallback cuando MSW no está disponible
export const recetasPorCategoria = {
  'postres': [
    { id: 1, titulo: 'Torta de Chocolate', dificultad: 'Media', categoria: 'Postres' },
    { id: 2, titulo: 'Cheesecake de Fresa', dificultad: 'Fácil', categoria: 'Postres' },
    { id: 3, titulo: 'Tiramisú Italiano', dificultad: 'Difícil', categoria: 'Postres' },
  ],
  'platos-principales': [
    { id: 4, titulo: 'Pasta Carbonara', dificultad: 'Media', categoria: 'Platos Principales' },
    { id: 5, titulo: 'Pollo al Horno con Papas', dificultad: 'Fácil', categoria: 'Platos Principales' },
    { id: 6, titulo: 'Salmón a la Parrilla', dificultad: 'Media', categoria: 'Platos Principales' },
  ],
  'ensaladas': [
    { id: 7, titulo: 'Ensalada César', dificultad: 'Fácil', categoria: 'Ensaladas' },
    { id: 8, titulo: 'Ensalada Caprese', dificultad: 'Fácil', categoria: 'Ensaladas' },
    { id: 9, titulo: 'Ensalada Griega', dificultad: 'Fácil', categoria: 'Ensaladas' },
  ],
  'bebidas': [
    { id: 10, titulo: 'Smoothie de Frutas', dificultad: 'Fácil', categoria: 'Bebidas' },
    { id: 11, titulo: 'Limonada Casera', dificultad: 'Fácil', categoria: 'Bebidas' },
    { id: 12, titulo: 'Café Frappé', dificultad: 'Media', categoria: 'Bebidas' },
  ],
};

export const recetasDetalladas = {
  1: { id: 1, ingredientes: 'Chocolate, huevos, harina, azúcar, mantequilla', metodoPreparacion: 'Mezclar ingredientes secos, agregar huevos batidos, hornear a 180°C por 35 minutos', tiempoCoccion: '35 minutos' },
  2: { id: 2, ingredientes: 'Queso crema, galletas, fresas, azúcar, gelatina', metodoPreparacion: 'Triturar galletas para la base, mezclar queso con azúcar, refrigerar 4 horas', tiempoCoccion: '0 minutos (sin cocción)' },
  3: { id: 3, ingredientes: 'Bizcochos, café, mascarpone, huevos, cacao', metodoPreparacion: 'Remojar bizcochos en café, alternar capas con crema de mascarpone, refrigerar', tiempoCoccion: '0 minutos (sin cocción)' },
  4: { id: 4, ingredientes: 'Pasta, huevos, panceta, queso parmesano, pimienta', metodoPreparacion: 'Cocinar pasta, saltear panceta, mezclar con huevos y queso fuera del fuego', tiempoCoccion: '15 minutos' },
  5: { id: 5, ingredientes: 'Pollo, papas, aceite de oliva, romero, ajo', metodoPreparacion: 'Marinar pollo, colocar con papas en bandeja, hornear a 200°C', tiempoCoccion: '45 minutos' },
  6: { id: 6, ingredientes: 'Salmón, limón, eneldo, aceite, sal y pimienta', metodoPreparacion: 'Marinar salmón con limón y hierbas, cocinar a la parrilla 4 min por lado', tiempoCoccion: '8 minutos' },
  7: { id: 7, ingredientes: 'Lechuga romana, crutones, pollo, aderezo césar, parmesano', metodoPreparacion: 'Mezclar lechuga con pollo, agregar crutones y aderezo, espolvorear queso', tiempoCoccion: '10 minutos (solo pollo)' },
  8: { id: 8, ingredientes: 'Tomate, mozzarella, albahaca, aceite de oliva, sal', metodoPreparacion: 'Cortar tomate y queso en rodajas, alternar con albahaca, aliñar', tiempoCoccion: '0 minutos' },
  9: { id: 9, ingredientes: 'Lechuga, tomate, pepino, cebolla, aceitunas, queso feta', metodoPreparacion: 'Cortar vegetales, mezclar con aceitunas y queso, aliñar con aceite y limón', tiempoCoccion: '0 minutos' },
  10: { id: 10, ingredientes: 'Fresas, plátano, yogur, miel, hielo', metodoPreparacion: 'Licuar todas las frutas con yogur y hielo hasta obtener consistencia suave', tiempoCoccion: '0 minutos' },
  11: { id: 11, ingredientes: 'Limones, agua, azúcar, hielo, menta', metodoPreparacion: 'Exprimir limones, mezclar con agua y azúcar, servir con hielo y menta', tiempoCoccion: '0 minutos' },
  12: { id: 12, ingredientes: 'Café espresso, leche, azúcar, hielo, crema batida', metodoPreparacion: 'Preparar café doble, licuar con hielo y leche, servir con crema', tiempoCoccion: '5 minutos' },
};
