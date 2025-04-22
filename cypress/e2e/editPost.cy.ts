import 'cypress-real-events';
describe('create post', () => {
  const username = 'victoriaegido'
  const password = 'holaqTal333'
  const nuevoTitulo = 'Título editado Cypress'
  before(() => {
      cy.visit('/login')
      cy.get('input[name="name"]').type(username)
      cy.get('input[name="password"]').type(password)
      cy.get('.go-button-container').find('button').click()
      cy.wait(2000)
  })
  it('Edit post', () => {
    cy.get('.post-card').first().as('post');

    cy.get('@post').realHover().within(() => {
      cy.get('button.go-button--submit')
        .should('be.visible')
        .click();
    });

    cy.url().should('match', /\/editar\/\d+$/);

    cy.get('[data-cy="title"]').clear().type(nuevoTitulo);
    cy.get('button.go-button--submit').click();

    cy.url().should('include', '/');
    cy.get('[data-cy="searchBar"]').type('cypress')
      cy.get('[data-cy="postTitle"]').should('have.length.gt', 0).each(($title) => {
        expect($title.text().toLowerCase()).to.include('cypress');
  });
  })
})