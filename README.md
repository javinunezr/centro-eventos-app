# Centro de Eventos

Una aplicación web moderna para la gestión y visualización de eventos, desarrollada con React y que demuestra el uso de APIs REST y GraphQL.


## Descripción

Centro de Eventos es una aplicación web que permite a los usuarios explorar y descubrir eventos organizados por categorías. La aplicación implementa una arquitectura híbrida que combina:

- **API REST** para la obtención de listas de eventos por categoría
- **API GraphQL** para consultar detalles específicos de eventos
- **Mock Service Worker (MSW)** para simular las APIs durante el desarrollo

## Características

- **Navegación por categorías**: Conciertos, Conferencias, Deportes, Teatros
- **Diseño responsivo** con interfaz moderna y atractiva
- **Enrutamiento dinámico** con React Router
- **Carga asíncrona** de datos con estados de loading y error
- **Detalles completos** de eventos con información del organizador
- **Datos simulados** para desarrollo y testing

## Arquitectura Técnica

### APIs Implementadas

1. **REST API** (`/api/eventos`)
   - Listado de eventos por categoría
   - Filtrado y búsqueda
   - Respuestas JSON estructuradas

2. **GraphQL API** (`/api/graphql`)
   - Consultas específicas de detalles de eventos
   - Schema flexible para datos complejos
   - Optimización de consultas

## Funcionalidades Principales

### 1. Exploración por Categorías
Los usuarios pueden navegar entre diferentes tipos de eventos:
- **Conciertos**: Eventos musicales y espectáculos en vivo
- **Conferencias**: Eventos corporativos y educativos
- **Deportes**: Competencias y eventos deportivos
- **Teatros**: Obras de teatro y espectáculos artísticos

### 2. Lista de Eventos
- Visualización de eventos por categoría
- Información básica: nombre, fecha, lugar
- Navegación fluida entre categorías

### 3. Detalles de Eventos
- Información completa del evento
- Datos del organizador
- Número de asistentes confirmados
- Descripción detallada

## Scripts Disponibles

### `npm start`
Ejecuta la aplicación en modo desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador.

### `npm test`
Lanza el runner de pruebas en modo interactivo.

### `npm run build`
Construye la aplicación para producción en la carpeta `build`.\
Optimiza la construcción para el mejor rendimiento.

### `npm run eject`
**Nota: Esta es una operación irreversible.**

## Testing y Desarrollo

La aplicación utiliza Mock Service Worker para simular las APIs durante el desarrollo:

- **Datos realistas**: Eventos con información completa y variada
- **Latencia simulada**: Delays realistas para testing de loading states
- **Manejo de errores**: Simulación de estados de error para robustez
