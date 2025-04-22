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
      cy.url().should('include', '/')
      cy.get('[data-cy="searchBar"]').type('prueba')
      cy.get('[data-cy="postTitle"]').should('have.length.gt', 0).each(($title) => {
        expect($title.text().toLowerCase()).to.include('prueba');
  });
  })
})