/**does the test remain unitary, despite the fact that we must connect before  ?*/
beforeEach(() => 
{
  cy.visit('https://localhost:4200/connection');
  cy.get('form').should('be.visible'); // form should be visible
  cy.get('input[formControlName=username]').type('admin'); // type in username field
  cy.get('input[formControlName=password]').type('*Banane1'); // type in password field
  cy.get('input[type=submit]').click(); // submit form

  cy.wait(3000); // wait for connection to finish
  cy.url().should('include', '/index'); // check that user is redirected to index
});


//test display of old message
describe('Message list', () => 
{
  it('should be displayed and contain correct messages', () => 
  {
    cy.visit('https://localhost:4200/user/conversation/list/jardinage-18-12-2022');
    cy.get('.chat').should('be.visible'); // chat should be visible
    cy.get('.chat .message:last-child .sender-name').should('have.text', 'Flaamby'); // first message should be from Flaamby (last in the list)
    cy.get('.chat .message:last-child .message-text').should('have.text', 'Bonjour, tu as déjà fait du jardinage ?'); // first message should have correct text
  });
});

//test add a new message
describe('Message form', () => 
{
  it('should submit correctly and add message to list', () => 
  {
    cy.visit('https://localhost:4200/user/conversation/list/jardinage-18-12-2022');
    cy.get('form input[formControlName=message]').type('Hello World'); // type in message field
    cy.get('form button[type=submit]').click(); // submit form
    cy.get('.chat .message:last-child .sender-name').should('have.text', 'Flaamby'); // first message should be from Flaamby 
    cy.get('.chat .message:last-child .message-text').should('have.text', 'Bonjour, tu as déjà fait du jardinage ?'); // last message should have correct text
  });
});


//test quit messages list 
describe('Back button', () => 
{
  it('should navigate back to conversation list', () => 
  {
    cy.visit('https://localhost:4200/user/conversation/list/jardinage-18-12-2022');
    cy.get('.floating-button').click(); // click back button
    cy.url().should('include', '/conversation/list'); // should navigate to conversation list
  });
});

