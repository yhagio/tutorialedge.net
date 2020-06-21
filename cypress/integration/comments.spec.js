/// <reference types="cypress" />

context('Comments', () => {

    beforeEach(() => {
        cy.login()
            .then((resp) => {
                return resp.body
            })
            .then((body) => {
                const {access_token, expires_in, id_token} = body;
                cy.setCookie("idToken", id_token)
                cy.setCookie("accessToken", access_token)
                cy.setCookie("expiresAt", JSON.stringify({
                    expiryTime: new Date().getTime() + (expires_in * 1000),
                    expiryLength: expires_in
                }))
                cy.setCookie("user", JSON.stringify({
                    name: "Elliot"
                }))
            })
    })

    it("Comments section should show when logged in", () => {
        cy.visit("http://localhost:1313/test/")
        cy.get("#comment-editor")

        cy.clearCookies()

        cy.reload()
        cy.get("#comment-editor")
            .should("not.exist")
    })

    it("Submit a new comment to the site", () => {
        cy.visit("http://localhost:1313/test/")
        cy.get("#comment-editor")
            .type("Test Comment")
        
        cy.get("#comment")
            .click()

    })

    it("Deletes a comment that has been posted", () => {
        cy.visit("http://localhost:1313/test/")

    })
})