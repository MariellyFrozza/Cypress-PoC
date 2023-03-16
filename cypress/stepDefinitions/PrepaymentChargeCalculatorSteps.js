/// <reference types="Cypress" />

import {
  Given,
  When,
  Then,
  And,
} from "@badeball/cypress-cucumber-preprocessor";

Given(/^access to the Prepayment Charge Calculator tab$/, () => {
  cy.visit("https://rfa.ca/PrepaymentChargeCalculator");
});

When(/^I fill in all the fields for full prepayment$/, () => {
  cy.get("#select2-prepayType-container").click();
  cy.get(".select2-results__option").contains("Full").click();

  cy.get("#select2-prepaySolutionsSelect-container > .select2-selection__placeholder").click();
  cy.get(".select2-results__option").contains("No").click();

  cy.get("#select2-alternativeSolutionsSelect-container > .select2-selection__placeholder").click();
  cy.get(".select2-results__option").contains("No").click();

  cy.get(":nth-child(5) > fieldset > .select2 > .selection > .select2-selection").click();
  cy.get(".select2-results__option").contains("5 Year Closed Fixed").click();

  cy.get("#select2-prepayDate-YYYY-container").click();
  cy.get(".select2-results__option").contains("2025").click();
  cy.get("#select2-prepayDate-MM-container").click();
  cy.get(".select2-results__option").contains("05").click();
  cy.get("#select2-prepayDate-DD-container").click();
  cy.get(".select2-results__option").contains("13").click();

  cy.get("#prepayInterest").type("5,50");
  cy.get("#prepayBalance").type("300000");
  cy.get("#regularPayment").type("11000");

  cy.get("#select2-prepayFrequency-container").click();
  cy.get(".select2-results__option").contains("Monthly").click();

  cy.contains("Calculate now").click({ waitForAnimations: false });
});

Then(/^I should see the value of 2750 for prepayment and the calculation type should be Three months interest$/, () => {
    cy.get("#prepayTotal").should("have.text", "$4.125");
    cy.get("#prepayTotalType > span").should(
      "have.text",
      "Three months interest"
    );
  });

When(/^I fill in all the fields for full prepayment and I fill in the current interest rate field with 200%$/, () => {
    cy.get("#select2-prepayType-container").click();
    cy.get(".select2-results__option").contains("Full").click();

    cy.get("#select2-prepaySolutionsSelect-container > .select2-selection__placeholder").click();
    cy.get(".select2-results__option").contains("No").click();

    cy.get("#select2-alternativeSolutionsSelect-container > .select2-selection__placeholder").click();
    cy.get(".select2-results__option").contains("No").click();

    cy.get(":nth-child(5) > fieldset > .select2 > .selection > .select2-selection").click();
    cy.get(".select2-results__option").contains("5 Year Closed Fixed").click();

    cy.get("#select2-prepayDate-YYYY-container").click();
    cy.get(".select2-results__option").contains("2025").click();
    cy.get("#select2-prepayDate-MM-container").click();
    cy.get(".select2-results__option").contains("05").click();
    cy.get("#select2-prepayDate-DD-container").click();
    cy.get(".select2-results__option").contains("13").click();

    cy.get("#prepayInterest").type("200,00");
    cy.get("#prepayBalance").type("300000");
    cy.get("#regularPayment").type("11000");

    cy.get("#select2-prepayFrequency-container").click();
    cy.get(".select2-results__option").contains("Monthly").click();

    cy.contains("Calculate now").click({ waitForAnimations: false });
  }
);


Then("I should see the error message {string}", (message) => {
  cy.get('.error > .error-message').then(($el) => {

    content = $el.text().replace(/[^a-zA-Z.,/ ]/g, "");
    content = content.replace(/\s\s+/g, ' ');
    content = content.trim();

    expect(content).equal(message);
  })
});

When(/^I fill in all the fields for full prepayment and I fill in the Term Maturity date field with the current date$/, () => {
    cy.get("#select2-prepayType-container").click();
    cy.get(".select2-results__option").contains("Full").click();

    cy.get("#select2-prepaySolutionsSelect-container > .select2-selection__placeholder").click();
    cy.get(".select2-results__option").contains("No").click();

    cy.get("#select2-alternativeSolutionsSelect-container > .select2-selection__placeholder").click();
    cy.get(".select2-results__option").contains("No").click();

    cy.get(":nth-child(5) > fieldset > .select2 > .selection > .select2-selection").click();
    cy.get(".select2-results__option").contains("5 Year Closed Fixed").click();

    cy.get("#select2-prepayDate-YYYY-container").click();
    cy.get(".select2-results__option").contains("2023").click();
    cy.get("#select2-prepayDate-MM-container").click();
    cy.get(".select2-results__option").contains("03").click();
    cy.get("#select2-prepayDate-DD-container").click();
    cy.get(".select2-results__option").contains("14").click();

    cy.get("#prepayInterest").type("5,50");
    cy.get("#prepayBalance").type("300000");
    cy.get("#regularPayment").type("11000");

    cy.get("#select2-prepayFrequency-container").click();
    cy.get(".select2-results__option").contains("Monthly").click();

    cy.contains("Calculate now").click({ waitForAnimations: false });
  }
);

