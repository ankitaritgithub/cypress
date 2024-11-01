describe('XenonStack Contact Us Page E2E Test', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('Cannot read properties of undefined')) {
          return false;  
        }
        return true;
      });
    
    const validateInputField = (selector, value) => {
      cy.get(selector).should('be.visible').type(value).should('have.value', value);
    };
  
    const validateDropdown = (selector, optionToSelect, expectedValue) => {
        cy.get(selector)
          .should('be.visible')  
          .then(($select) => {
            const options = Array.from($select[0].options).map(option => option.value);
            cy.log('Available options: ', options);      
            if (options.includes(optionToSelect)) {
              
              cy.get(selector)
                .select(optionToSelect)
                .should('have.value', expectedValue);  
            } else {
              
              throw new Error(`Option with value "${optionToSelect}" not found in dropdown. Available options: ${options.join(', ')}`);
            }
          });
      };

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
    
        cy.visit('https://xenonstack.com/contact-us/');
      });
  
    it('Should load the contact form and validate fields', () => {
        cy.get('form', { timeout: 10000 }).should('be.visible');
      
        validateInputField('input[name="Firstname"]', 'Demo');
        validateInputField('input[name="lastname"]', 'Demo');
        validateInputField('input[name="email"]', 'demo@xenonstack.com');
        validateInputField('input[name="Company Name*"]', 'XenonStack');
        validateInputField('input[name="Phone Number*"]', '1234567890');
        validateDropdown('select[name="jobFunction"]', 'VP / Director', 'VP / Director');
        validateDropdown('select[name="country"]', 'Afganistan', 'Afganistan'); 
        validateDropdown('select[name="industry"]', 'Aerospace', 'Aerospace'); 
      
        cy.get('#next-1').click();
      });
      
      it('Should show validation error for required fields', () => {
        cy.get('form').should('be.visible');
        cy.get('#next-1').should('be.visible').click();
        cy.wait(2000);
        cy.get('.error-message').should('exist');
        // cy.get('.error-message').contains('First Name is not Valid').should('be.visible');
        // cy.get('.error-message').contains('Last Name is required').should('be.visible');
        // cy.get('.error-message').contains('Email is required').should('be.visible');
        // cy.get('.error-message').contains('Company Name is required').should('be.visible');
        // cy.get('.error-message').contains('Phone Number is required').should('be.visible');
    });

    it('Should load the contact form and validate fields with invalid data', () => {
        cy.get('form', { timeout: 10000 }).should('be.visible');
      
        validateInputField('input[name="Firstname"]', '12');
        cy.contains('First Name is not Valid').should('be.visible');
      
        validateInputField('input[name="lastname"]', '12');
        cy.contains('Last name is not Valid').should('be.visible');
      
        validateInputField('input[name="email"]', '+++++++@gmail.com');
        cy.contains('Email is not Valid').should('be.visible');
      
        validateInputField('input[name="Company Name*"]', '*');
        cy.contains('Company name is not Valid').should('be.visible');
      
        validateInputField('input[name="Phone Number*"]', 'abcde');
        cy.contains('Phone Number is not valid').should('be.visible');
      
        cy.get('#next-1').click();
        cy.get('form').should('be.visible');
    });

    it('Validates subheadings and sections text', () => {
        cy.get(selectors.subHeading).eq(0).should('be.visible')
          .and('contain.text', 'We are Happy to help you!')
          .and('have.css', 'text-align', 'start');
        cy.get(selectors.subHeading).eq(1).should('be.visible')
          .and('contain.text', 'Contact Us form')
          .and('have.css', 'text-align', 'center');  
        cy.get(selectors.subHeading).eq(2).should('be.visible')
          .and('contain.text', 'Empower Transformation with Generative AI')
          .and('have.css', 'text-align', 'start');
        cy.get(selectors.subHeading).eq(3).should('be.visible')
          .and('contain.text', 'Driving data-centric and intelligent outcomes')
          .and('have.css', 'text-align', 'start');
        cy.get(selectors.subHeading).eq(4).should('be.visible')
          .and('contain.text', 'Platform Engineering Services');
        cy.get(selectors.subHeading).eq(5).should('be.visible')
          .and('contain.text', 'Generative AI services');
        cy.get(selectors.subHeading).eq(6).should('be.visible')
          .and('contain.text', 'Business Transformation'); 
        cy.get(selectors.subHeading).eq(7).should('be.visible')
        .and('contain.text', 'Find our XenonStack office')  
      });
    
describe('Empower Transformation with Generative AI', () => {

    it('Validates the Generative AI section layout and content', () => {
        cy.get('h2').contains('Empower Transformation with Generative AI').should('be.visible');
        cy.contains('Unleash boundless innovation potential with Generative AI').should('be.visible');
        cy.get('a').contains('Explore Now').should('be.visible');
        validateImageRendering('.col-12.col-sm-6.col-md-4.col-lg-4'); 
    });

    it('Validates the Explore Now button URL redirection', () => {
        cy.get('.mid-banner-cta a p')
          .contains('Explore Now')
          .click();
        cy.url().should('eq', 'https://www.xenonstack.com/readiness-assessment/generative-ai'); 
    });
});  

describe('Driving data-centric and intelligent outcomes', () => {


    it('Validates the Platform Engineering Services section', () => {
        cy.checkVisibility('h2', 'Platform Engineering Services');
        cy.validateText('h2', 'Platform Engineering Services').should('be.visible'); 
        cy.validateText('p', "Xenonstack's Composable Architecture fosters Internal Developer Platforms, streamlining business apps. Cloud Native Digital Platform Engineering empowers core processes, driving innovation.").should('be.visible');
        validateImageRendering('.five-card-outer-wrapper');
        validateImageRenderinglink('img[alt="XenonStack\'s composable architecture for internal developer platforms streamlining business apps and empowering cloud-native digital platform engineering."]'); 
        validateUrlRedirect('a:contains("Discover Further")', 'https://www.xenonstack.com/platform-engineering/');
    });
    
    it('Validates the Generative AI Services section', () => {
        cy.checkVisibility('h2', 'Generative AI services').should('be.visible');
        cy.validateText('h2', 'Generative AI services').should('be.visible'); 
        cy.validateText('p', "Empower your business with XenonStack's cutting-edge Generative AI services, driving innovation, efficiency, and growth through advanced AI-powered solutions.").should('be.visible');
        validateImageRendering('.five-card-outer-wrapper');
        validateImageRenderinglink('img[alt="XenonStack\'s generative AI services empowering businesses with advanced AI solutions for innovation, efficiency, and growth."]');
        validateUrlRedirect('a:contains("Talk To Specialist")', 'https://www.xenonstack.com/talk-to-specialist/generative-ai/'); 
    });
    
    it('Validates the Business Transformation section', () => {
        cy.checkVisibility('h2','Business Transformation').should('be.visible');
        cy.validateText('h2', 'Business Transformation').should('be.visible'); 
        cy.validateText('p', "Looking for Technology Consulting and Advisory services for defining enterprise architecture, modernisation and roadmap.").should('be.visible');
        validateImageRendering('.five-card-outer-wrapper');
        validateImageRenderinglink('img[alt="Technology consulting and advisory services for business transformation, defining enterprise architecture, modernization, and strategic roadmaps."]');  
        validateUrlRedirect('a:contains("Get Assessment")', 'https://www.xenonstack.com/readiness-assessment/'); 
    });
    
    });
describe('Find our XenonStack office', () => {

});
});

    
    
    
    
  