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
    cy.get(".appointment__add-button").should("be.visible");
    cy.get("[data-testid=Add]:visible").click();
    //3. Enters their name
    cy.get("input").type("Mario Gutierrez");
    //4. Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    //5. Clicks the save button
    cy.contains("Save").click();
    //6. Sees the booked appointment
    cy.contains(".appointment__card--show", "Mario Gutierrez");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  // it("should cancel an interview");
});
