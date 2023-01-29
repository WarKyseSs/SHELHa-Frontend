
//test form to create a conversation 
describe('Conversation form', () => 
{
  /**does the test remain unitary, despite the fact that we must connect before  ?*/
  beforeEach(() => 
  {
    //log before test (test plus unitaire ?)
    cy.visit('https://localhost:4200/connection');
    cy.get('form').should('be.visible'); // form should be visible
    cy.get('input[formControlName=username]').type('admin'); // type in username field
    cy.get('input[formControlName=password]').type('*Banane1'); // type in password field
    cy.get('input[type=submit]').click(); // submit form

    cy.wait(3000); // wait for connection to finish
    cy.url().should('include', '/index'); // check that user is redirected to index
  });

  it('should be displayed and submit correctly', () => 
  {

    

    cy.visit('https://localhost:4200/user/conversation/list');
    cy.get('.float-button').click(); // open form
    cy.get('form').should('be.visible'); // form should be visible
    cy.get('input[formControlName=usernameOfReceiver]').type('Hakki'); // type in username field
    cy.get('input[formControlName=subject]').type('Test conversation'); // type in subject field
    cy.get('input[formControlName=message]').type('Hello World'); // type in message field
    cy.get('button[type=submit]').click(); // submit form
    cy.contains('La conversation a bien été crée !'); // success message should be displayed
  
  });
});