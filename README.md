# 🐾 Sistema de Gestión Veterinaria - Cuidado Animal

Sistema web de gestión de citas y pacientes para la veterinaria "Cuidado Animal", desarrollado con React como parte del proyecto final de Desarrollo Frontend II.

## 📋 Descripción del Proyecto

La veterinaria "Cuidado Animal" ha experimentado un crecimiento significativo en su número de clientes y mascotas, lo que ha complicado la gestión manual de las citas y la información de los pacientes. Este sistema permite organizar y visualizar los datos de manera eficiente.

## ✨ Funcionalidades Principales

### 📅 Gestión de Citas
- Visualización de citas agendadas por día
- Máximo 8 citas por día
- Información completa de cada cita:
  - Veterinario encargado y especialidad
  - Mascota atendida
  - Dueño de la mascota
  - Hora y motivo de la consulta

### 🐶🐱 Información de Mascotas
- Lista completa de mascotas registradas
- Historial médico detallado:
  - Vacunas aplicadas
  - Alergias conocidas
  - Cirugías realizadas
  - Medicamentos actuales
  - Observaciones médicas
  - Última visita

### 👥 Gestión de Clientes
- Lista de clientes con sus datos de contacto
- Relación cliente-mascotas
- Información de contacto (teléfono y dirección)

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React** 19.2.0
- **React Router DOM** 7.9.6 - Navegación entre páginas
- **CSS3** - Estilos personalizados con gradientes y animaciones

### Backend Mock
- **MSW (Mock Service Worker)** 2.12.2 - Interceptación de peticiones HTTP
- **GraphQL** 16.12.0 - API GraphQL mockeada
- **@graphql-tools** - Herramientas para GraphQL

### Testing
- **Jest** - Tests unitarios
- **React Testing Library** 16.3.0 - Tests de componentes React
- **Cypress** - Tests End-to-End (E2E)
- **MSW** - Mocking de APIs para tests

## 📊 Cobertura de Pruebas

El proyecto cumple con los siguientes requisitos de cobertura:

- ✅ **Pruebas Unitarias**: > 70% de cobertura general
  - Tests de datos (veterinariaData.test.js)
  - Tests de handlers MSW (handlers.test.js)
  
- ✅ **Pruebas E2E**: > 50% de cobertura
  - 22 tests E2E implementados en Cypress
  - Navegación principal (7 tests)
  - Detalles de mascotas (5 tests)
  - Gestión de citas (10 tests)

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/javinunezr/centro-eventos-app.git

# Entrar al directorio
cd centro-eventos-app

# Instalar dependencias
npm install
```

### Ejecutar en modo desarrollo

```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

### Ejecutar pruebas

```bash
# Ejecutar tests unitarios
npm test

# Ejecutar tests unitarios con cobertura
npm run test:coverage

# Abrir Cypress para tests E2E (modo interactivo)
npm run cypress:open

# Ejecutar tests E2E (modo headless)
npm run cypress:run
```

### Build para producción

```bash
npm run build
```

## 🏗️ Estructura del Proyecto

```
src/
├── App.js                      # Componente principal con rutas
├── App.css                     # Estilos globales
├── index.js                    # Punto de entrada
├── data/
│   ├── veterinariaData.js      # Datos mock de la veterinaria
│   └── veterinariaData.test.js # Tests de datos
├── mocks/
│   ├── browser.js              # Configuración MSW para browser
│   ├── server.js               # Configuración MSW para tests
│   ├── handlers.js             # Handlers REST y GraphQL
│   └── handlers.test.js        # Tests de handlers
cypress/
├── e2e/
│   ├── navegacion.cy.js        # Tests E2E de navegación
│   ├── detalles-mascotas.cy.js # Tests E2E de detalles
│   └── gestion-citas.cy.js     # Tests E2E de citas
```

## 🔌 APIs Implementadas

### REST API

#### GET /api/citas?fecha=YYYY-MM-DD
Obtiene las citas de un día específico (máximo 8)

**Respuesta:**
```json
[
  {
    "id": 1,
    "hora": "09:00",
    "motivo": "Control rutinario",
    "veterinario": {
      "nombre": "Dra. Patricia López",
      "especialidad": "Medicina General"
    },
    "mascota": {
      "nombre": "Max",
      "especie": "Perro",
      "raza": "Golden Retriever"
    },
    "dueno": {
      "nombre": "María González",
      "telefono": "+56912345678"
    }
  }
]
```

#### GET /api/clientes
Obtiene la lista de todos los clientes

#### GET /api/mascotas?clienteId={id}
Obtiene todas las mascotas (opcionalmente filtradas por cliente)

### GraphQL API

#### Query: historialMedico(mascotaId: ID)
Obtiene el historial médico completo de una mascota

**Ejemplo:**
```graphql
query {
  historialMedico(mascotaId: 1) {
    vacunas
    alergias
    cirugias
    medicamentos
    peso
    observaciones
    mascota {
      nombre
      especie
      raza
    }
    dueno {
      nombre
      telefono
    }
  }
}
```

#### Query: clienteDetalle(id: ID)
Obtiene los detalles de un cliente y sus mascotas

## 🎨 Características del Diseño

- **Colores temáticos**: Paleta verde inspirada en naturaleza y cuidado animal
- **Interfaz intuitiva**: Navegación clara con menú lateral
- **Responsive**: Diseño adaptable a dispositivos móviles
- **Tarjetas informativas**: Organización visual de la información
- **Gradientes y sombras**: Diseño moderno con profundidad visual

## 📝 Decisiones de Diseño

### Reutilización del Proyecto Anterior
- ✅ Estructura de routing con React Router
- ✅ Sistema de MSW para mocks (REST + GraphQL)
- ✅ Arquitectura de componentes funcionales
- ✅ Sistema de testing (Jest + Cypress)
- ✅ Configuración de build y deploy

### Adaptaciones Realizadas
- Datos de recetas → Datos veterinarios (clientes, mascotas, citas)
- Categorías de recetas → Filtro por días de citas
- Detalles de recetas → Historial médico
- Tema culinario → Tema veterinario (verde, iconos de mascotas)

## 👥 Autor

**Javier Núñez R.**
- GitHub: [@javinunezr](https://github.com/javinunezr)

## 📄 Licencia

Este proyecto es parte de un trabajo académico para la Universidad.

---

**Asignatura**: Desarrollo Frontend II  
**Semana**: 9  
**Año**: 2025
