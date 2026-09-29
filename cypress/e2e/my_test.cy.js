import HomePage from "../pages/HomePage";

describe('homework cypress', () => {
    beforeEach(() => {
      HomePage.visit();
    })

    it('finds Guest button in header', () => {
        HomePage.getGuestButton().should('be.visible');

    })
    it('finds Sign In button in header', () => {
        HomePage.getSignInButton().should('be.visible');
    })

      it('finds logo in header', () => {
        HomePage.getLogoInHeader().should('be.visible');
    });

    it('finds Home link in nav and checks it is active', () => {
        HomePage.getHomeLink().should('be.visible').and('have.class', '-active');
    });

    it('finds About button in nav', () => {
        HomePage.getAboutButton().should('be.visible').and('have.attr', 'appscrollto', 'aboutSection');
    });

    it('finds Contacts button in nav', () => {
            HomePage.getContactButton().should('be.visible')
            .and('have.attr', 'appscrollto', 'contactsSection');
    });

    
    it('finds footer logo', () => {
        HomePage.getFooterLogo().should('be.visible');
    });

    it('finds website link in footer', () => {
        HomePage.getWebsiteLinkInFooter().should('be.visible')
        .and('have.attr', 'href', 'https://ithillel.ua');
    });

    it('finds support email in footer', () => {
        HomePage.getEmailInFooter().should('be.visible')
        .and('have.attr', 'href', 'mailto:developer@ithillel.ua');
    });


    it('finds all social links in footer', () => {
        const socialIcons = ['facebook', 'telegram', 'youtube', 'instagram', 'linkedin'];

        socialIcons.forEach((icon) => {
            HomePage.getSocialIcon(icon).should('be.visible');
        });
    });

    it('finds copyright text in footer', () => {
        HomePage.getCopyrightText().should('be.visible');
    });


})