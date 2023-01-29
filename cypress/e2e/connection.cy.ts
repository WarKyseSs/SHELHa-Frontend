describe('Connection', () => 
{
  it('user(admin) can connect', () => 
  {
    //log before test (test plus unitaire ?)
    cy.visit('https://localhost:4200/connection');
    cy.get('form').should('be.visible'); // form should be visible
    cy.get('input[formControlName=username]').type('admin'); // type in username field
    cy.get('input[formControlName=password]').type('*Banane1'); // type in password field
    cy.get('input[type=submit]').click(); // submit form

    cy.wait(3000); // wait for connection to finish
    cy.url().should('include', '/index'); // check that user is redirected to index
  })
})