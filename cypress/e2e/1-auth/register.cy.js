describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/register");
  });

  it("registers a new user", () => {
    // Fill out the form
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="address"]').type("123 Street");
    cy.get('input[name="contactNumber"]').type("1234567890");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Optionally, add assertions to check if the user is redirected or if success message is shown
  });
});