When("I set 'Do you have an Alternative Mortgage?' to yes", () => {
	cy.get("#select2-alternativeSolutionsSelect-container > .select2-selection__placeholder").click();
	cy.get(".select2-results__option").contains("Yes").click();
});

When("I set 'Do you have an Alternative Mortgage?' to no", () => {
	cy.get("#select2-alternativeSolutionsSelect-container > .select2-selection__placeholder").click();
	cy.get(".select2-results__option").contains("No").click();
});

Then("I should see the fields: Do You Have a Solutions Mortgage?, Do you have an Alternative Mortgage?, Current Term, Term Maturity Date, Current Interest Rate and Current Mortgage Balance", () => {
	cy.get("#select2-prepaySolutionsSelect-container > .select2-selection__placeholder").should('be.visible');
	cy.get(":nth-child(5) > fieldset > .select2 > .selection > .select2-selection").should('be.visible');
	cy.get('.inline-dategroup').should('be.visible');
	cy.get("#prepayInterest").should('be.visible');
	cy.get("#prepayBalance").should('be.visible');

	cy.get("#select2-prepayType-container").should('not.be.visible');
	cy.get("#regularPayment").should('not.be.visible');
	cy.get("#select2-prepayFrequency-container").should('not.be.visible');
});


Then(/^I should see all the fields$/, () => {
	cy.get("#select2-prepaySolutionsSelect-container > .select2-selection__placeholder").should('be.visible');
	cy.get(":nth-child(5) > fieldset > .select2 > .selection > .select2-selection").should('be.visible');
	cy.get('.inline-dategroup').should('be.visible');
	cy.get("#prepayInterest").should('be.visible');
	cy.get("#prepayBalance").should('be.visible');

	cy.get("#select2-prepayType-container").should('be.visible');
	cy.get("#regularPayment").should('be.visible');
	cy.get("#select2-prepayFrequency-container").should('be.visible');
});


When(/^I fill in all the fields for parcial prepayment$/, () => {
	cy.get("#select2-prepayType-container").click();
	cy.get(".select2-results__option").contains("Partial").click();

	cy.get('#prepayMortgage').type('500000');

	cy.get('#select2-prepayPrivilegePercent-container').click();
	cy.get(".select2-results__option").contains("10%").click();

	cy.get('#prepayThisYear').type('1000000');
	cy.get('#prepayAmount').type('500000');

	cy.get("#select2-prepaySolutionsSelect-container > .select2-selection__placeholder").click();
	cy.get(".select2-results__option").contains("No").click();

	cy.get("#select2-alternativeSolutionsSelect-container > .select2-selection__placeholder").click();
	cy.get(".select2-results__option").contains("No").click();

	cy.get(":nth-child(5) > fieldset > .select2 > .selection > .select2-selection").click();
	cy.get(".select2-results__option").contains("5 Year Closed Fixed").click();

	cy.get("#select2-prepayDate-YYYY-container").click();
	cy.get(".select2-results__option").contains("2025").click();
	cy.get("#select2-prepayDate-MM-container").click();
	cy.get(".select2-results__option").contains("05").click();
	cy.get("#select2-prepayDate-DD-container").click();
	cy.get(".select2-results__option").contains("13").click();

	cy.get("#prepayInterest").type("5,50");
	cy.get("#prepayBalance").type("300000");
	cy.get("#regularPayment").type("11000");

	cy.get("#select2-prepayFrequency-container").click();
	cy.get(".select2-results__option").contains("Monthly").click();

	cy.contains("Calculate now").click({ waitForAnimations: false });
});


Then(/^I should see the value of 6875 for prepayment and the calculation type should be Three months interest$/, () => {
	cy.get("#prepayTotal").should("have.text", "$6.875");
    cy.get("#prepayTotalType > span").should(
      "have.text",
      "Three months interest")
});


When(/^I leave the 'Current Interest Rate' field blank and fill in the other fields correctly$/, () => {
	cy.get("#select2-prepayType-container").click();
	cy.get(".select2-results__option").contains("Full").click();

	cy.get("#select2-prepaySolutionsSelect-container > .select2-selection__placeholder").click();
	cy.get(".select2-results__option").contains("No").click();

	cy.get("#select2-alternativeSolutionsSelect-container > .select2-selection__placeholder").click();
	cy.get(".select2-results__option").contains("No").click();

	cy.get(":nth-child(5) > fieldset > .select2 > .selection > .select2-selection").click();
	cy.get(".select2-results__option").contains("5 Year Closed Fixed").click();

	cy.get("#select2-prepayDate-YYYY-container").click();
	cy.get(".select2-results__option").contains("2025").click();
	cy.get("#select2-prepayDate-MM-container").click();
	cy.get(".select2-results__option").contains("05").click();
	cy.get("#select2-prepayDate-DD-container").click();
	cy.get(".select2-results__option").contains("13").click();

	cy.get("#prepayBalance").type("300000");
	cy.get("#regularPayment").type("11000");

	cy.get("#select2-prepayFrequency-container").click();
	cy.get(".select2-results__option").contains("Monthly").click();

	cy.contains("Calculate now").click({ waitForAnimations: false });
});


