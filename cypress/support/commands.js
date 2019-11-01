Cypress.Commands.add('getByTid', (tid) => {
  cy.get(`[data-tid="${tid}"]`)
})
