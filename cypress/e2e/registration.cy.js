import HomePage from '../pages/HomePage';
import RegistrationPage from '../pages/RegistrationPage';

describe('Registration form', () => {
    beforeEach(() => {
        HomePage.visit();
        RegistrationPage.open();
    });

    it('marks all empty fields invalid and keeps Register disabled', () => {
        const requiredFields = [
            () => RegistrationPage.getNameInput(),
            () => RegistrationPage.getLastNameInput(),
            () => RegistrationPage.getEmailInput(),
            () => RegistrationPage.getPasswordInput(),
            () => RegistrationPage.getRepeatPasswordInput(),
        ];

        requiredFields.forEach((getInput) => {
            RegistrationPage.expectRequired(getInput());
        });
        RegistrationPage.getSubmitButton().should('be.disabled');
    });

    it('validates name characters and length from 2 to 20 characters', () => {
        RegistrationPage.getNameInput().type('Name123');
        RegistrationPage.expectInvalid(RegistrationPage.getNameInput(), 'Name is invalid');

        RegistrationPage.getNameInput().clear().type('A');
        RegistrationPage.expectInvalid(
            RegistrationPage.getNameInput(),
            'Name has to be from 2 to 20 characters long'
        );

        RegistrationPage.getNameInput().clear().type('A'.repeat(21));
        RegistrationPage.expectInvalid(
            RegistrationPage.getNameInput(),
            'Name has to be from 2 to 20 characters long'
        );
    });

    it('validates last name characters and length from 2 to 20 characters', () => {
        RegistrationPage.getLastNameInput().type('Last123');
        RegistrationPage.expectInvalid(RegistrationPage.getLastNameInput(), 'Last name is invalid');

        RegistrationPage.getLastNameInput().clear().type('A');
        RegistrationPage.expectInvalid(
            RegistrationPage.getLastNameInput(),
            'Last name has to be from 2 to 20 characters long'
        );

        RegistrationPage.getLastNameInput().clear().type('A'.repeat(21));
        RegistrationPage.expectInvalid(
            RegistrationPage.getLastNameInput(),
            'Last name has to be from 2 to 20 characters long'
        );
    });

    it('validates email format', () => {
        RegistrationPage.getEmailInput().type('not-an-email');
        RegistrationPage.expectInvalid(RegistrationPage.getEmailInput(), 'Email is incorrect');
    });

    it('validates password length and character requirements', () => {
        RegistrationPage.getPasswordInput().type('password', { sensitive: true });
        RegistrationPage.expectInvalid(
            RegistrationPage.getPasswordInput(),
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        );
    });

    it('requires matching password confirmation', () => {
        RegistrationPage.getPasswordInput().type('QautoTest123', { sensitive: true });
        RegistrationPage.getRepeatPasswordInput().type('QautoTest124', { sensitive: true });
        RegistrationPage.expectInvalid(
            RegistrationPage.getRepeatPasswordInput(),
            /Passwords do not match\.?/
        );
    });

    it('registers a new user with a unique email', () => {
        const uniqueEmail = `qa.registration.${Date.now()}@example.com`;

        RegistrationPage.fillForm({
            name: 'Qa',
            lastName: 'Automation',
            email: uniqueEmail,
            password: 'QautoTest123',
            repeatPassword: 'QautoTest123',
        });

        RegistrationPage.getSubmitButton().should('be.enabled').click();
        cy.url().should('include', '/panel/garage');
    });
});
