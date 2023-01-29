describe('Event list', () => 
{
  it('should be displayed and contain correct events', () => 
  {
    cy.visit('https://localhost:4200/events');
    cy.get('.events').should('be.visible'); // events should be visible
    cy.get('.events .event').should('have.length', 5); // there should be 5 events
    cy.get('.events .event:first-child .titleEvent').should('have.text', 'Conférence sur les enjeux écologiques à la HELHa'); // first event should have correct title
  });
});

/** impossible because we have no more than 2 events in us DATABASE */
/*describe('Pagination', () => {it('should allow changing list size and navigating between pages', () => {});});*/

