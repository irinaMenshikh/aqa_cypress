class HomePage {
    username = 'guest';
    password = 'welcome2qauto';

    visit () {
        cy.visit('/', {
            auth: {
                username: this.username,
                password: this.password
            }
        });
    }

    getGuestButton () {
        return cy.get('header').find('.header-link.-guest');
    }

    getSignInButton () {
        return cy.get('header').find('.btn.btn-outline-white.header_signin');
    }

    getLogoInHeader () {
        return cy.get('.header_left').find('.header_logo');
    }

    getHomeLink () {
        return cy.get('.header_nav').find('a.header-link').contains('Home');
    }

    getAboutButton () {
        return cy.get('.header_nav').find('button.header-link').contains('About');
    }

    getContactButton () {
        return cy.get('.header_nav').find('button.header-link').contains('Contacts');
    }

    getFooterLogo () {
        return cy.get('.footer_item.-right').find('.footer_logo');
    }

    getWebsiteLinkInFooter () {
        return  cy.get('.contacts_link').contains('ithillel.ua');
    }

    getEmailInFooter () {
        return cy.get('.contacts_link.h4').contains('support@ithillel.ua');
    }

    getSocialIcon(icon) {
        return cy.get('.contacts_socials.socials').find(`.icon-${icon}`).closest('a');
    }

    getCopyrightText() {
        return cy.get('footer').contains('Hillel IT school');
    }

    

}


export default new HomePage ();