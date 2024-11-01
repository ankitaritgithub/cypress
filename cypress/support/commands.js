// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Helper function to check if an element is visible
Cypress.Commands.add('checkVisibility', (selector) => {
    cy.log(`Checking visibility of: ${selector}`);
    cy.get(selector, { timeout: 10000 }) 
      .should('be.visible')
      .then((element) => {
        
        cy.log(`Element ${selector} is visible`);
      });
  });
Cypress.Commands.add('checkImage', (selector) => {
    cy.get(selector)
      .should('be.visible')                
      .and('have.attr', 'src')             
      .and('not.include', 'placeholder');  
});
Cypress.Commands.add('validateLink', (selector, expectedUrl) => {
    cy.get(selector)
      .should('have.attr', 'href')  
      .and('include', expectedUrl)  
      .then((href) => {
        cy.request(href)  
          .its('status')  
          .should('eq', 200);  
      });
  });

Cypress.Commands.add('validateVideo', (selector) => {
    cy.get(selector).should('be.visible');
    cy.get(selector).click();
    cy.get(selector).should('have.prop', 'paused', false);
});
Cypress.Commands.add('validateText', (selector, expectedText) => {
    
    cy.log(`Validating text for: ${selector}`);
    cy.get(selector, { timeout: 10000 }) 
      .should('contain.text', expectedText)
      .then((element) => {
       
        cy.log(`Text validated for ${selector}`);
      });
});

Cypress.Commands.add('validateButton', (selector, buttonText, expectedUrlSubstring) => {
    
    cy.get(selector, { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .and('contain.text', buttonText)
      .scrollIntoView()
      .click({ force: true });
  
    
    cy.wait(2000); 
    
    cy.url().should('include', expectedUrlSubstring);  
  });




  
  
  
  
