class GaragePage {
    getAddCarButton() {
         return cy.get('.btn.btn-primary').first();
    }

    getBrandSelect() {
        return cy.get('#addCarBrand');
    }

    getModelSelect() {
        return cy.get('#addCarModel');

    }

    getMileageInput() {
        return cy.get('#addCarMileage');
    }

    getAddButton() {
        return cy.get('.modal-footer').contains('button', 'Add');
    }

    getCarCard(brand, model) {
        return cy.contains('.car_name', `${brand} ${model}`).first().closest('.car');
    }


    fillCarForm(brand, model, mileage) {
       this.getAddCarButton().click();
        this.getBrandSelect().select(brand);
        this.getModelSelect().select(model);
        this.getMileageInput().type(mileage);
        this.getAddButton().click();
        this.getCarCard(brand, model).should('be.visible');
    }


}

export default new GaragePage();
