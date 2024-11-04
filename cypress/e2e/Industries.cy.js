describe('XenonStack Industries Page E2E Test', () => {

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
      
    
    const selectors = {
        mainHeading: 'h1',
        subHeading: 'h2',
        paragraphs: 'p',
        buttons: 'a.btn-primary',  
        images: 'img',
        videos: 'video',
        links: 'a',
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
    
        cy.visit('https://www.xenonstack.com/industries/');
        cy.viewport(1280, 720); 
        cy.viewport('macbook-15')
      });

// **Section 1: Hero Banner**
        describe('Hero Banner Section', () => {
          it('should display the title, CTA button, and background image correctly', () => {
              cy.get('h1').should('contain.text', 'Industry 6.0 - AutonomousOps with Human + AI Intelligence').should('be.visible');
              cy.get('p').contains('Intelligent systems that can operate autonomously').should('be.visible');
              cy.get('a').contains('Transform Now').should('be.visible');
              validateImageRendering('.hero-banner-image'); // Replace with actual selector
          });
      });
  
// **Section 2: Driving Technology as an Enabler**
describe('Driving Technology Section', () => {
  it('should display each feature with heading, icon, and paragraph', () => {
              cy.get('.feature-section').within(() => {
                  cy.get('h3').contains('Predictive maintenance').should('be.visible');
                  cy.get('p').contains('Improves machine uptime and performance').should('be.visible');
                  validateImageRendering('.predictive-maintenance-icon'); // Replace with actual selector
  
                  cy.get('h3').contains('Factory Automation').should('be.visible');
                  cy.get('p').contains('Automated operations reduce costs').should('be.visible');
                  validateImageRendering('.factory-automation-icon'); // Replace with actual selector
  
                  cy.get('h3').contains('Digital Twin Metaverse Enterprise').should('be.visible');
                  cy.get('p').contains('Real-time visualization for data').should('be.visible');
                  validateImageRendering('.digital-twin-icon'); // Replace with actual selector
              });
          });
      });
       // **Section 3: Industry 5.0**
    describe('Industry 5.0 Section', () => {
      it('should display the Industry 5.0 circle image and accompanying text', () => {
          cy.get('h2').contains('How Digital Twin, Augmented Reality and Metaverse Driving Industry 5.0').should('be.visible');
          cy.get('p').contains('Intelligent Cloud and Edge AI').should('be.visible');
          validateButtonRedirect('a:contains("Industry Services")', '/industry-services');
          validateImageRendering('.industry-5-circle-image'); // Replace with actual image selector
      });
  });
});

  // **Section 4: How we will help you in transformation**
  describe('Transformation Assistance Section', () => {
      it('should display section title and description', () => {
          cy.get('h2').contains('How we will help you in transformation').should('be.visible');
          cy.get('p').contains('With our assistance, you can navigate the challenges').should('be.visible');
      });

      it('should validate each capability box - heading, icon, and description', () => {
          cy.get('.capabilities-section').within(() => {
              // **Experience**
              cy.get('.experience-box').within(() => {
                  cy.get('h3').contains('Experience').should('be.visible');
                  cy.get('p').contains('Building an experience-first driven strategy').should('be.visible');
                  validateImageRendering('.experience-icon'); // Replace with actual selector
              });

              // **Insights**
              cy.get('.insights-box').within(() => {
                  cy.get('h3').contains('Insights').should('be.visible');
                  cy.get('p').contains('Empowering intelligent products and data-driven platforms').should('be.visible');
                  validateImageRendering('.insights-icon'); // Replace with actual selector
              });

              // **Secure**
              cy.get('.secure-box').within(() => {
                  cy.get('h3').contains('Secure').should('be.visible');
                  cy.get('p').contains('Revolutionizing Security operations').should('be.visible');
                  validateImageRendering('.secure-icon'); // Replace with actual selector
              });

              // **Agility**
              cy.get('.agility-box').within(() => {
                  cy.get('h3').contains('Agility').should('be.visible');
                  cy.get('p').contains('Accelerating Digital Transformation with Agile Framework').should('be.visible');
                  validateImageRendering('.agility-icon'); // Replace with actual selector
              });

              // **Experimentations**
              cy.get('.experimentations-box').within(() => {
                  cy.get('h3').contains('Experimentations').should('be.visible');
                  cy.get('p').contains('Incorporating a culture of experimentation').should('be.visible');
                  validateImageRendering('.experimentations-icon'); // Replace with actual selector
              });
          });
      });
  
  
      // **Section 4: Digital Core Capabilities**
      describe('Digital Core Capabilities Section', () => {
          it('should verify headings, icons, descriptions, and clickable buttons for each industry', () => {
              cy.get('.digital-core-section').within(() => {
                  cy.get('h2').contains('Digital Core Capabilities').should('be.visible');
  
                  // Enterprise Technology Section
                  cy.get('h3').contains('Enterprise Technology').should('be.visible');
                  cy.get('p').contains('Empowering digital infrastructure').should('be.visible');
                  validateImageRendering('.enterprise-technology-icon');
                  validateUrlRedirect('a:contains("Explore Now")', '/enterprise-technology');
  
                  // Banking and Financial Section
                  cy.get('h3').contains('Banking and Financial sector').should('be.visible');
                  cy.get('p').contains('Empowering secure transactions').should('be.visible');
                  validateImageRendering('.banking-financial-icon');
                  validateUrlRedirect('a:contains("Discover More")', '/banking-financial');
  
                  // Additional sections here
              });
          });
      });
  
      // **Section 5: Embracing Industry 6.0**
      describe('Embracing Industry 6.0 Section', () => {
          it('should validate headings, descriptions, icons, and Explore Further buttons', () => {
              cy.get('.industry-embracing-section').within(() => {
                  cy.get('h2').contains('Embracing Industry 6.0').should('be.visible');
                  cy.get('p').contains('Empowering enterprises with AI').should('be.visible');
  
                  // Sustainability Section
                  cy.get('h3').contains('Sustainability and Environmental Benefits').should('be.visible');
                  validateImageRendering('.sustainability-icon');
                  validateUrlRedirect('a:contains("Explore Further")', '/sustainability-environmental');
  
                  // Smart Building Section
                  cy.get('h3').contains('Smart Building Innovations').should('be.visible');
                  validateImageRendering('.smart-building-icon');
                  validateUrlRedirect('a:contains("Explore Further")', '/smart-building-innovations');
  
                  // Predictive Analytics Section
                  cy.get('h3').contains('Predictive Analytics and Automation').should('be.visible');
                  validateImageRendering('.predictive-analytics-icon');
                  validateUrlRedirect('a:contains("Explore Further")', '/predictive-analytics');
              });
          });
      });
  
      // **Section 6: Human + AI Capabilities**
      describe('Human + AI Capabilities Section', () => {
          it('should validate images, heading, and description', () => {
              cy.get('.human-ai-capabilities').within(() => {
                  cy.get('h3').contains('Tap into the capabilities of Human + AI').should('be.visible');
                  cy.get('p').contains('Human + AI capabilities empower').should('be.visible');
                  validateImageRendering('.human-ai-image'); // Adjust selector as needed
              });
          });
      });
  
      // **All Buttons Test**
      describe('Button Functionality Test', () => {
          it('should verify all buttons are clickable and redirect correctly', () => {
              cy.get('a').each(($btn) => {
                  const url = $btn.attr('href');
                  if (url) {
                      cy.request(url).its('status').should('eq', 200);
                  }
              });
          });
      });
  
      // **All Images Test**
      describe('Image Rendering Test', () => {
          it('should ensure all images load correctly', () => {
              cy.get('img').each(($img) => {
                  cy.wrap($img).should('be.visible')
                      .and(($imgEl) => {
                          expect($imgEl[0].naturalWidth).to.be.greaterThan(0);
                      });
              });
          });
      });
  
      // **Responsive Design Tests**
      describe('Responsiveness Tests', () => {
          it('should display content correctly on mobile view', () => {
              cy.viewport('iphone-6');
              cy.get('h1').should('contain.text', 'Industry 6.0 - AutonomousOps with Human + AI Intelligence').should('be.visible');
              cy.get('a').contains('Transform Now').should('be.visible');
              cy.get('.feature-section').within(() => {
                  cy.get('h3').should('be.visible');
                  cy.get('p').should('be.visible');
              });
          });
      });
  });
