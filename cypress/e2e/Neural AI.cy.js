describe('AI Lifecycle Management Platform Page - Detailed E2E Test Cases', () => {

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
// ** Section 1: Main Banner **
it('Validates the Main Banner content and images', () => {
  // Check main heading text
  cy.get('h1').should('contain.text', 'Accelerate, Optimize and Scale the Data and AI Initiatives');
  
  // Check supporting paragraph text
  cy.get('p')
      .first()
      .should('contain.text', 'Accelerate the pace, optimize resources, and scale operations with our comprehensive AI lifecycle management platform.');

  // Validate background image rendering
  validateBackgroundImageRendering('.main-banner');
});

// ** Section 2: Driving Decision Intelligence **
it('Validates the Driving Decision Intelligence section content', () => {
  // Validate heading
  cy.get('.decision-intelligence h2').should('contain.text', 'Driving Decision Intelligence and Intelligent Outcomes');

  // Validate paragraph content
  cy.get('.decision-intelligence p').should('contain.text', 'Through data integration, AI model deployment, and continuous optimization, achieve intelligent outcomes.');

  // Validate image rendering
  validateImageRendering('.decision-intelligence img');
});

// ** Section 3: Gen AI Agent Lifecycle Management Platform **
it('Validates the Gen AI Agent Lifecycle Management Platform section', () => {
  // Check section heading
  cy.get('.agent-lifecycle h2').should('contain.text', 'GEN AI AGENT LIFECYCLE MANAGEMENT PLATFORM');

  // Validate paragraph text
  cy.get('.agent-lifecycle p').should('contain.text', 'End-to-end management of generative AI agents, from development to deployment.');

  // Validate image rendering
  validateImageRendering('.agent-lifecycle img');
});

// ** Section 4: NexaStack.ai - Fully Managed GenAI Framework **
it('Validates the NexaStack.ai section', () => {
  // Validate section heading
  cy.get('.nexastack h2').should('contain.text', 'NexaStack.ai - Fully Managed GenAI Framework');

  // Validate paragraph content
  cy.get('.nexastack p').should('contain.text', 'Streamline AI development with our fully managed GenAI framework.');

  // Validate image rendering
  validateImageRendering('.nexastack img');
  validateImageRendering('.nexastack img');
});

// ** Section 5: Internal Developer Platform and Observability **
it('Validates the Internal Developer Platform and Observability section', () => {
  // Check Internal Developer Platform heading and paragraph
  cy.get('.internal-developer h2').should('contain.text', 'Internal Developer Platform');
  cy.get('.internal-developer p').should('contain.text', 'Empowering developers with a platform that simplifies AI lifecycle management.');

  
  // Check Observability heading and paragraph
  cy.get('.observability h2').should('contain.text', 'Observability');
  cy.get('.observability p').should('contain.text', 'Achieve full transparency and control over your AI operations.');

  // Check Model Management heading and paragraph
  cy.get('.model Management h2').should('contain.text', 'Model Management');
  cy.get('.model Management p').should('contain.text', 'Organize machine learning models systematically, tracking, managing, and optimizing for enhanced performance and effectiveness.');

  // Validate images in both subsections
  validateImageRendering('.internal-developer img');
  validateImageRendering('.observability img');
  validateImageRendering('.model Management img');
});

// ** Section 6: Akira AI - Generative Agent for Enterprise Data **
it('Validates the Akira AI section content and button link', () => {
  // Check section heading and description
  cy.get('.akira-ai h2').should('contain.text', 'Akira AI - Generative Agent for Enterprise Data');
  cy.get('.akira-ai p').should('contain.text', 'Transform your enterprise data with generative AI capabilities.');

  // Validate button link and redirection
  validateUrlRedirect('.akira-ai a', '/expected-redirect-url');

  // Validate image rendering
  validateImageRendering('.akira-ai img');
  validateImageRendering('.akira-ai img');
});

// ** Responsive Tests **
it('Validates page responsiveness for mobile, tablet, and desktop views', () => {
  const viewports = [[375, 667], [768, 1024], [1280, 720]];

  viewports.forEach((viewport) => {
      cy.viewport(viewport[0], viewport[1]);
      cy.visit('https://your-page-url.com');
      
      // Validate that each section is visible and correctly styled for each viewport
      cy.get('.main-banner').should('be.visible');
      cy.get('.decision-intelligence').should('be.visible');
      cy.get('.agent-lifecycle').should('be.visible');
      cy.get('.nexastack').should('be.visible');
      cy.get('.internal-developer').should('be.visible');
      cy.get('.observability').should('be.visible');
      cy.get('.akira-ai').should('be.visible');
  });
});
// ******************************** Section 1: Process Automation ********************************
describe('Process Automation Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Process Automation')
          .should('be.visible');
      cy.contains('p', 'Enhance productivity and reduce errors by automating repetitive tasks')
          .should('be.visible');
  });

  it('should validate image rendering', () => {
      validateImageRendering('.process-automation-image'); // Update selector as needed
  });
});

