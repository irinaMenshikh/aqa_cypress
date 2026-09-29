describe('homework cypress', () => {
    beforeEach(() => {
        cy.visit('/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        })
    })
    it('finds Guest button in header', () => {
        cy.get('header').find('.header-link.-guest').should('be.visible');

    })
    it('finds Sign In button in header', () => {
        cy.get('header').find('.btn.btn-outline-white.header_signin').should('be.visible');
    })

      it('finds logo in header', () => {
        cy.get('.header_left').find('.header_logo').should('be.visible');
    });

    it('finds Home link in nav and checks it is active', () => {
        cy.get('.header_nav')
            .find('a.header-link')
            .contains('Home')
            .should('be.visible')
            .and('have.class', '-active');
    });

    it('finds About button in nav', () => {
        cy.get('.header_nav')
            .find('button.header-link')
            .contains('About')
            .should('be.visible')
            .and('have.attr', 'appscrollto', 'aboutSection');
    });

    it('finds Contacts button in nav', () => {
        cy.get('.header_nav')
            .find('button.header-link')
            .contains('Contacts')
            .should('be.visible')
            .and('have.attr', 'appscrollto', 'contactsSection');
    });

    
    it('finds footer logo', () => {
        cy.get('.footer_item.-right').find('.footer_logo').should('be.visible');
    });

    it('finds website link in footer', () => {
        cy.get('.contacts_link')
            .contains('ithillel.ua')
            .should('be.visible')
            .and('have.attr', 'href', 'https://ithillel.ua');
    });

    it('finds support email in footer', () => {
        cy.get('.contacts_link.h4')
            .contains('support@ithillel.ua')
            .should('be.visible')
            .and('have.attr', 'href', 'mailto:developer@ithillel.ua');
    });

    it('finds social icons block in footer', () => {
        cy.get('.contacts_socials.socials').should('be.visible');
    });

    it('finds all social links in footer', () => {
        const socialIcons = ['facebook', 'telegram', 'youtube', 'instagram', 'linkedin'];

        socialIcons.forEach((icon) => {
            cy.get('.contacts_socials.socials')
                .find(`.icon-${icon}`)
                .closest('a')
                .should('be.visible');
        });
    });

    it('finds copyright text in footer', () => {
        cy.get('footer').contains('Hillel IT school').should('be.visible');
    });


})