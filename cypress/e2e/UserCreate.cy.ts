describe('Signup form test', function() {
  beforeEach(function() {
    // Visit the signup page before each test
    cy.visit('https://localhost:4200/registration');
  });

  it('Verifies that the form is present', function() {
    // Check that the signup form is present on the page
    cy.get('form').should('be.visible');
  });

  it('Verifies that the form controls are present', function() {
    // Check that all form controls are present on the page
    cy.get('#signup-form input[formControlName="username"]').should('be.visible');
    cy.get('#signup-form input[formControlName="lastname"]').should('be.visible');
    cy.get('#signup-form input[formControlName="firstname"]').should('be.visible');
    cy.get('#signup-form input[formControlName="mailaddress"]').should('be.visible');
    cy.get('#signup-form input[formControlName="password"]').should('be.visible');
    cy.get('#signup-form select[formControlName="implantation"]').should('be.visible');
    cy.get('#signup-form input[type="submit"]').should('be.visible');
  });

  it('Verifies that the form validation messages are displayed', function() {
    // Submit the form with invalid data and check that the validation messages are displayed
    cy.get('#signup-form input[formControlName="username"]').type('Michel');
    cy.get('#signup-form input[formControlName="lastname"]').type('Michel');
    cy.get('#signup-form input[formControlName="firstname"]').type('Michel');
    cy.get('#signup-form input[formControlName="mailaddress"]').type('12@za.3');
    cy.get('#signup-form div:contains("Please enter a valid email address!")').should('be.visible');
    cy.get('#signup-form input[formControlName="password"]').type('Michel123');
    cy.get('#signup-form div:contains("Please enter a valid password!")').should('be.visible');
  });

  it('Verifies that the form can be submitted with valid data', function() {
    // Fill out the form with valid data and submit it
    cy.get('#signup-form input[formControlName="username"]').type('Michel');
    cy.get('#signup-form input[formControlName="lastname"]').type('Michel');
    cy.get('#signup-form input[formControlName="firstname"]').type('Michel');
    cy.get('#signup-form input[formControlName="mailaddress"]').type('Michel@outlook.com');
    cy.get('#signup-form input[formControlName="password"]').type('Michel123&');
    cy.get('#signup-form select[formControlName="implantation"]').select('Mons');
    cy.get('#signup-form').submit();

    // Check that the user is redirected to the registration confirmation page
    cy.url().should('include', '/connection');
  });
});