describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should visit root", () => {
    cy.visit("/");
  });

  it("should book an interview", () => {
    //0. resets data base
    cy.request("GET", "/api/debug/reset");
    //1.visit the root and confirm "Monday" is in DOM
    cy.visit("/").contains("Monday");
    //2. Find and click the first add button
    cy.get("[alt=Add]").first().click();
    //3. Find input and enter student name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    //4. Chooses and interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    //5. Click on save button
    cy.contains("Save").click();
    //6. Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    //2. Clicks the edit button for the existing appointment
    cy.get("[alt=Edit]").first().click({ force: true });
    // 3. Change Student name
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    // 4. Changes the name and interviewer
    cy.get("[alt='Tori Malcolm']").click();
    // 5. Clicks the save button
    cy.contains("Save").click();
    // 6. Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // 2.Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]").click({ force: true });
    // 3.Clicks the confirm button
    cy.contains("Confirm").click();
    // 4.Sees that the appointment slot is empty
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
