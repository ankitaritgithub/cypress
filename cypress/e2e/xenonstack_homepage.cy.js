describe('XenonStack Homepage E2E Test', () => {
  const selectors = {
    mainHeading: 'h1',
    subHeading: 'h2',
    paragraphs: 'p',
    buttons: 'a.btn-primary',
    transformNowButtonText: '.banner-cta-button span',  
    transformNowButton: 'div.banner-cta-button',
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

    cy.visit('https://www.xenonstack.com');
    cy.viewport(1280, 720); 
    cy.viewport('macbook-15')
  });

  it('should display the homepage correctly', () => {
    cy.checkVisibility('.banner-heading');
    cy.validateText('.banner-heading', 'Data and AI Foundry for Autonomous Operations');
    cy.validateText('p', "XenonStack Data and AI Foundry is a Composable Platform for businesses to use data, accelerated computing and Software tools to Simplify and Scale Enterprise and Generative AI Journeys.").should('be.visible');
    cy.get('header img[alt="xenonstack-logo"]')  
      .should('be.visible')                     
      .and('have.attr', 'src')                  
      .and('include', 'xenonstack-website-new-logo.svg'); 
  });

  it('validate the page title and meta tags', () => {
    cy.title().should('eq', 'Data and AI Foundry for Autonomous Operations');
    cy.get('meta[name="description"]')
      .should('have.attr', 'content')
      .and('match', /Xenonstack/i);  
  });

  it('Validate the transform now button visibility and its text as well as button funtionality', () => {
    cy.checkVisibility(selectors.transformNowButton);
    cy.validateText(selectors.transformNowButtonText, 'Transform Now'); 
    cy.get(selectors.transformNowButton).should('not.be.disabled');
    // cy.get(selectors.transformNowButton).click();
    cy.validateButton(selectors.transformNowButton, 'Transform Now', 'https://www.xenonstack.com/readiness-assessment/generative-ai'); 
    
  });

  
  it('Validates mainHeading and subheadings and sections text', () => {
    cy.get(selectors.mainHeading).should('be.visible')
      .and('have.text', 'Data and AI Foundry for Autonomous Operations'); 
    cy.get(selectors.subHeading).eq(0).should('be.visible')
      .and('contain.text', 'NeuralAI OS for MultiAgent Systems and Process Orchestration');  
    cy.get(selectors.subHeading).eq(1).should('be.visible')
      .and('contain.text', 'Generative AI in Business Process');
    cy.get(selectors.subHeading).eq(2).should('be.visible')
      .and('contain.text', 'Human and Decision-Centric Approach for Intelligent Outcomes');  
  });

  it('Should validate the footer content and check if social media links are working', () => {
    cy.get('footer').should('be.visible');
    cy.get('footer a').each((link) => {
      cy.request(link.prop('href')).should((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

describe('NeuralAI OS for MultiAgent Systems and Process Orchestration', () => {
  
});  


describe('Generative AI in Business Process', () => {
  
}); 



describe('Human and Decision-Centric Approach for Intelligent Outcomes', () => {

    it('Validates subheading', () => {
        cy.validateText('h2', 'Human and Decision-Centric Approach for Intelligent Outcomes');
    });

    it('Logs all links and checks if the "Experience Excellence" link exists for Automating Software Releases', () => {
      cy.visit('https://www.xenonstack.com');
      cy.get('a').each(($el) => {
        cy.log($el.attr('href'));
      });
      cy.get('a[href="https://www.xenonstack.com/solutions/edge-and-vision-ai/"]', { timeout: 10000 }).should('exist');
    });

    it('checks if the "Experience Excellence" link exists for Analysing Data in Real Time', () => {
      cy.get('a').each(($el) => {
        cy.log($el.attr('href'));
      });
      cy.get('a[href="https://www.xenonstack.com/platform-engineering/progressive-delivery/"]', { timeout: 10000 }).should('exist');
    });

    it('checks if the "Experience Excellence" link exists for Transforming Real Time Experience', () => {
      cy.get('a').each(($el) => {
        cy.log($el.attr('href'));
      });
      cy.get('a[href="https://www.xenonstack.com/solutions/edge-and-vision-ai/"]', { timeout: 10000 }).should('exist');
    });

describe('Agentic AI and Agentic Workflows for Transforming Enterprise Workflows ', () => {
  
    }); 

describe('Building AI-Fueled Organization ', () => {
  
    }); 

describe('Use Cases for Data and AI Foundry for Enterprise AI ', () => {
  
    }); 

describe('How you build Gen AI and Autonomous Operations with Microsoft Stack?', () => {
  
    }); 

describe('Our People, Your Progress', () => {
  
    }); 

describe('With Neural AI Framework, We help clients to adopt GenAI Initiatives and build autonomous Operations at Scale to Drive Intelligent Outcomes and run Businesses with agility and resiliently', () => {
  
    }); 
});
});
    
 



































































    
    
    
    

  //   it('Validates tab navigation', () => {
      
  //     cy.get('.tab-swicther-background', { timeout: 10000 }).should('be.visible');  
  
      
  //     cy.validateText('.tab-swicther-background .tab-item1', 'Automating Software Releases');  
  //     cy.validateText('.tab-swicther-background .tab-item2', 'Analyzing Data in Real Time');
  //     cy.validateText('.tab-swicther-background .tab-item3', 'Transforming Real Time Experience');
  // });
  

    // it('Validates the video element', () => {
    //     cy.validateVideo('video');
    // });

    // it('Validates all images on the home page', () => {
    //     cy.validateImage('img[alt="Data and AI Foundry"]', 'Data and AI Foundry');
    //     cy.validateImage('img[alt="Human Decision"]', 'Human Decision-Centric Approach');
    // });

    // // it('Validates the footer links', () => {
    // //     // Check key links in the footer
    // //     cy.validateLink('a[href="/about-us"]', '/about-us');
    // //     cy.validateLink('a[href="/privacy-policy"]', '/privacy-policy');
    // //     cy.validateLink('a[href="/careers"]', '/careers');
    // // });

    // it('Validates the text on the entire homepage', () => {
    //     // Validate multiple texts on the page
    //     cy.validateText('p', 'Real-time data analytics with Generative AI capabilities empower organizations to adapt quickly');
    //     cy.validateText('p', 'Agentic AI and Agentic Workflows for Transforming Enterprise Workflows');
    //     // Add more paragraphs validation as necessary
    // });

    // it('Validates the contact form button', () => {
    //     // Scroll to bottom or wherever the form is located
    //     cy.get('.contact-form').scrollIntoView();
    //     cy.validateButton('button[type="submit"]', 'Submit', '/thank-you');
    // });











  // it('Checks that all links have the correct display property', () => {
  //   cy.get('a').each(($el) => {
  //     cy.wrap($el).then(($link) => {
  //       const displayValue = $link.css('display');
  //       // Expect 'block' if it's the intended behavior for the anchor tag
  //       expect(displayValue).to.be.oneOf(['block', 'inline-block']);
  //     });
  //   });
  // });
  
  