// ******************************** Section 2: Workflow Management ********************************
describe('Workflow Management Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Workflow Management')
          .should('be.visible');
      cy.contains('p', 'Simplify complex workflows')
          .should('be.visible');
  });

  it('should validate image rendering', () => {
      validateImageRendering('.workflow-management-image'); // Update selector as needed
  });
});

// ******************************** Section 3: Document AI ********************************
describe('Document AI Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Document AI')
          .should('be.visible');
      cy.contains('p', 'Improve accuracy and speed in document processing')
          .should('be.visible');
  });

  it('should validate image rendering', () => {
      validateImageRendering('.document-ai-image'); // Update selector as needed
  });
});

// ******************************** Section 4: Vision AI ********************************
describe('Vision AI Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Vision AI')
          .should('be.visible');
      cy.contains('p', 'Accelerate decision-making by analyzing visual data accurately')
          .should('be.visible');
  });

  it('should validate image rendering', () => {
      validateImageRendering('.vision-ai-image'); // Update selector as needed
  });
});

// ******************************** Section 5: Video Inspection ********************************
describe('Video Inspection Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Video Inspection')
          .should('be.visible');
      cy.contains('p', 'Streamline inspections, promptly identifying defects')
          .should('be.visible');
  });

  it('should validate image rendering', () => {
      validateImageRendering('.video-inspection-image'); // Update selector as needed
  });
});

// ******************************** Section 6: Surveillance ********************************
describe('Surveillance Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Surveillance')
          .should('be.visible');
      cy.contains('p', 'Heighten security, proactively detecting threats')
          .should('be.visible');
  });

  it('should validate image rendering', () => {
      validateImageRendering('.surveillance-image'); // Update selector as needed
  });
});

// ******************************** Section 7: MetaSecure AI ********************************
describe('MetaSecure AI Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'MetaSecure AI')
          .should('be.visible');
      cy.contains('p', 'Streamline operations, safeguard assets')
          .should('be.visible');
  });

  it('should validate image rendering', () => {
      validateImageRendering('.metasecure-ai-image');
      validateImageRendering('.metasecure-ai-image'); // Update selector as needed
  });
});

// ******************************** Section 8: Malware Analysis ********************************
describe('Malware Analysis Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Malware Analysis')
          .should('be.visible');
      cy.contains('p', 'Identify and neutralize digital threats swiftly')
          .should('be.visible');
  });

  it('should validate image rendering', () => {
      validateImageRendering('.malware-analysis-image'); // Update selector as needed
  });
});

// ******************************** Section 9: Threat Intelligence ********************************
describe('Threat Intelligence Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Threat Intelligence')
          .should('be.visible');
      cy.contains('p', 'Proactively detect and counter cyber threats')
          .should('be.visible');
  });

  it('should validate image rendering', () => {
      validateImageRendering('.threat-intelligence-image'); // Update selector as needed
  });
});
 // ******************************** Section 1: Responsible AI Framework ********************************
 describe('Responsible AI Framework Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'ElixirData.io - Responsible AI Framework')
          .should('be.visible');
      cy.contains('p', 'Discover how AI frameworks integrate principles of equity, transparency, confidentiality, and security for ethical AI deployment')
          .should('be.visible');
  });

  it('should validate image rendering', () => {
      validateImageRendering('.responsible-ai-image'); // Update selector as needed
  });
});

