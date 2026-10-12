class HomePage {

   visit() {
    cy.env(['basicAuthUsername', 'basicAuthPassword']).then(({ basicAuthUsername, basicAuthPassword }) => {
        cy.visit('/', {
            auth: {
                username: basicAuthUsername,
                password: basicAuthPassword
            }
        });
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

   clickSignIn() {
    this.getSignInButton().click();
}

   fillLoginForm(email, password) {
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password, { sensitive: true });
    cy.get('.modal-footer').find('.btn.btn-primary').click();
    }

    login(email, password) {
    this.clickSignIn();
    this.fillLoginForm(email, password);
    }




}


export default new HomePage ();
