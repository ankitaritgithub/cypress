describe('XenonStack AI Page Automation Tests', () => {
    // Prevent Cypress from failing on uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    beforeEach(() => {
        cy.visit('https://www.xenonstack.com/neural-ai/');
        cy.viewport(1280, 720); // Default viewport for desktop
    });

    // Test 1: Validate the main banner
    it('Validates the main banner section', () => {
        cy.get('h1')
            .should('contain.text', 'AI for Any Device at the Edge, Autonomous decision-making')
            .and('be.visible');

        cy.get('.main-banner img') // Replace with actual class or selector
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0); // Image is loaded
            });
    });

    // Test 2: Validate the "AI Vision at the Edge" section
    it('Validates the "AI Vision at the Edge" section', () => {
        cy.get('.ai-vision h2') // Replace with actual selector
            .should('contain.text', 'AI Vision at the EDGE')
            .and('be.visible');

        cy.get('.ai-vision p') // Replace with actual selector
            .should('contain.text', 'Improve AI vision-based decision-making through advanced AI techniques.');

        cy.get('.ai-vision img') // Replace with actual selector
            .should('be.visible');
    });

    // Test 3: Validate the "Autonomous Stores" section
    it('Validates the "Autonomous Stores" section', () => {
        cy.get('.autonomous-stores h2') // Replace with actual selector
            .should('contain.text', 'Autonomous Stores')
            .and('be.visible');

        cy.get('.autonomous-stores p') // Replace with actual selector
            .should('contain.text', 'Enhance customer experiences with AI-driven solutions.');

        cy.get('.autonomous-stores img') // Replace with actual selector
            .should('be.visible');
    });

    // Test 4: Validate the "Visual AI Agents with Multimodal AI" section
    it('Validates the "Visual AI Agents with Multimodal AI" section', () => {
        cy.get('.visual-ai h2') // Replace with actual selector
            .should('contain.text', 'Visual AI Agents with Multimodal AI')
            .and('be.visible');

        cy.get('.visual-ai p') // Replace with actual selector
            .should('contain.text', 'Enhance decision-making with AI-powered agents.');

        cy.get('.visual-ai img') // Replace with actual selector
            .should('be.visible');
    });

    // Test 5: Validate the "Features" section
    it('Validates the Features section', () => {
        cy.get('.features h2')
            .should('contain.text', 'AI for End to End Platform')
            .and('be.visible');

        cy.get('.features .card') // Replace with actual card selectors
            .each(($card) => {
                cy.wrap($card).should('be.visible');
                cy.wrap($card).find('h3').should('not.be.empty'); // Ensure each card has a heading
                cy.wrap($card).find('img').should('be.visible');
            });
    });

    // Test 6: Validate the "Onboarding" section
    it('Validates the Onboarding section', () => {
        cy.get('.onboarding h2')
            .should('contain.text', 'Maximize Your Edge Computing Potential')
            .and('be.visible');

        cy.get('.onboarding .card')
            .each(($card) => {
                cy.wrap($card).should('be.visible');
                cy.wrap($card).find('button').should('be.visible');
            });
    });

    // Test 7: Validate the "Resources" section
    it('Validates the Resources section', () => {
        cy.get('.resources h2')
            .should('contain.text', 'Computer Vision Resources - XenonStack')
            .and('be.visible');

        cy.get('.resources .resource-item') // Replace with actual selectors
            .each(($resource) => {
                cy.wrap($resource).should('be.visible');
                cy.wrap($resource).find('a').should('have.attr', 'href').and('not.be.empty');
            });
    });

    // Test 8: Validate the "Tools" section
    it('Validates the Tools section', () => {
        cy.get('.tools h2')
            .should('contain.text', 'Work with Your Favourite Apps')
            .and('be.visible');

        cy.get('.tools .integration-item') // Replace with actual selectors
            .each(($item) => {
                cy.wrap($item).should('be.visible');
                cy.wrap($item).find('img').should('be.visible');
            });
    });

    // Test 9: Validate the "Call to Action" section
    it('Validates the Call to Action section', () => {
        cy.get('.cta h2') // Replace with actual selector
            .should('contain.text', 'Make a lasting impression with Xenonstack.AI')
            .and('be.visible');

        cy.get('.cta .button').each(($button) => {
            cy.wrap($button).should('be.visible').and('have.attr', 'href').and('not.be.empty');
        });
    });
});
************************************
    describe('XenonStack AI Cards Automation Tests', () => {
    // Prevent Cypress from failing on uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    beforeEach(() => {
        cy.visit('https://www.xenonstack.com/neural-ai/');
        cy.viewport(1280, 720); // Set viewport for desktop testing
    });

    // Test 1: Validate each card in the "Use Cases" section
    it('Validates cards in the "Use Cases" section', () => {
        cy.get('.use-cases .card').each(($card, index) => {
            cy.wrap($card).scrollIntoView().should('be.visible'); // Ensure card is visible

            // Validate the title of the card
            cy.wrap($card).find('h3') // Replace with the actual selector for titles
                .should('not.be.empty')
                .and('be.visible');

            // Validate the description of the card
            cy.wrap($card).find('p') // Replace with the actual selector for descriptions
                .should('not.be.empty')
                .and('be.visible');

            // Validate the icon/image of the card
            cy.wrap($card).find('img') // Replace with the actual selector for icons/images
                .should('be.visible')
                .and(($img) => {
                    expect($img[0].naturalWidth).to.be.greaterThan(0); // Ensure the image loads correctly
                });
        });
    });

    // Test 2: Validate each card in the "Onboarding" section
    it('Validates cards in the "Onboarding" section', () => {
        cy.get('.onboarding .card').each(($card, index) => {
            cy.wrap($card).scrollIntoView().should('be.visible'); // Ensure card is visible

            // Validate the title of the card
            cy.wrap($card).find('h3') // Replace with the actual selector for titles
                .should('not.be.empty')
                .and('be.visible');

            // Validate the description of the card
            cy.wrap($card).find('p') // Replace with the actual selector for descriptions
                .should('not.be.empty')
                .and('be.visible');

            // Validate the call-to-action button
            cy.wrap($card).find('a') // Replace with the actual selector for buttons
                .should('have.attr', 'href')
                .and('not.be.empty')
                .and('be.visible');
        });
    });
});
