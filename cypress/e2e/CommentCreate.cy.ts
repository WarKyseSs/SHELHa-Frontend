describe('Comment form test', function() {
  beforeEach(function() {
    // Login to the application before each test
  cy.visit('https://localhost:4200/connection');
  cy.get('form').should('be.visible'); // form should be visible
  cy.get('input[formControlName=username]').type('admin'); // type in username field
  cy.get('input[formControlName=password]').type('*Banane1'); // type in password field
  cy.get('input[type=submit]').click(); // submit form

  cy.wait(3000); // wait for connection to finish
  cy.url().should('include', '/index'); // check that user is redirected to index

    // Visit a post page before each test
    cy.visit('https://localhost:4200/forum/section-informatique-de-gestion/gestion-de-bases-de-donnees-relationnelles-en-informatique-de-gestion');
  });

  it('Verifies that the form controls are present', function() {
    // Check that all the controls on the comment form are present
    cy.get('.comment textarea[formControlName="message"]').should('be.visible');
    cy.get('.comment input[type="submit"]').should('be.visible');
  });

  it('Verifies that the form can be submitted with valid data', function() {
    // Fill in the comment form with valid data and submit it
    cy.get('.comment textarea[formControlName="message"]').type('This is a test comment.');
    cy.get('form').submit();

    // Check that the comment is displayed on the page
    cy.get('.comments').should('contain', 'This is a test comment.');
  });
});