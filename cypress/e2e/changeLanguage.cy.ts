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
  it('Search post', () => {
    const breadcrumb = () => cy.get('[data-cy="breadcrumbCreate"]');

    breadcrumb().should('have.text', 'Crear publicación');

    cy.get('[data-cy="switcher"]').click();
    breadcrumb().should('have.text', 'Create post');

    cy.get('[data-cy="switcher"]').click();
    breadcrumb().should('have.text', 'Crear Post');
      
  })
})