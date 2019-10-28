describe('FormDynamic', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9008/#/Components/FormDynamic')
  })

  describe('Dynamic fields example form', () => {
    it('nothing touched then submit disabled', () => {
      cy.get('[data-tid="button-dynamic-submit"]').should('be.disabled')
    })

    it('clicking first toggle', () => {
      cy.get('[data-tid="toggle-dynamic-fields"] button:first-child').trigger(
        'click'
      )
      cy.get('[data-tid="field-1-text-input"]').should('be.visible')
      cy.get('[data-tid="field-2-text-input"]').should('not.be.visible')
      cy.get('[data-tid="button-dynamic-submit"]').should('not.be.disabled')
    })

    it('clicking second toggle', () => {
      cy.get('[data-tid="toggle-dynamic-fields"] button:last-child').trigger(
        'click'
      )
      cy.get('[data-tid="field-1-text-input"]').should('not.be.visible')
      cy.get('[data-tid="field-2-text-input"]').should('be.visible')
      cy.get('[data-tid="button-dynamic-submit"]').should('not.be.disabled')
    })
  })

  describe('Hiding dynamic fields', () => {
    it('nothing touched then submit disabled', () => {
      cy.get('[data-tid="button-dynamic-submit2"]').should('be.disabled')
    })

    it('unhidden fields that are untouched disable submit', () => {
      cy.get('[data-tid="toggle-dynamic-fields2"] button:first-child').trigger(
        'click'
      )
      cy.get('[data-tid="toggled-buttons2"]').should('be.visible')
      cy.get('[data-tid="button-dynamic-submit2"]').should('be.disabled')
    })

    it('hidden fields do not prevent form validity', () => {
      cy.get('[data-tid="toggle-dynamic-fields2"] button:last-child').trigger(
        'click'
      )
      cy.get('[data-tid="toggled-buttons2"]').should('not.be.visible')
      cy.get('[data-tid="button-dynamic-submit2"]').should('not.be.disabled')
    })
  })
})
