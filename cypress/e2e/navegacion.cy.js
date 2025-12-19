/// <reference types="cypress" />

describe('Veterinaria Cuidado Animal - Navegación Principal', () => {
  beforeEach(() => {
    // Visitar la página principal antes de cada prueba
    cy.visit('/')
  })

  it('E2E-1: Debe cargar la página principal correctamente y mostrar el título', () => {
    // Verificar que el título principal está visible
    cy.contains('Veterinaria Cuidado Animal').should('be.visible')
    
    // Verificar que el subtítulo está presente
    cy.contains('Sistema de Gestión de Citas y Pacientes').should('be.visible')
    
    // Verificar que el menú está presente
    cy.contains('Menú Principal').should('be.visible')
    
    // Verificar que el footer está presente
    cy.contains('© 2025 Veterinaria Cuidado Animal').should('be.visible')
  })

  it('E2E-2: Debe mostrar todas las opciones del menú lateral', () => {
    // Verificar que todas las opciones del menú están visibles
    cy.contains('Citas').should('be.visible')
    cy.contains('Ver Clientes').should('be.visible')
    cy.contains('Ver Mascotas').should('be.visible')
  })

  it('E2E-3: Debe mostrar página de bienvenida con tarjetas informativas', () => {
    // Verificar mensaje de bienvenida
    cy.contains('Bienvenido a Veterinaria Cuidado Animal').should('be.visible')
    
    // Verificar que las 3 tarjetas informativas están presentes
    cy.contains('Citas').should('be.visible')
    cy.contains('Clientes').should('be.visible')
    cy.contains('Mascotas').should('be.visible')
  })

  it('E2E-4: Debe navegar a citas del 18 de diciembre y mostrar citas', () => {
    // Click en la opción de citas en el menú
    cy.get('.side-menu').contains('Citas').click()
    
    // Verificar que se muestra el menú de selección de fechas
    cy.contains('Selecciona el día para ver las citas', { timeout: 5000 }).should('be.visible')
    
    // Click en la opción del 18 de diciembre
    cy.contains('Miércoles 18 de Diciembre').click()
    
    // Esperar a que se carguen las citas
    cy.contains('miércoles', { timeout: 10000 }).should('be.visible')
    
    // Verificar que se muestran citas
    cy.get('.cita-card', { timeout: 5000 }).should('have.length.greaterThan', 0)
    
    // Verificar que no hay más de 8 citas
    cy.get('.cita-card').should('have.length.lessThan', 9)
    
    // Verificar que se muestra información completa de una cita
    cy.contains('Veterinario:').should('be.visible')
    cy.contains('Mascota:').should('be.visible')
    cy.contains('Dueño:').should('be.visible')
  })

  it('E2E-5: Debe navegar entre diferentes días de citas', () => {
    // Ir al menú de citas
    cy.get('.side-menu').contains('Citas').click()
    cy.contains('Selecciona el día para ver las citas', { timeout: 5000 }).should('be.visible')
    
    // Navegar a citas del 19 de diciembre
    cy.contains('Jueves 19 de Diciembre').click()
    cy.contains('jueves', { timeout: 10000 }).should('be.visible')
    cy.get('.cita-card', { timeout: 5000 }).should('have.length.greaterThan', 0)
    
    // Volver al menú de citas
    cy.get('.side-menu').contains('Citas').click()
    
    // Navegar a citas del 20 de diciembre
    cy.contains('Viernes 20 de Diciembre').click()
    cy.contains('viernes', { timeout: 10000 }).should('be.visible')
    cy.get('.cita-card', { timeout: 5000 }).should('have.length.greaterThan', 0)
    
    // Volver al menú de citas
    cy.get('.side-menu').contains('Citas').click()
    
    // Navegar a citas del 21 de diciembre
    cy.contains('Sábado 21 de Diciembre').click()
    cy.contains('sábado', { timeout: 10000 }).should('be.visible')
    cy.get('.cita-card', { timeout: 5000 }).should('have.length.greaterThan', 0)
  })

  it('E2E-6: Debe navegar a la lista de clientes', () => {
    // Click en Ver Clientes
    cy.contains('Ver Clientes').click()
    
    // Verificar que se muestra el título
    cy.contains('Lista de Clientes', { timeout: 10000 }).should('be.visible')
    
    // Verificar que se muestran clientes
    cy.get('.cliente-card', { timeout: 5000 }).should('have.length.greaterThanOrEqual', 8)
    
    // Verificar que se muestra información del cliente
    cy.get('.cliente-card').first().within(() => {
      cy.get('h3').should('exist')
      cy.contains('📞').should('exist')
      cy.contains('📍').should('exist')
    })
  })

  it('E2E-7: Debe navegar a la lista de mascotas', () => {
    // Click en Ver Mascotas
    cy.contains('Ver Mascotas').click()
    
    // Verificar que se muestra el título
    cy.contains('Lista de Mascotas', { timeout: 10000 }).should('be.visible')
    
    // Verificar que se muestran mascotas
    cy.get('.mascota-card', { timeout: 5000 }).should('have.length.greaterThanOrEqual', 10)
    
    // Verificar que se muestra información de la mascota
    cy.get('.mascota-card').first().within(() => {
      cy.contains('Especie:').should('exist')
      cy.contains('Raza:').should('exist')
      cy.contains('Edad:').should('exist')
      cy.contains('Ver Historial').should('exist')
    })
  })
})

