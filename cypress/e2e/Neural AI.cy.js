describe('XenonStack Neural AI Page E2E Test', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('Cannot read properties of undefined')) {
          return false;  
        }
        return true;
    });

    const validateImageRendering = (imageSelector) => {
        cy.get(imageSelector, { timeout: 10000 })
          .find('img') 
          .should('be.visible') 
          .and(($img) => {
            const imgSrc = $img.attr('src');
            expect(imgSrc).to.not.be.empty;
            const imgSrcSet = $img.attr('srcset');
            expect(imgSrcSet).to.not.be.empty;
            expect($img[0].naturalWidth).to.be.greaterThan(0);
          });
      };
    const validateBackgroundImageRendering = (selector) => {
        cy.get(selector, { timeout: 10000 })
          .should('have.css', 'background-image')
          .and('not.be.empty')
          .then((backgroundImage) => {
            const imageUrl = backgroundImage.split('url("')[1].split('")')[0];
            cy.request(imageUrl).its('status').should('eq', 200);
          });
      };
      
    
    
    const validateImageRenderinglink = (imageSelector) => {
        cy.get(imageSelector)
            .should('be.visible')
            .and('have.attr', 'src')
            .then((src) => {
                cy.request(src).its('status').should('eq', 200);
            });
    };
    
    
    const validateUrlRedirect = (buttonSelector, expectedUrl) => {
        cy.get(buttonSelector, { timeout: 10000 })
            .should('be.visible')
            .and('have.attr', 'href')
            .then((href) => {
                cy.request(href).its('status').should('eq', 200);
                cy.get(buttonSelector).click();
                cy.url().should('include', expectedUrl);
            });
    };
    
      beforeEach(() => {
        cy.intercept('GET', 'https://px.ads.linkedin.com/attribution_trigger*', {
          statusCode: 204,
          body: {},  
        }).as('linkedinPixel');
    
        cy.intercept('GET', 'https://app.hubspot.com/content-tools-menu/api/v1/tools-menu/has-permission-json*', {
          statusCode: 200,
          body: {}, 
        }).as('hubspotAPI');
    
        cy.visit('https://www.xenonstack.com/neural-ai/');
        cy.viewport(1280, 720); 
        cy.viewport('macbook-15')
      });

    it('should verify the Title text and platform Engineering main section', () => {
        cy.validateText('h1', 'Accelerate, Optimize and Scale the Data and AI Initiatives');
        cy.contains("Accelerate the pace, optimize resources, and scale operations to propel your data and AI initiatives forward, unlocking innovation, driving transformative outcomes, and achieving digital transformation in your organization's journey toward success").should('be.visible');
        validateImageRendering('.banner-content-wrapper');
    });

    it('should verify Drive Innovation Forward button', () => {
        cy.get('.banner-cta-button')
          .invoke('text')
          .should('match', /Drive Innovation Forward/); 

        cy.get('.banner-button')
          .click({ force: true });
        cy.validateButton('.banner-button', 'https://www.xenonstack.com/readiness-assessment/');
    });
    

});