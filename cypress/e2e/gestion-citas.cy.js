/// <reference types="cypress" />

describe('Veterinaria Cuidado Animal - Gestión de Citas', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('E2E-13: Debe mostrar máximo 8 citas por día', () => {
    // Ir al menú de citas
    cy.get('.side-menu').contains('Citas').click()
    cy.contains('Selecciona el día para ver las citas', { timeout: 5000 }).should('be.visible')
    
    // Verificar citas del 18 de diciembre
    cy.contains('Miércoles 18 de Diciembre').click()
    cy.get('.cita-card', { timeout: 10000 }).should('have.length.lessThanOrEqual', 8)
    
    // Volver al menú de citas
    cy.get('.side-menu').contains('Citas').click()
    
    // Verificar citas del 19 de diciembre (tiene 8 citas exactas)
    cy.contains('Jueves 19 de Diciembre').click()
    cy.get('.cita-card', { timeout: 10000 }).should('have.length.lessThanOrEqual', 8)
  })

  it('E2E-14: Debe mostrar hora de la cita en cada tarjeta', () => {
    cy.get('.side-menu').contains('Citas').click()
    cy.contains('Miércoles 18 de Diciembre').click()
    cy.get('.cita-card', { timeout: 10000 }).should('have.length.greaterThan', 0)
    
    // Verificar que cada cita muestra la hora
    cy.get('.cita-hora').each(($hora) => {
      // Verificar formato de hora (HH:MM)
      expect($hora.text()).to.match(/\d{2}:\d{2}/)
    })
  })

  it('E2E-15: Debe mostrar motivo de consulta en cada cita', () => {
    cy.get('.side-menu').contains('Citas').click()
    cy.contains('Miércoles 18 de Diciembre').click()
    cy.get('.cita-card', { timeout: 10000 }).should('have.length.greaterThan', 0)
    
    // Verificar que cada cita tiene un motivo
    cy.get('.cita-motivo').each(($motivo) => {
      expect($motivo.text()).to.have.length.greaterThan(0)
    })
  })

  it('E2E-16: Debe mostrar información del veterinario en cada cita', () => {
    cy.get('.side-menu').contains('Citas').click()
    cy.contains('Miércoles 18 de Diciembre').click()
    cy.get('.cita-card', { timeout: 10000 }).should('have.length.greaterThan', 0)
    
    // Verificar que se muestra veterinario y especialidad
    cy.get('.cita-card').first().within(() => {
      cy.contains('Veterinario:').should('exist')
      cy.contains(/Dra?\./i).should('exist') // Debe contener Dr. o Dra.
    })
  })

  it('E2E-17: Debe mostrar información completa de la mascota en cada cita', () => {
    cy.get('.side-menu').contains('Citas').click()
    cy.contains('Miércoles 18 de Diciembre').click()
    cy.get('.cita-card', { timeout: 10000 }).should('have.length.greaterThan', 0)
    
    // Verificar información de la mascota
    cy.get('.cita-card').first().within(() => {
      cy.contains('Mascota:').should('exist')
      // Debe mostrar nombre, especie y raza entre paréntesis
      cy.get('.cita-body').should('contain.text', 'Perro').or('contain.text', 'Gato')
    })
  })

  it('E2E-18: Debe mostrar información del dueño en cada cita', () => {
    cy.get('.side-menu').contains('Citas').click()
    cy.contains('Miércoles 18 de Diciembre').click()
    cy.get('.cita-card', { timeout: 10000 }).should('have.length.greaterThan', 0)
    
    // Verificar información del dueño
    cy.get('.cita-card').first().within(() => {
      cy.contains('Dueño:').should('exist')
      cy.contains('Teléfono:').should('exist')
      // Verificar formato de teléfono chileno (+56)
      cy.contains(/\+56/).should('exist')
    })
  })

  it('E2E-19: Debe mostrar contador de citas en la página', () => {
    cy.get('.side-menu').contains('Citas').click()
    cy.contains('Miércoles 18 de Diciembre').click()
    
    // Verificar que existe el contador de citas
    cy.contains(/Mostrando \d+ de máximo 8 citas por día/, { timeout: 10000 }).should('be.visible')
  })

  it('E2E-20: Debe mostrar fecha formateada correctamente', () => {
    cy.get('.side-menu').contains('Citas').click()
    cy.contains('Miércoles 18 de Diciembre').click()
    
    // Verificar que la fecha se muestra en español
    cy.contains(/miércoles|jueves|viernes|sábado|domingo|lunes|martes/i, { timeout: 10000 }).should('be.visible')
    cy.contains(/diciembre/i).should('be.visible')
    cy.contains(/2025/).should('be.visible')
  })

  it('E2E-21: Cada cita debe tener botón para ver historial médico', () => {
    cy.get('.side-menu').contains('Citas').click()
    cy.contains('Miércoles 18 de Diciembre').click()
    cy.get('.cita-card', { timeout: 10000 }).should('have.length.greaterThan', 0)
    
    // Verificar que cada cita tiene el botón
    cy.get('.cita-card').each(($cita) => {
      cy.wrap($cita).contains('Ver Historial Médico').should('exist')
    })
  })

  it('E2E-22: Debe navegar correctamente desde cita a historial médico', () => {
    cy.contains('Citas del 18 Dic').click()
    cy.get('.cita-card', { timeout: 10000 }).should('have.length.greaterThan', 0)
    
    // Guardar el nombre de la mascota
    cy.get('.cita-card').first().find('.cita-body').invoke('text').then((citaText) => {
      const nombreMatch = citaText.match(/Mascota:\s*(\w+)/);
      const nombreMascota = nombreMatch ? nombreMatch[1] : null;
      
      // Click en ver historial
      cy.get('.cita-card').first().contains('Ver Historial Médico').click()
      
      // Verificar que estamos en la página correcta
      cy.contains('Historial Médico Completo', { timeout: 10000 }).should('be.visible')
      
      // Verificar que coincide el nombre de la mascota si lo pudimos extraer
      if (nombreMascota) {
        cy.contains(nombreMascota).should('be.visible')
      }
    })
  })
})
