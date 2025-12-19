/// <reference types="cypress" />

describe('Veterinaria Cuidado Animal - Detalles de Mascotas', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('E2E-8: Debe mostrar detalles completos de una mascota desde la lista de mascotas', () => {
    // Navegar a la lista de mascotas
    cy.contains('Ver Mascotas').click()
    cy.contains('Lista de Mascotas', { timeout: 10000 }).should('be.visible')
    
    // Click en "Ver Historial" de la primera mascota
    cy.get('.mascota-card').first().within(() => {
      cy.contains('Ver Historial').click()
    })
    
    // Verificar que se muestra el historial médico
    cy.contains('Historial Médico Completo', { timeout: 10000 }).should('be.visible')
    
    // Verificar secciones del historial
    cy.contains('Información de la Mascota').should('be.visible')
    cy.contains('Información del Dueño').should('be.visible')
    cy.contains('Historial Médico').should('be.visible')
    
    // Verificar campos específicos
    cy.contains('Especie:').should('be.visible')
    cy.contains('Raza:').should('be.visible')
    cy.contains('Edad:').should('be.visible')
    cy.contains('Peso:').should('be.visible')
    cy.contains('Vacunas:').should('be.visible')
    cy.contains('Alergias:').should('be.visible')
    cy.contains('Última Visita:').should('be.visible')
  })

  it('E2E-9: Debe mostrar detalles de mascota desde una cita', () => {
    // Navegar al menú de citas
    cy.get('.side-menu').contains('Citas').click()
    cy.contains('Selecciona el día para ver las citas', { timeout: 5000 }).should('be.visible')
    
    // Navegar a citas del 18 de diciembre
    cy.contains('Miércoles 18 de Diciembre').click()
    cy.get('.cita-card', { timeout: 10000 }).should('have.length.greaterThan', 0)
    
    // Click en "Ver Historial Médico" de la primera cita
    cy.get('.cita-card').first().within(() => {
      cy.contains('Ver Historial Médico').click()
    })
    
    // Verificar que se muestra el historial
    cy.contains('Historial Médico Completo', { timeout: 10000 }).should('be.visible')
    cy.contains('Información de la Mascota').should('be.visible')
    cy.contains('Información del Dueño').should('be.visible')
  })

  it('E2E-10: Debe poder volver al inicio desde el detalle de mascota', () => {
    // Navegar a una mascota
    cy.contains('Ver Mascotas').click()
    cy.get('.mascota-card', { timeout: 10000 }).first().within(() => {
      cy.contains('Ver Historial').click()
    })
    
    // Verificar que estamos en la página de detalles
    cy.contains('Historial Médico Completo', { timeout: 10000 }).should('be.visible')
    
    // Click en botón "Volver al Inicio"
    cy.contains('Volver al Inicio').click()
    
    // Verificar que volvimos a la página principal
    cy.contains('Bienvenido a Veterinaria Cuidado Animal', { timeout: 10000 }).should('be.visible')
  })

  it('E2E-11: Debe mostrar información del dueño en el historial de la mascota', () => {
    // Navegar a una mascota
    cy.contains('Ver Mascotas').click()
    cy.get('.mascota-card', { timeout: 10000 }).first().within(() => {
      cy.contains('Ver Historial').click()
    })
    
    // Verificar información del dueño
    cy.contains('Información del Dueño', { timeout: 10000 }).should('be.visible')
    
    cy.get('.detalle-section').contains('Información del Dueño').parent().within(() => {
      cy.contains('Nombre:').should('be.visible')
      cy.contains('Teléfono:').should('be.visible')
      cy.contains('Dirección:').should('be.visible')
    })
  })

  it('E2E-12: Debe mostrar historial médico completo con todos los campos', () => {
    // Navegar a una mascota
    cy.contains('Ver Mascotas').click()
    cy.get('.mascota-card', { timeout: 10000 }).first().within(() => {
      cy.contains('Ver Historial').click()
    })
    
    // Verificar todos los campos del historial médico
    cy.contains('Historial Médico', { timeout: 10000 }).should('be.visible')
    
    cy.get('.detalle-section').contains('Historial Médico').parent().within(() => {
      cy.contains('Vacunas:').should('be.visible')
      cy.contains('Alergias:').should('be.visible')
      cy.contains('Cirugías:').should('be.visible')
      cy.contains('Medicamentos:').should('be.visible')
      cy.contains('Última Visita:').should('be.visible')
      cy.contains('Observaciones:').should('be.visible')
    })
  })
})
