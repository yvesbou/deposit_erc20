describe("Test User Login", () => {
    // no before routine, just start from landing page, login from landing page

    it("App connects with Metamask", () => {
        cy.visit("http://localhost:3000");
        cy.contains('Connect Wallet').click().blur();
        cy.acceptMetamaskAccess().should("be.true");
        // cy.confirmMetamaskSignatureRequest().should("be.true");
        // Deposit Button is indicator that login worked
        cy.get('[data-cy=deposit-to-contract-button]').should('be.visible');
    })
})