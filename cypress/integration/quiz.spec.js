describe("quiz", () => {
    it("Tests quiz component", () => {
        cy.visit("http://localhost:1313/test/")

        cy.get(".quiz > #a")
            .click()

        cy.get("#answer")
            .contains("Correct Answer")
        
    })
})