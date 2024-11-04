describe('XenonStack Contact Us Page E2E Test', () => {
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
    const validateUrlRedirect = (buttonSelector, expectedUrl) => {
      cy.get(buttonSelector, { timeout: 20000 })  
          .should('be.visible')  
          .and('have.attr', 'href')  
          .then((href) => {
              cy.request(href).its('status').should('eq', 200);  
              cy.get(buttonSelector).click();  
              cy.url().should('include', expectedUrl);  
          });
        }
      
    
    const selectors = {
        mainHeading: 'h1',
        subHeading: 'h2',
        paragraphs: 'p',
        buttons: 'a.btn-primary', 
        transformNowButton: 'div.banner-button', 
        images: 'img',
        videos: 'video',
        links: 'a',
        h3Heading: 'h3',
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
    
        cy.visit('https://www.xenonstack.com/platform-engineering/');
        cy.viewport(1280, 720); 
        cy.viewport('macbook-15')
      });

//********************************section "1"********************************************************************************

    it('should verify the Title text and platform Engineering main section', () => {
      cy.get('.banner-content-wrapper p')
        .should('be.visible')
        .and('contain.text', 'Drives developer productivity through automated infrastructure operations and self-service capabilities');
      cy.contains('Drives developer productivity through automated infrastructure operations and self-service capabilities').should('be.visible');
      cy.get('a').contains('Drive Innovation Forward').should('be.visible');
      validateBackgroundImageRendering('.section-banner');
    });

    it('should display the banner content correctly', () => {
      cy.get('.banner-content-wrapper p')
        .should('be.visible')
        .and('contain.text', 'Drives developer productivity through automated infrastructure operations and self-service capabilities');

      cy.get('.banner-cta-button span')
        .should('be.visible')
        .and('contain.text', 'Drive Innovation Forward');
  
    });
  
  describe('Button click Navigation Test', () => {
    it('Button  should match with the test and are clicable', () => {
      cy.get('.banner-cta-button')
      .invoke('text')
      .should('match', /Drive Innovation Forward/);  

      // Click the "Drive Innovation Forward" button
      cy.get('.banner-cta-button')
        .should('be.visible')
        .click();
    });

    it('Button should navigate to the readiness assessment page and load without errors', () => {
      validateUrlRedirect('a:contains("Drive Innovation Forward")', 'https://www.xenonstack.com/readiness-assessment/');
      cy.get('body').should('not.contain', '404');  
    });
  });


//******************************* */ Ensure the banner content is responsive************************************

  describe('Banner Responsiveness Test', () => {
      it('should display the banner correctly on smaller screens', () => {
        cy.visit('https://www.xenonstack.com/platform-engineering/');
        
        // Test mobile view
        cy.viewport('iphone-6');
        cy.get('.banner-content-wrapper h1').should('be.visible');
        cy.get('.banner-content-wrapper p').should('be.visible');
        
        // Test desktop view
        cy.viewport('macbook-15');
        cy.get('.banner-content-wrapper h1').should('be.visible');
        cy.get('.banner-content-wrapper p').should('be.visible');
      });
    });



// ********************************Section:"To check the heading and subheading section  all page"*******************************
  describe('should display the heading and subheading and h3Heading correctly at all the page', () => {
    it('Validates subheadings and sections text', () => {
      cy.get('.first-mid-banner-heading > h2').should('be.visible').scrollIntoView()
        .and('contain.text', 'PlatformOps to Scale and Accelerate DevOps Adoption')
        .and('have.css', 'text-align', 'start');
      cy.get('.three-card-section-heading > h2').should('be.visible').scrollIntoView()
        .and('contain.text', 'Fundamental Aspects of Platform Engineering Implementation')
        .and('have.css', 'text-align', 'start');  
      cy.get('.third-tab-switch-section-heading > h2').should('be.visible').scrollIntoView()
        .and('contain.text', 'Driving Data-Centric and Intelligent Outcomes with Cloud Platform Engineering')
        .and('have.css', 'text-align', 'start');
      cy.get('.col-md-7 > h2').should('be.visible').scrollIntoView()
        .and('contain.text', 'Thrive in the platform economy')
        .and('have.css', 'text-align', 'start');
      cy.get('.tech-resource-section-heading > h2').should('be.visible').scrollIntoView()
        .and('contain.text', 'Digital Platform Engineering Services')
        .and('have.css', 'text-align', 'start');
      cy.get('.section-heading > h2').should('be.visible').scrollIntoView()
        .and('contain.text', 'Continuous Data Value for Digitized Businesses')
        .and('have.css', 'text-align', 'start');
      cy.get('.competency-section-heading > h2').should('be.visible').scrollIntoView()
        .and('contain.text', 'Competencies')
        .and('have.css', 'text-align', 'start');
      cy.get('.let-us-talk-content > h2').should('be.visible').scrollIntoView()
        .and('contain.text', 'Get a 30-minute, no-cost strategy session with a Platform Engineering Expert') 
        .and('have.css', 'text-align', 'start');
    });
  })

// *************************************Section "2" Explore know************************************************************

  describe('validate the Explore know button functionality, clickability and redirect URl navighation' , () => {
    it("Explore Now button functionality" , () => {
      cy.get('.first-mid-banner-button')
        .invoke('text')
        .should('match', /Explore Now/); 
      cy.get('.first-mid-banner-button').should('be.visible').scrollIntoView().click();
    })

    it('Button should navigate to the Platform Engineering Expert Consultation for Innovation page and load without errors', () => {
      const buttonSelector = 'div.first-mid-banner-button a:contains("Explore Now")';
      validateUrlRedirect(buttonSelector, 'https://www.xenonstack.com/talk-to-specialist/platform-engineering/');
      cy.get('body').should('not.contain', '404');  
    });
    
  });

// **********************************Section "3" Fundamental Aspects of Platform Engineering Implementation********************
  describe('should display the Fundamental Aspects of Platform Engineering Implementation section correctly' , () => {
    it('should display the banner content correctly' , () => {
      cy.get('.three-card-section-heading > p')
        .should('be.visible')
        .and('contain.text', 'Facilitate efficient software delivery, customer-centric responsiveness, and drive business success and satisfaction');
        
      });

    it('Validates subheadings and sections text', () => {
      cy.get('.row > :nth-child(1) > h3').should('be.visible').scrollIntoView()
      .and('contain.text', 'Release Progressions')
      .and('have.css', 'text-align', 'start');
      cy.get('.row > :nth-child(2) > h3').should('be.visible').scrollIntoView()
      .and('contain.text', 'Progressive Delegation')
      .and('have.css', 'text-align', 'start');
      cy.get(':nth-child(3) > h3').should('be.visible').scrollIntoView()
      .and('contain.text', 'Control and Visibility')
      .and('have.css', 'text-align', 'start');

    });
    
    it('validates the Release Progressions banner content correctly and image' , () => {
      cy.get('.row > :nth-child(1) > p')
        .should('be.visible')
        .and('contain.text', 'Strategically expands user access to new features through controlled release progressions, allowing for iterative testing and refinement to optimize product performance');
      validateImageRendering('.three-card-section > .container-homepage > .row > :nth-child(1)');

    });

    it('validates the Progressive Delegation banner content correctly and image' , () => {
      cy.get('.three-card-section > .container-homepage > .row > :nth-child(2) > p')
        .should('be.visible')
        .and('contain.text', 'Emphasizes gradual feature control delegation, starting with engineers for development and testing, then transferring to product managers for deployment, ensuring controlled releases and focused engineering efforts');
      validateImageRendering('.three-card-section > .container-homepage > .row > :nth-child(2)');
    });

    it('validates the Progressive Delegation banner content correctly and image' , () => {
      cy.get('.row > :nth-child(3) > p')
        .should('be.visible')
        .and('contain.text', 'Influencing feature visibility, deployment timing, and release authority. Maintaining precise control over feature rollouts and adjusting user access ensures seamless transitions, effective feedback collection, and continuous product improvement with agility');
      validateImageRendering('.three-card-section > .container-homepage > .row > :nth-child(3)');
    });
  });

  // **********************************Section "4"Driving Data-Centric and Intelligent Outcomes with Cloud Platform Engineering********************

  describe('should display the Driving Data-Centric section correctly' , () => {
    it('should display the banner content correctly' , () => {
      cy.get('.third-tab-switch-section-heading > p')
        .should('be.visible')
        .and('contain.text', 'Elevate your operations with top-notch Platform Engineering Service');       
      });

    it('Validates subheading and sections text', () => {
      cy.get('.active-3 > p').should('be.visible').scrollIntoView()
        .and('contain.text', 'Progressive Delivery')
        .and('have.css', 'text-align', 'left');
      cy.get('.tab-header-3 > :nth-child(2) > p').should('be.visible').scrollIntoView()
        .and('contain.text', 'Data Intelligence')
        .and('have.css', 'text-align', 'left');
      cy.get('.tab-header-3 > :nth-child(3) > p').should('be.visible').scrollIntoView()
        .and('contain.text', 'Real-Time Analytics')
        .and('have.css', 'text-align', 'left');
      cy.get('.tab-header-3 > :nth-child(4) > p').should('be.visible').scrollIntoView()
        .and('contain.text', 'Autonomous Operations')
        .and('have.css', 'text-align', 'left');
      cy.get('.tab-header-3 > :nth-child(5) > p').should('be.visible').scrollIntoView()
        .and('contain.text', 'Developer Experience')
        .and('have.css', 'text-align', 'left');
    });

    it('validates the Progressive Delivery banner "content" and "image" and "Explore more button" correctly' , () => {
      cy.get('.active-3 > p')
        .click();
      cy.get('.active-3 > .industry-tab-content > h3')
        .should('be.visible').scrollIntoView()
        .and('contain.text', 'Progressive Delivery')
        .and('have.css', 'text-align', 'start');
      cy.get('.active-3 > .industry-tab-content > :nth-child(2)')
        .should('be.visible')
        .scrollIntoView()
        .and('contain.text', 'Advancing towards the future of industrial transformation with Analytics, Data, and Automation.');
      validateImageRendering('.active-3 > .industry-tab-image');
      cy.get('.active-3 > .industry-tab-content > a > .industry-cta > p')
        .invoke('text')
        .should('match', /Explore More/);  
      cy.get('.active-3 > .industry-tab-content > a > .industry-cta > p')
          .should('be.visible')
          .click();
      });

      it('validates the Data Intelligence banner "content" and "image" and "Explore more button" correctly' , () => {
        cy.get('.tab-header-3 > :nth-child(2) > p')
          .click();
        cy.get('.active-3 > .industry-tab-content > h3')
          .should('be.visible').scrollIntoView()
          .and('contain.text', 'Data Intelligence')
          .and('have.css', 'text-align', 'start');
        cy.get('.active-3 > .industry-tab-content > :nth-child(2)')
          .should('be.visible')
          .scrollIntoView()
          .and('contain.text', 'Evolving towards the future of industrial transformation with Analytics, Data, and Automation.');
        validateImageRendering('.active-3 > .industry-tab-image');
        cy.get('.active-3 > .industry-tab-content > a > .industry-cta > p')
          .invoke('text')
          .should('match', /Explore More/);  
        cy.get('.active-3 > .industry-tab-content > a > .industry-cta > p')
            .should('be.visible')
            .click();
        });

      it('validates the Real-Time Analytics banner "content" and "image" and "Explore more button" correctly' , () => {
        cy.get('.tab-header-3 > :nth-child(3) > p')
          .click();
        cy.get('.active-3 > .industry-tab-content > h3')
          .should('be.visible').scrollIntoView()
          .and('contain.text', 'Real-Time Analytics')
          .and('have.css', 'text-align', 'start');
        cy.get('.active-3 > .industry-tab-content > :nth-child(2)')
          .should('be.visible')
          .scrollIntoView()
          .and('contain.text', 'Progressing towards the future of industrial transformation with Analytics, Data, and Automation.');
        validateImageRendering('.active-3 > .industry-tab-image');
        cy.get('.active-3 > .industry-tab-content > a > .industry-cta > p')
          .invoke('text')
          .should('match', /Explore More/);  
        cy.get('.active-3 > .industry-tab-content > a > .industry-cta > p')
            .should('be.visible')
            .click();
      });

      it('validates the Autonomous Operations banner "content" and "image" and "Explore more button" correctly' , () => {
        cy.get('.tab-header-3 > :nth-child(4) > p')
          .click();
        cy.get('.active-3 > .industry-tab-content > h3')
          .should('be.visible').scrollIntoView()
          .and('contain.text', 'Autonomous Operations')
          .and('have.css', 'text-align', 'start');
        cy.get('.active-3 > .industry-tab-content > :nth-child(2)')
          .should('be.visible')
          .scrollIntoView()
          .and('contain.text', 'Moving towards the future of industrial transformation with Analytics, Data, and Automation.');
        validateImageRendering('.active-3 > .industry-tab-image');
        cy.get('.active-3 > .industry-tab-content > a > .industry-cta > p')
          .invoke('text')
          .should('match', /Explore More/);  
        cy.get('.active-3 > .industry-tab-content > a > .industry-cta > p')
            .should('be.visible')
            .click();
      });

      it('validates the Developer Experience banner "content" and "image" and "Explore more button" correctly' , () => {
        cy.get('.tab-header-3 > :nth-child(5) > p')
          .click();
        cy.get('.active-3 > .industry-tab-content > h3')
          .should('be.visible').scrollIntoView()
          .and('contain.text', 'Developer Experience')
          .and('have.css', 'text-align', 'start');
        cy.get('.active-3 > .industry-tab-content > :nth-child(2)')
          .should('be.visible')
          .scrollIntoView()
          .and('contain.text', 'Transitioning towards the future of industrial transformation with Analytics, Data, and Automation.');
        validateImageRendering('.active-3 > .industry-tab-image');
        cy.get('.active-3 > .industry-tab-content > a > .industry-cta > p')
          .invoke('text')
          .should('match', /Explore More/);  
        cy.get('.active-3 > .industry-tab-content > a > .industry-cta > p')
            .should('be.visible')
            .click();
      });
  });
// *****************Section "5"Thrive in the platform economy************************************

  describe('should display the Thrive in the platform economy section correctly' , () => {
    it('validates the Thrive in the platform economy banner "content" and "image" and "Elevate your platform button"', () => {
      cy.get('.col-md-7 > :nth-child(2)')
        .should('be.visible')
        .scrollIntoView()
        .and('contain.text', "By aiding our clients in scaling and improving their platforms to introduce new business models and revenue streams, we empower them to thrive in today's platform economy.");
      cy.get('.col-md-5 > img');
      cy.get('.how-we-grow-cta')
        .invoke('text')
        .should('match', /Elevate Your Platform/);  
      cy.get('.how-we-grow-cta')
        .should('be.visible')
        .click();
    });

    it('Button should navigate to the Digital Platform Strategy blog page and load without errors', () => {
      const buttonSelector = 'div.how-we-grow-cta a:contains("Elevate Your Platform")';
      validateUrlRedirect(buttonSelector, 'https://www.xenonstack.com/insights/digital-platform');
      cy.get('body').should('not.contain', '404');  
    });
    
  });

// *****************Section "6"Digital Platform Engineering Services************************************
  describe('should display the Digital Platform Engineering Services section correctly' , () => {
    it('validates the Digital Platform Engineering Services banner section correctly' , () => {
      cy.get('.tech-resource-section-heading > p')
        .should('be.visible')
        .scrollIntoView()
        .and('contain.text', "Emerging technology approaches to accelerate the delivery of applications and produce business value");
    });
    
    it('Validates subheading and sections text', () => {
      cy.get(':nth-child(1) > .resource-card-wrapper > .resource-card-content > h2').should('be.visible').scrollIntoView()
        .and('contain.text', 'AWS Platform Development Services')
        .and('have.css', 'text-align', 'start');
      cy.get(':nth-child(2) > .resource-card-wrapper > .resource-card-content > h2').should('be.visible').scrollIntoView()
        .and('contain.text', 'GCP Platform Development Services')
        .and('have.css', 'text-align', 'start');
      cy.get(':nth-child(3) > .resource-card-wrapper > .resource-card-content > h2').should('be.visible').scrollIntoView()
        .and('contain.text', 'Azure Platform Development Services')
        .and('have.css', 'text-align', 'start');
    });

    it('validates the AWS Platform Development Services banner "content" and "image" and "Explore Now icons" correctly' , () => {
      cy.get(':nth-child(1) > .resource-card-wrapper > .resource-card-content > :nth-child(2)')
        .should('be.visible')
        .scrollIntoView()
        .and('contain.text', 'Ensure accelerated and unified Modern application development with leading AWS Solutions.');
      validateImageRendering('.resource-card-image');
      cy.get(':nth-child(1) > .resource-card-wrapper > .resource-card-content > a > .resource-cta-wrapper > p')
        .invoke('text')
        .should('match', /Explore Now/);  
        cy.get(':nth-child(1) > .resource-card-wrapper > .resource-card-content > a > .resource-cta-wrapper > p')
          .should('be.visible')
          .click();
    }); 
    
    it('validates the GCP Platform Development Services banner "content" and "image" and "Explore Now icons" correctly' , () => {
      cy.get(':nth-child(2) > .resource-card-wrapper > .resource-card-content > :nth-child(2)')
        .should('be.visible')
        .scrollIntoView()
        .and('contain.text', 'Develop efficient platforms with optimised application performance.');
      validateImageRendering('.resource-card-image');
      cy.get(':nth-child(1) > .resource-card-wrapper > .resource-card-content > a > .resource-cta-wrapper > p')
        .invoke('text')
        .should('match', /Explore Now/);  
        cy.get(':nth-child(1) > .resource-card-wrapper > .resource-card-content > a > .resource-cta-wrapper > p')
          .should('be.visible')
          .click();
    });

    it('validates the Azure Platform Development Services banner "content" and "image" and "Explore Now icons" correctly' , () => {
      cy.get(':nth-child(3) > .resource-card-wrapper > .resource-card-content > :nth-child(2)')
        .should('be.visible')
        .scrollIntoView()
        .and('contain.text', 'Achieve flexibility and scalability with innovative implementation and development services.');
      validateImageRendering('.resource-card-image');
      cy.get(':nth-child(1) > .resource-card-wrapper > .resource-card-content > a > .resource-cta-wrapper > p')
        .invoke('text')
        .should('match', /Explore Now/);  
      cy.get(':nth-child(1) > .resource-card-wrapper > .resource-card-content > a > .resource-cta-wrapper > p')
          .should('be.visible')
          .click();
    });
  });
// *****************Section "7"Continuous Data Value for Digitized Businesses************************************ 
describe('Continuous Data Value for Digitized Businesses', () => {
  it('validates the banner "content" and "image" and "subheading"' , () => {
    cy.get('.section-heading > p')
        .should('be.visible')
        .scrollIntoView()
        .and('contain.text', 'Embedding modern business processes and solutions helps Enterprises to achieve operational excellence, develop scalable technology platforms and build deep technical expertise. solutions helps Enterprises to achieve operational excellence.');
    validateImageRendering('.resource-card-image');
    cy.get('.accordion-open > .accordion-item-wrapper > .accordion-item-header > h3').should('be.visible').scrollIntoView()
        .and('contain.text', 'What are some common tools used in Platform Engineering?')
        .and('have.css', 'text-align', 'start');
    cy.get(':nth-child(2) > .accordion-item-wrapper > .accordion-item-header > h3').should('be.visible').scrollIntoView()
        .and('contain.text', 'How can Platform Engineering improve software development efficiency?')
        .and('have.css', 'text-align', 'start');
    cy.get(':nth-child(3) > .accordion-item-wrapper > .accordion-item-header > h3').should('be.visible').scrollIntoView()
        .and('contain.text', 'What are some key considerations when implementing Platform Engineering?')
        .and('have.css', 'text-align', 'start');
    cy.get(':nth-child(4) > .accordion-item-wrapper > .accordion-item-header > h3').should('be.visible').scrollIntoView()
        .and('contain.text', 'What are the key components of an Internal Developer Platform (IDP)?')
        .and('have.css', 'text-align', 'start');  
  });
  it('Validate the "drop-down" icons functionality of all these question ' , () => {
    cy.get('.accordion-open > .accordion-item-wrapper > .accordion-item-header > .accordion-arrow > .arrow-minus')
      .scrollIntoView()
      .click();
    cy.get('.accordion-open > .accordion-item-wrapper > .accordion-item-header > .accordion-arrow > .arrow-minus')
        .should('be.visible')
        .click();
    cy.get('.accordion-open > .accordion-item-wrapper > .accordion-item-header > .accordion-arrow > .arrow-minus')
        .should('be.visible')
        .click();
    cy.get('.accordion-open > .accordion-item-wrapper > .accordion-item-header > .accordion-arrow > .arrow-minus')
        .should('be.visible')
        .click(); 
  });

  it('Validate each answer "content" of ask question', () =>{
    cy.get('#accordion-item1 > p').should('be.visible')
      .and('contain.text', 'Some top tools used in platform engineering include: GitLab , Terraform , Ansible , Argo CD , Kubernetes , Crossplane , Backstage.')
      .and('have.css', 'text-align', 'start');
    cy.get('.accordion-open > .accordion-item-wrapper > .accordion-item-content > p').should('be.visible').scrollIntoView()
        .and('contain.text', 'Platform engineering enhances software development by creating a more efficient environment and reducing cognitive burdens for developers.')
        .and('have.css', 'text-align', 'start');
    cy.get('.accordion-open > .accordion-item-wrapper > .accordion-item-content > p').should('be.visible').scrollIntoView()
        .and('contain.text', 'Success in platform engineering hinges on scalability, collaboration, continual learning, strong leadership, and clear metrics and goals.')
        .and('have.css', 'text-align', 'start');
    cy.get(':nth-child(4) > .accordion-item-wrapper > .accordion-item-header > h3').should('be.visible').scrollIntoView()
        .and('contain.text', 'Key components of an IDP are app config, infra orchestration, environment management, deployment management, and role-based access control.')
        .and('have.css', 'text-align', 'start'); 
  })
});
// *****************Section "8"Competencies************************************
  describe('should display the Competencies section correctly' , () => {
    it('validates the banner "content" and "image" and "subheading"' , () => {
      cy.get('.competency-section-heading > h2').should('be.visible')
        .and('contain.text', 'Competencies')
        .and('have.css', 'text-align', 'start');
      cy.get('.competency-section > .container-homepage > .row > :nth-child(1) > img');
      cy.get('.competency-section > .container-homepage > .row > :nth-child(2) > img');
      cy.get('.competency-section > .container-homepage > .row > :nth-child(3) > img')
      cy.get('.row > :nth-child(4) > img');
      cy.get('.row > :nth-child(5) > img');
      cy.get('.row > :nth-child(6) > img');
    });  
  });

// *****************Section "7"Get a 30-minute, no-cost strategy session with a Platform Engineering Expert************************************ 
describe('should display the Get a 30-minute, no-cost strategy session with a Platform Engineering Expert section correctly', () => {
  it('validates the banner "content" and "image" and "subheading"' , () => {
    cy.get('.let-us-talk-content > h2')
      .should('be.visible')
      .and('contain.text', 'Get a 30-minute, no-cost strategy session with a Platform Engineering Expert')
      .and('have.css', 'text-align', 'start');
    cy.get('.let-us-talk-content > p')
      .should('be.visible')
      .and('contain.text', 'Optimize your development pipeline with Platform Engineering Services for increased efficiency and faster time-to-market.')
      .and('have.css', 'text-align', 'start');
    cy.get('.let-us-talk-button')
      .should('be.visible')
      .and('contain.text', "Let's Talk")
      .and('have.css', 'text-align', 'center');
    cy.get('.let-us-talk-wrapper > .row > .col-md-4 > img')

  });
});
});