When(/^I leave the 'Maximum Annual Prepayment Privilege' field blank and fill in the other fields correctly$/, () => {
	cy.get("#select2-prepayType-container").click();
	cy.get(".select2-results__option").contains("Partial").click();

	cy.get('#prepayMortgage').type('500000');

	cy.get('#prepayThisYear').type('1000000');
	cy.get('#prepayAmount').type('500000');

	cy.get("#select2-prepaySolutionsSelect-container > .select2-selection__placeholder").click();
	cy.get(".select2-results__option").contains("No").click();

	cy.get("#select2-alternativeSolutionsSelect-container > .select2-selection__placeholder").click();
	cy.get(".select2-results__option").contains("No").click();

	cy.get(":nth-child(5) > fieldset > .select2 > .selection > .select2-selection").click();
	cy.get(".select2-results__option").contains("5 Year Closed Fixed").click();

	cy.get("#select2-prepayDate-YYYY-container").click();
	cy.get(".select2-results__option").contains("2025").click();
	cy.get("#select2-prepayDate-MM-container").click();
	cy.get(".select2-results__option").contains("05").click();
	cy.get("#select2-prepayDate-DD-container").click();
	cy.get(".select2-results__option").contains("13").click();

	cy.get("#prepayInterest").type("5,50");
	cy.get("#prepayBalance").type("300000");
	cy.get("#regularPayment").type("11000");

	cy.get("#select2-prepayFrequency-container").click();
	cy.get(".select2-results__option").contains("Monthly").click();

	cy.contains("Calculate now").click({ waitForAnimations: false });
});


When(/^I click on 'Calculate now' without filling any field$/, () => {
	cy.contains("Calculate now").click({ waitForAnimations: false });
});


Then(/^I should see all fields with their respective error messages$/, () => {
	cy.get('#partialFullPaymentGroup > .error-message').then(($el) => {
		content = $el.text().replace(/[^a-zA-Z.,/ ]/g, "");
		content = content.replace(/\s\s+/g, ' ');
		content = content.trim();
		expect(content).equal("This field is required to complete the application");
	});

	cy.get(':nth-child(3) > .error-message').then(($el) => {
		content = $el.text().replace(/[^a-zA-Z.,/ ]/g, "");
		content = content.replace(/\s\s+/g, ' ');
		content = content.trim();
		expect(content).equal("Please enter Yes or No.");
	});

	cy.get(':nth-child(5) > .error-message').then(($el) => {
		content = $el.text().replace(/[^a-zA-Z.,/ ]/g, "");
		content = content.replace(/\s\s+/g, ' ');
		content = content.trim();
		expect(content).equal("This field is required to complete the application");
	});

	cy.get('.inline-dategroup > .error-message').then(($el) => {
		content = $el.text().replace(/[^a-zA-Z.,/ ]/g, "");
		content = content.replace(/\s\s+/g, ' ');
		content = content.trim();
		expect(content).equal("This field is required to complete the application. Please select a date in the future");
	});

	cy.get(':nth-child(8) > .error-message').then(($el) => {
		content = $el.text().replace(/[^a-zA-Z.,/ ]/g, "");
		content = content.replace(/\s\s+/g, ' ');
		content = content.trim();
		expect(content).equal("This field is empty/invalid please enter in a new value.");
	});

	cy.get(':nth-child(9) > .error-message').then(($el) => {
		content = $el.text().replace(/[^a-zA-Z.,/ ]/g, "");
		content = content.replace(/\s\s+/g, ' ');
		content = content.trim();
		expect(content).equal("This field is required to complete the application");
	});
	cy.get('#regularPaymentGroup > .error-message').then(($el) => {
		content = $el.text().replace(/[^a-zA-Z.,/ ]/g, "");
		content = content.replace(/\s\s+/g, ' ');
		content = content.trim();
		expect(content).equal("This field is empty/invalid please enter in a new value.");
	});

	cy.get('#prepayFrequencyGroup > .error-message').then(($el) => {
		content = $el.text().replace(/[^a-zA-Z.,/ ]/g, "");
		content = content.replace(/\s\s+/g, ' ');
		content = content.trim();
		expect(content).equal("This field is required to complete the application");
	});
  });
  
When(/^I click on the information icon$/, () => {
	cy.get('.grey > :nth-child(3) > .tooltip-icon > .svg').click()
});

Then(/^I should see a related message$/, () => {
	cy.get('.grey > :nth-child(3) > .tooltip-content > p').then(($el) => {
		content = $el.text().replace(/[^a-zA-Z.,/ ]/g, "");
		content = content.replace(/\s\s+/g, ' ');
		content = content.trim();
		expect(content).equal("To determine if you have a Solutions mortgage, please refer to your mortgage loan documentation.");
	});
});

