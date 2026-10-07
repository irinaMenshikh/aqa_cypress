class RegistrationPage {
    getRegistrationButton() {
        return cy.contains('.modal-footer button', 'Registration');
    }

    getNameInput() {
        return cy.get('#signupName');
    }

    getLastNameInput() {
        return cy.get('#signupLastName');
    }

    getEmailInput() {
        return cy.get('#signupEmail');
    }

    getPasswordInput() {
        return cy.get('#signupPassword');
    }

    getRepeatPasswordInput() {
        return cy.get('#signupRepeatPassword');
    }

    getSubmitButton() {
        return cy.get('.modal-footer button').contains('Register');
    }

    open() {
        cy.get('header').contains('button', 'Sign In').click();
        this.getRegistrationButton().click();
        cy.contains('.modal-title', 'Registration').should('be.visible');
    }

    fillForm({ name, lastName, email, password, repeatPassword }) {
        if (name !== undefined) this.getNameInput().clear().type(name);
        if (lastName !== undefined) this.getLastNameInput().clear().type(lastName);
        if (email !== undefined) this.getEmailInput().clear().type(email);
        if (password !== undefined) this.getPasswordInput().clear().type(password, { sensitive: true });
        if (repeatPassword !== undefined) this.getRepeatPasswordInput().clear().type(repeatPassword, { sensitive: true });
    }

    expectInvalid(input, errorMessage) {
        input.focus().blur().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.contains(errorMessage).should('be.visible');
        this.getSubmitButton().should('be.disabled');
    }

    expectRequired(input) {
        input.focus().blur()
            .should('have.class', 'is-invalid')
            .and('have.css', 'border-color', 'rgb(220, 53, 69)');
    }
}

export default new RegistrationPage();
