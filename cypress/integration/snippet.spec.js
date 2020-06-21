describe('snippets', () => {
    it('Should successfully run a snippet', () => {
        cy.visit("http://localhost:1313/golang/snippets/deleting-elements-from-map-go/")
        
        cy.get(".btn-execute")
            .click()

        cy.get(".output")
            .contains("Deleting Elements")

        cy.get("#outputtime")
            .contains("ms")

    });
});