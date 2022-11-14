/// <reference types="cypress" />

/* Tests Cart Actions */
describe("Cart Actions", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Add items to cart", () => {
        cy.get("[data-cy=add-to-cart-2]")
            .click()
            .get("[data-cy=add-to-cart-3]")
            .click()
            .get("[data-cy=badge-count]")
            .should("have.text", "2");
    });

    it("Should be able to purchase", async () => {
        // Adds items to cart
        cy.get("[data-cy=add-to-cart-2]")
            .click()
            .get("[data-cy=add-to-cart-3]")
            .click()
            .get("[data-cy=badge-count]")
            // Checks correct number shown on cart badge
            .should("have.text", "2");

        const alertStub = cy.stub();
        cy.on("window:alert", alertStub)
            .get("[data-cy=cartBtn]")
            .click()
            .get("[data-cy=purchase-btn]")
            .click();

        // Checks alert message
        await cy.then(() =>
            alertStub.getCall(0).calledWith("Purchase successful!")
        );
    });

    it("Should not be able to purchase", () => {
        // Empty Cart
        cy.get("[data-cy=cartBtn]").click();
        // Purchase button should not show
        cy.get("[data-cy=purchase-btn]").should("not.exist");
    });

    it("- button should remove item", () => {
        cy.get("[data-cy=add-to-cart-2]")
            .click()
            .get("[data-cy=add-to-cart-3]")
            .click()
            .get("[data-cy=cartBtn]")
            .click()
            // Remove Cheese 2
            .get("[data-cy=cart-item-2-decrement]")
            .click()
            .get("[data-cy=cart-item-2]")
            .should("not.exist");
        cy.get("[data-cy=cart-item-3-quantity]")
            .invoke("text")
            .should("eq", "1");
    });

    it("+ button should add item", () => {
        cy.get("[data-cy=add-to-cart-2]")
            .click()
            .get("[data-cy=cartBtn]")
            .click()
            // Increment cheese
            .get("[data-cy=cart-item-2-increment]")
            .click()
            .get("[data-cy=cart-item-2-increment]")
            .click()
        cy.get("[data-cy=cart-item-2-quantity]")
            .invoke("text")
            .should("eq", "3");
    });
});

describe("Purchase History", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Show purchase history of recent purchase", async () => {
        // Purchase
        cy.intercept("POST", "**/api/cheeses/purchase").as("handlePurchase");
        cy.get("[data-cy=add-to-cart-2]")
            .click()
            // View Cart
            .get("[data-cy=cartBtn]")
            .click()
            // Click Purchase
            .get("[data-cy=purchase-btn]")
            .click()
            .wait("@handlePurchase")
            .then(async (data) => {
                const orderId = data.response.body.id;
                // Waits for order to be sent and saved to api
                await cy.wait(500);
                cy.get("[data-cy=recent-purchases-btn]")
                    .click({ force: true })
                    .get(`[data-cy=order-${orderId}-number]`)
                    // Recent order should show
                    .should("exist");
            });
    });
});

describe("Cheese Dialog", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Dialog should show correct cheese info", () => {
        cy.get("[data-cy=cheese-1-image]")
            .click()
            .get("[data-cy=dialog-cheese-1-descr]")
            .should("exist")
            .get("[data-cy=dialog-cheese-1-price]")
            .should("exist")
            .get("[data-cy=dialog-cheese-1-category]")
            .should("exist");
    });

    it("Add item to cart with button in Dialog", () => {
        cy.get("[data-cy=cheese-1-image]")
            .click()
            .get("[data-cy=add-to-cart-1-dialog]")
            .click()
            .get("[data-cy=badge-count]")
            .should("have.text", "1");
        // Checks added item show in cart
        cy.get("[data-cy=cartBtn]")
            .click()
            .get("[data-cy=cart-item-1]")
            .should("exist");
    });
});
