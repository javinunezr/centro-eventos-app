# Recetario App

Aplicación web de recetas desarrollada con React que permite explorar y visualizar diferentes recetas organizadas por categorías.

## Descripción

Esta aplicación es un catálogo interactivo de recetas que utiliza React Router para la navegación y Mock Service Worker (MSW) para simular llamadas a APIs REST y GraphQL. Los usuarios pueden navegar por diferentes categorías de recetas y ver los detalles de cada una.

## Características

- Navegación por categorías de recetas (Postres, Platos Principales, Ensaladas, Bebidas)
- Visualización de detalles de cada receta
- Integración con API REST mock para listar recetas
- Integración con API GraphQL mock para detalles de recetas
- Interfaz moderna y responsive
- Testing con Jest y React Testing Library
- Testing E2E con Cypress

## Tecnologías Utilizadas

- React 19.2.0
- React Router DOM 7.9.6
- Mock Service Worker (MSW) 2.12.2
- GraphQL 16.12.0
- Jest (incluido en react-scripts)
- React Testing Library 16.3.0
- Cypress 15.7.1

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/javinunezr/centro-eventos-app.git
cd centro-eventos-app
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicializa MSW (si no está configurado):
```bash
npx msw init public/ --save
```

## Scripts Disponibles

### Desarrollo

```bash
npm start
```
Inicia la aplicación en modo desarrollo.
Abre http://localhost:3000/centro-eventos-app en el navegador.

### Testing

```bash
npm test
```
Ejecuta los tests unitarios en modo interactivo.

```bash
npm run test:coverage
```
Ejecuta los tests y genera un reporte de cobertura.

### Testing E2E

```bash
npm run cypress:open
```
Abre la interfaz de Cypress para ejecutar tests E2E de forma interactiva.

```bash
npm run cypress:run
```
Ejecuta los tests E2E en modo headless.

```bash
npm run test:e2e
```
Inicia el servidor y ejecuta todos los tests E2E automáticamente.

### Producción

```bash
npm run build
```
Compila la aplicación para producción en la carpeta `build`.

```bash
npm run deploy
```
Despliega la aplicación en GitHub Pages.

## Estructura del Proyecto

```
centro-eventos-app/
├── public/                 # Archivos públicos
│   ├── index.html
│   └── mockServiceWorker.js
├── src/
│   ├── data/              # Datos de prueba
│   ├── mocks/             # Configuración de MSW
│   │   ├── browser.js     # MSW para navegador
│   │   ├── handlers.js    # Handlers de API
│   │   └── server.js      # MSW para tests
│   ├── App.js             # Componente principal
│   ├── index.js           # Punto de entrada
│   └── setupTests.js      # Configuración de tests
├── cypress/               # Tests E2E
│   ├── e2e/
│   └── support/
└── package.json
```

## Categorías de Recetas

La aplicación incluye las siguientes categorías:

- **Postres**: Torta de Chocolate, Cheesecake de Fresa, Tiramisú Italiano
- **Platos Principales**: Pasta Carbonara, Pollo al Horno con Papas, Salmón a la Parrilla
- **Ensaladas**: Ensalada César, Ensalada Caprese, Ensalada Griega
- **Bebidas**: Smoothie de Frutas, Limonada Casera, Café Frappé

## API Mock

### REST API

Endpoint: `/api/recetas`
- Parámetro: `categoria` (opcional)
- Retorna: Lista de recetas filtradas por categoría

### GraphQL API

Endpoint: `/api/graphql`
- Query: `recetaDetalle(id: Int)`
- Retorna: Detalles completos de una receta (ingredientes, método de preparación, tiempo de cocción)

## Testing

### Cobertura de Tests

El proyecto mantiene una cobertura mínima del 50% en:
- Statements
- Branches
- Functions
- Lines

### Tests Incluidos

- Tests unitarios para componentes
- Tests de integración para handlers de MSW
- Tests E2E para flujos de usuario completos

## Despliegue

La aplicación está configurada para desplegarse automáticamente en GitHub Pages:

URL de producción: https://javinunezr.github.io/centro-eventos-app

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es privado y está desarrollado con fines educativos.

## Autor

Javier Núñez
- GitHub: [@javinunezr](https://github.com/javinunezr)

## Notas Adicionales

- El proyecto utiliza MSW para simular APIs, por lo que no requiere un backend real
- La configuración de MSW se inicializa automáticamente al cargar la aplicación
- Los tests pueden ejecutarse sin conexión a internet
