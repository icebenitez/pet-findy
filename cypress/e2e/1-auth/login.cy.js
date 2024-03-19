describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });

  it("logs in an existing user", () => {
    // Fill out the login form
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Optionally, add assertions to check for successful login
    // For example, check for a success message or redirection to another page
  });
});
