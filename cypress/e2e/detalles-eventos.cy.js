/// <reference types="cypress" />

describe('Recetas Deliciosas - Detalles de Recetas', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('E2E-5: Debe mostrar botones "Ver Detalles" en la lista de recetas', () => {
    // Navegar a una categoría
    cy.contains('Postres').click()
    
    // Esperar a que carguen las recetas
    cy.contains('Torta de Chocolate', { timeout: 5000 }).should('be.visible')
    
    // Verificar que hay botones "Ver Detalles"
    cy.contains('button', 'Ver Detalles').should('be.visible')
    
    // Verificar que hay múltiples botones (al menos 1)
    cy.get('button').contains('Ver Detalles').should('have.length.at.least', 1)
  })

  it('E2E-6: Debe navegar a los detalles de una receta específica', () => {
    // Navegar a Postres
    cy.contains('Postres').click()
    
    // Esperar a que aparezca la receta
    cy.contains('Torta de Chocolate', { timeout: 5000 }).should('be.visible')
    
    // Click en el primer botón "Ver Detalles"
    cy.get('button').contains('Ver Detalles').first().click()
    
    // Verificar que estamos en la página de detalles
    cy.contains('Detalles de la Receta', { timeout: 10000 }).should('be.visible')
    cy.contains('Información Detallada').should('be.visible')
    
    // Verificar que se muestran los campos de detalle
    cy.contains('Ingredientes:').should('be.visible')
    cy.contains('Método de Preparación:').should('be.visible')
    cy.contains('Tiempo de Cocción:').should('be.visible')
  })

  it('E2E-7: Debe mostrar información detallada de la receta correctamente', () => {
    // Navegar a Platos Principales
    cy.contains('Platos Principales').click()
    
    // Esperar y hacer click en la primera receta
    cy.contains('Pasta Carbonara', { timeout: 5000 }).should('be.visible')
    cy.get('button').contains('Ver Detalles').first().click()
    
    // Verificar detalles específicos
    cy.contains('Detalles de la Receta', { timeout: 10000 }).should('be.visible')
    cy.contains('Pasta', { timeout: 5000 }).should('be.visible')
    cy.contains('15 minutos').should('be.visible')
    
    // Verificar que hay un botón para volver
    cy.contains('button', 'Volver al Inicio').should('be.visible')
  })

  it('E2E-8: Debe regresar al inicio desde los detalles de la receta', () => {
    // Navegar a una categoría
    cy.contains('Ensaladas').click()
    
    // Esperar recetas y navegar a detalles
    cy.contains('Ensalada César', { timeout: 5000 }).should('be.visible')
    cy.get('button').contains('Ver Detalles').first().click()
    
    // Esperar a estar en detalles
    cy.contains('Detalles de la Receta', { timeout: 10000 }).should('be.visible')
    
    // Click en volver al inicio
    cy.contains('button', 'Volver al Inicio').click()
    
    // Verificar que volvimos a la página principal
    cy.contains('Por favor selecciona una categoría', { timeout: 5000 }).should('be.visible')
    cy.contains('Categorías de Recetas').should('be.visible')
  })
})
