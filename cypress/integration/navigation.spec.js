describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });

  it("should book an interview", () => {
    //1. Visits the root of our web server
    cy.visit("/");
    //2. Clicks on the "Add" button in the second appointment
    cy.get("img");
    //3. Enters their name
    //4. Chooses an interviewer
    //5. Clicks the save button
    //6. Sees the booked appointment
  });

  // it("should edit an interview");

  // it("should cancel an interview");
});
