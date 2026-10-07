class ExpensesPage {
    visit() {
        cy.get('a.sidebar_btn[href="/panel/expenses"]').click();
        cy.url().should('include', '/panel/expenses');
    }

    getAddExpenseButton() {
        return cy.contains('button', 'Add an expense');
    }

    getVehicleSelect() {
        return cy.get('#addExpenseCar');
    }

    getLitersInput() {
        return cy.get('#addExpenseLiters');
    }

    getMileageInput() {
        return cy.get('#addExpenseMileage');
    }

    getTotalCostInput() {
        return cy.get('#addExpenseTotalCost');
    }

    getSubmitButton() {
        return cy.get('.modal-footer').contains('button', 'Add');
    }

    addFuelExpense(vehicle, mileage, liters, totalCost) {
        this.getAddExpenseButton().click();
        this.getVehicleSelect().find('option').then(($options) => {
            const matchingOptions = [...$options].filter(
                (option) => option.textContent.trim() === vehicle
            );
            const newestVehicleOption = matchingOptions[0];

            if (!newestVehicleOption) {
                throw new Error(`Vehicle option not found: ${vehicle}`);
            }

            this.getVehicleSelect().select(newestVehicleOption.value);
        });
        this.getVehicleSelect().find('option:selected').should('have.text', vehicle);
        this.getMileageInput().clear().type(mileage);
        this.getLitersInput().clear().type(liters);
        this.getTotalCostInput().clear().type(totalCost);
        this.getSubmitButton().click();

        cy.contains('Fuel expense added').should('be.visible');
        cy.get('#carSelectDropdown').should('contain.text', vehicle);
        cy.get('tbody tr').first()
            .should('contain.text', liters)
            .and('contain.text', totalCost);
    }
}

export default new ExpensesPage();
