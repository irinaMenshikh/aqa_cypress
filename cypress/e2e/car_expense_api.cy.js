import HomePage from '../pages/HomePage';
import GaragePage from '../pages/GaragePage';
import ExpensesPage from '../pages/ExpensesPage';

describe('Car and expense API verification', () => {
    beforeEach(() => {
        HomePage.visit();
        cy.env(['userEmail', 'userPassword']).then(({ userEmail, userPassword }) => {
            cy.login(userEmail, userPassword);
        });
    });

    it('creates a car through UI, verifies it by API, creates an expense by API, and checks it in UI', () => {
        const carData = {
            brand: 'Audi',
            model: 'TT',
            initialMileage: 15900,
        };

        cy.intercept('POST', '**/api/cars').as('createCar');
        GaragePage.fillCarForm(carData.brand, carData.model, String(carData.initialMileage));

        cy.wait('@createCar').then(({ response }) => {
            expect(response, 'car creation response').to.exist;
            // The live API returns 201 for car creation, although Swagger lists 200.
            expect(response.statusCode).to.equal(201);
            expect(response.body.status).to.equal('ok');
            expect(response.body.data.id).to.be.a('number');

            const createdCarId = response.body.data.id;
            cy.wrap(createdCarId).as('createdCarId');

            return cy.request('GET', '/api/cars').then((carsResponse) => {
                expect(carsResponse.status).to.equal(200);
                expect(carsResponse.body.status).to.equal('ok');

                const carFromApi = carsResponse.body.data.find((car) => car.id === createdCarId);
                expect(carFromApi, 'created car from GET /api/cars').to.exist;
                expect(carFromApi).to.include({
                    brand: carData.brand,
                    model: carData.model,
                    initialMileage: carData.initialMileage,
                });
            });
        });

        cy.get('@createdCarId').then((createdCarId) => {
            const today = new Date();
            const reportedAt = [
                today.getFullYear(),
                String(today.getMonth() + 1).padStart(2, '0'),
                String(today.getDate()).padStart(2, '0'),
            ].join('-');
            const expense = {
                carId: Number(createdCarId),
                reportedAt,
                mileage: 15901,
                liters: 50,
                totalCost: 1000,
                forceMileage: false,
            };

            cy.createExpense(expense).then((expenseResponse) => {
                expect(expenseResponse.status).to.equal(200);
                expect(expenseResponse.body.status).to.equal('ok');
                expect(expenseResponse.body.data).to.include({
                    carId: Number(createdCarId),
                    reportedAt,
                    mileage: 15901,
                    liters: 50,
                    totalCost: 1000,
                });
                expect(expenseResponse.body.data.id).to.be.a('number');
            });

            ExpensesPage.visit();
            ExpensesPage.selectCar(`${carData.brand} ${carData.model}`);
            ExpensesPage.expectExpenseInTable(expense);
        });
    });
});
