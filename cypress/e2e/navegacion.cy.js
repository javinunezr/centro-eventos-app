/// <reference types="cypress" />

describe('Recetas Deliciosas - Navegación Principal', () => {
  beforeEach(() => {
    // Visitar la página principal antes de cada prueba
    cy.visit('/')
  })

  it('E2E-1: Debe cargar la página principal correctamente y mostrar el título', () => {
    // Verificar que el título principal está visible
    cy.contains('Recetas Deliciosas').should('be.visible')
    
    // Verificar que el menú de categorías está presente
    cy.contains('Categorías de Recetas').should('be.visible')
    
    // Verificar que el footer está presente
    cy.contains('© 2025 Recetas Deliciosas').should('be.visible')
  })

  it('E2E-2: Debe mostrar todas las categorías de recetas en el menú lateral', () => {
    // Verificar que todas las categorías están visibles
    cy.contains('Postres').should('be.visible')
    cy.contains('Platos Principales').should('be.visible')
    cy.contains('Ensaladas').should('be.visible')
    cy.contains('Bebidas').should('be.visible')
  })

  it('E2E-3: Debe navegar a la categoría Postres y mostrar recetas', () => {
    // Click en la categoría Postres
    cy.contains('Postres').click()
    
    // Esperar a que se carguen las recetas
    cy.contains('Recetas de postres', { timeout: 10000 }).should('be.visible')
    
    // Verificar que se muestran recetas específicas de postres
    cy.contains('Torta de Chocolate', { timeout: 5000 }).should('be.visible')
    cy.contains('Cheesecake de Fresa').should('be.visible')
    cy.contains('Tiramisú Italiano').should('be.visible')
    
    // Verificar que se muestran los detalles básicos
    cy.contains('Dificultad:').should('be.visible')
    cy.contains('Categoría:').should('be.visible')
  })

  it('E2E-4: Debe navegar a diferentes categorías y mostrar recetas correspondientes', () => {
    // Navegar a Platos Principales
    cy.contains('Platos Principales').click()
    cy.contains('Recetas de platos-principales', { timeout: 10000 }).should('be.visible')
    cy.contains('Pasta Carbonara', { timeout: 5000 }).should('be.visible')
    
    // Navegar a Ensaladas
    cy.contains('Ensaladas').click()
    cy.contains('Recetas de ensaladas', { timeout: 10000 }).should('be.visible')
    cy.contains('Ensalada César', { timeout: 5000 }).should('be.visible')
    
    // Navegar a Bebidas
    cy.contains('Bebidas').click()
    cy.contains('Recetas de bebidas', { timeout: 10000 }).should('be.visible')
    cy.contains('Smoothie de Frutas', { timeout: 5000 }).should('be.visible')
  })
})
