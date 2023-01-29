describe('New post form test', function() {
  beforeEach(function() {
    // Login to the application before each test
  cy.visit('https://localhost:4200/connection');
  cy.get('form').should('be.visible'); // form should be visible
  cy.get('input[formControlName=username]').type('admin'); // type in username field
  cy.get('input[formControlName=password]').type('*Banane1'); // type in password field
  cy.get('input[type=submit]').click(); // submit form

  cy.wait(3000); // wait for connection to finish
  cy.url().should('include', '/index'); // check that user is redirected to index
  cy.visit('https://localhost:4200/forum/section-informatique-de-gestion');
  });

  it('Verifies that the form is shown when the "New Post" button is clicked', function() {
    // Click on the "New post" button and check that the post creation form is displayed
    cy.get('.actionForms button:contains("Nouveau Post")').click();
    cy.get('.registr-box').should('be.visible');
  });

  it('Verifies that the form controls are present', function() {
    // Display the post creation form and check that all form controls are present
    cy.get('.actionForms button:contains("Nouveau Post")').click();
    cy.get('.registr-box select[formControlName="idCat"]').should('be.visible');
    cy.get('.registr-box input[formControlName="sujet"]').should('be.visible');
    cy.get('.registr-box textarea[formControlName="message"]').should('be.visible');
    cy.get('.registr-box input[type="submit"]').should('be.visible');
  });

  it('Verifies that the form can be submitted with valid data', function() {
    // Display the post creation form and fill it in with valid data
    cy.get('.actionForms button:contains("Nouveau Post")').click();
    cy.get('.registr-box select[formControlName="idCat"]').select('Section informatique de gestion');
    cy.get('.registr-box input[formControlName="sujet"]').type('Test post');
    cy.get('.registr-box textarea[formControlName="message"]').type('This is a test post.');

    //  Submit the form and check that the user is redirected to the post viewing page
    cy.get('form').submit();
  });
});