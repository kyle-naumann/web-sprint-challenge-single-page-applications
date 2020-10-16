describe("testing form inputs", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/order-form")
    })
    it("MVP", () => {
        cy.get("[data-cy=name").type("Kyle").should("have.value", "Kyle");
        cy.get("[data-cy=phone").type("7142821284").should("have.value", "7142821284");
        cy.get("[data-cy=pepperoni]").check().should("be.checked");
        cy.get("[data-cy=ham]").check().should("be.checked");
        cy.get("[data-cy=chicken]").check().should("be.checked");
        cy.get("[data-cy=bacon]").check().should("be.checked");
        cy.get('#pizzaform').submit()
    })
})