// ******************************** Section 2: Crafting Responsible AI ********************************
describe('Crafting Responsible AI Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Crafting Responsible AI for Essential Ethical Framework')
          .should('be.visible');
      cy.contains('p', 'Designing AI systems with a focus on ethics, ensuring essential frameworks for responsible and ethical development')
          .should('be.visible');
  });

  it('should validate image rendering', () => {
      validateImageRendering('.crafting-responsible-ai-image'); // Update selector as needed
  });
});

// ******************************** Section 3: Governance and Compliance ********************************
describe('Governance and Compliance Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Governance and Compliance')
          .should('be.visible');
      cy.contains('p', 'Ensures adherence to regulations, mitigates risks, and fosters accountability in AI development and deployment.')
          .should('be.visible');
  });

  it('should validate image rendering', () => {
      validateImageRendering('.governance-compliance-image'); // Update selector as needed
  });
});

// ******************************** Section 4: Interpretability ********************************
describe('Interpretability Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Interpretability')
          .should('be.visible');
      cy.contains('p', 'Enhances transparency, fosters trust, and enables stakeholders to understand and validate AI decisions and processes.')
          .should('be.visible');
  });

  it('should validate image rendering', () => {
      validateImageRendering('.interpretability-image'); // Update selector as needed
  });
});

// ******************************** Section 5: Safety and Security ********************************
describe('Safety and Security Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Safety and Security')
          .should('be.visible');
      cy.contains('p', 'Protects against malicious attacks, safeguards sensitive data, and ensures the reliability and resilience of AI systems.')
          .should('be.visible');
  });

  it('should validate image rendering', () => {
      validateImageRendering('.safety-security-image'); // Update selector as needed
  });
});

// ******************************** Section 6: Unlock Business Value with Generative AI ********************************
describe('Generative AI Business Value Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Unlock business value with Generative AI')
          .should('be.visible');
      cy.contains('p', 'Foster a culture of continuous improvement by harnessing generative AI to iterate and refine processes, driving operational excellence and sustainable growth')
          .should('be.visible');
  });

  it('should validate all generative AI application cards', () => {
      cy.get('.generative-ai-card').each(($card) => {
          cy.wrap($card).should('be.visible');
          cy.wrap($card).find('h3').should('be.visible');
          cy.wrap($card).find('p').should('be.visible');
      });
  });
});

// ******************************** Section 7: Build and Scale with Hybrid Cloud ********************************
describe('Hybrid Cloud AI Applications Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Build and scale generative AI applications with Hybrid Cloud')
          .should('be.visible');
      cy.contains('p', 'Utilize the flexibility of cloud computing and the power of on-premises infrastructure to create and expand generative AI applications efficiently and effectively')
          .should('be.visible');
  });

  it('should validate all hybrid cloud platform cards', () => {
      cy.get('.cloud-platform-card').each(($card) => {
          cy.wrap($card).should('be.visible');
          cy.wrap($card).find('h3').should('be.visible');
          cy.wrap($card).find('p').should('be.visible');
      });
  });
});

// ******************************** Section 8: Complimentary Strategy Session ********************************
describe('Complimentary Strategy Session Section', () => {
  it('should display the correct title and description', () => {
      cy.contains('h2', 'Secure a complimentary 30-minute strategy session with an expert in neural AI services to delve into your requirements and explore tailored solutions')
          .should('be.visible');
      cy.contains('p', 'Gain valuable insights and personalized guidance on leveraging neural AI technologies during a complimentary 30-minute strategy session with one of our expert consultants. Schedule your session today.')
          .should('be.visible');
  });

  it('should validate the CTA button and image', () => {
      cy.contains('button', "Let's Connect")
          .should('be.visible')
          .and('have.attr', 'href')
          .and('include', '/schedule-session'); // Update the URL as necessary

      validateImageRendering('.strategy-session-image'); // Update selector as needed
  });
});
});
