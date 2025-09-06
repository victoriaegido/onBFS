describe('create post', () => {
  const username = 'victoriaegido'
  const password = 'holaqTal333'
  const comentario = 'Prueba cypress';
  before(() => {
      cy.visit('/login')
      cy.get('input[name="name"]').type(username)
      cy.get('input[name="password"]').type(password)
      cy.get('.go-button-container').find('button').click()
      cy.wait(2000)
  })
  it('Comment post', () => {
    cy.url().should('include', '/')
    cy.get('.post-card').first().click();             
    cy.url().should('match', /\/comentario\/\d+$/)  

    
    cy.get('[data-cy="commentInput"]')
      .should('be.visible')
      .type(comentario);

    cy.get('.buttoncreatecomment').find('button').click()

    
    cy.get('[data-cy="commentCard"]')
      .should('contain.text', comentario)
  })
})