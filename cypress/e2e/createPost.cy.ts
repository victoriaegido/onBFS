describe('create post', () => {
  const username = 'victoriaegido'
  const password = 'holaqTal333'
  before(() => {
      cy.visit('/login')
      cy.get('input[name="name"]').type(username)
      cy.get('input[name="password"]').type(password)
      cy.get('.go-button-container').find('button').click()
      cy.wait(2000)
  })
  it('Create post', () => {
      cy.url().should('include', '/')
      cy.get('header').contains('Crear publicación').should('be.visible')
      cy.get('header').contains('Crear publicación').click()
      cy.url().should('include', '/crear')
      cy.get('[data-cy="title"]').type('Título prueba').should('have.value', 'Título prueba')
      cy.get('[data-cy="body"]').type('Funciona prueba front').should('have.value', 'Funciona prueba front')
      cy.get('[data-cy="category"]').select(2);
      cy.get('button.go-button--submit').should('be.visible').and('not.be.disabled').click()
  })
})