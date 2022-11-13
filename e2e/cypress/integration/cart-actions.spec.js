/// <reference types="cypress" />

describe("Cart Actions", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Add items to cart", () => {
        cy.get("[data-cy=add-to-cart-2]").click();
        cy.get("[data-cy=add-to-cart-3]").click();
        cy.get("[data-cy=badge-count]").should("have.text", "2");
    });

    it("Should be able to purchase", async () => {
        // Adds items to cart
        cy.get("[data-cy=add-to-cart-2]")
            .click()
            .get("[data-cy=add-to-cart-3]")
            .click()
            .get("[data-cy=badge-count]")
            .should("have.text", "2"); // Checks correct number shown
        const alertStub = cy.stub();
        cy.on("window:alert", alertStub);
        cy.get("[data-cy=cartBtn]").click();
        cy.get("[data-cy=purchase-btn]").click();
        // Checks alert message
        await cy.then(() =>
            alertStub.getCall(0).calledWith("Purchase successful!")
        );
    });

    it("Should not be able to purchase", () => {
        cy.get("[data-cy=cartBtn]").click(); // Empty Cart
        // Purchase button should not show
        cy.get("[data-cy=purchase-btn]").should("not.exist");
    });
});

describe("Purchase History", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Show purchase history of recent purchase", async () => {
        // Purchase 
        cy.intercept("POST", "**/api/cheeses/purchase").as("handlePurchase");
        cy.get("[data-cy=add-to-cart-2]").click();
        cy.get("[data-cy=cartBtn]").click(); // click on view cart
        cy.get("[data-cy=purchase-btn]").click(); // click purchase btn
        cy.wait("@handlePurchase").then(async (data) => {
            const orderId = data.response.body.id;
            // Waits for order to be sent and saved to api
            await cy.wait(500); 
            cy.get("[data-cy=recent-purchases-btn]")
                .click({ force: true })
                .get(`[data-cy=order-${orderId}-number]`) // order should show
                .should("exist");
        });
    });
});
