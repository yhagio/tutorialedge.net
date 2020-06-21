describe('challenge', () => {
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

    
    it('Should successfully run a snippet', () => {
        cy.visit("http://localhost:1313/challenges/go/type-assertions/")
        
        cy.get(".btn-execute")
            .click()

        cy.get("#test-output > p:nth-child(2) > span")
            .contains("❌")

        cy.get("#outputtime")
            .contains("ms")

    });
});