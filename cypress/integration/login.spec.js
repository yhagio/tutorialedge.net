describe('login', () => {
    it('should successfully log into our app', () => {

    cy.login()
        .then((resp) => {
            return resp.body;
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
            
            cy.visit("http://localhost:1313/profile/")
        })
    });
    
});