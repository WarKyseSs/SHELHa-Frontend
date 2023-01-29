describe('Article list', () => 
{
  it('should be displayed and contain correct articles', () => 
  {
    cy.visit('https://localhost:4200/articles');
    cy.get('.articles').should('be.visible'); // articles should be visible
    cy.get('.articles .article').should('have.length', 5); // there should be 5 articles
    cy.get('.articles .article:first-child .titleArticle').should('have.text', 'Forum carrière à la HELHa : venez rencontrer nos partenaires et découvrir les opportunités de stage et d\'emploi'); // first article should have correct title (coucou)
  });
});

describe('Article page', () => 
{
  it('should display correct article information', () => 
  {
    cy.visit('https://localhost:4200/articles/resultats-examens-fin-annee-helha');
    cy.get('.article').should('be.visible'); // article should be visible
    cy.get('.article-title').should('have.text', 'Résultats des examens de fin d\'année à la HELHa'); // article title should be correct
    cy.get('.article-datePublication').should('have.text', '20/07/2022 - 18:00'); // article date should be correct
    cy.get('.article-description').should('have.text', 'Voici les résultats des examens de fin d\'année de la HELHa pour l\'année scolaire 2021-2022'); // article description should be correct
    cy.get('.article-author').should('have.text', 'Auteur : RFeno'); // article author should be correct
  });
});


