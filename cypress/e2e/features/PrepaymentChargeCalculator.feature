Feature: Prepayment Charge Calculator

    Scenario: Validate fields with valid information for full prepayment.
        Given access to the Prepayment Charge Calculator tab
        When I fill in all the fields for full prepayment
        Then I should see the value of 2750 for prepayment and the calculation type should be Three months interest

    Scenario: Validate fields with valid information for parcial prepayment.
        Given access to the Prepayment Charge Calculator tab
        When I fill in all the fields for parcial prepayment
        Then I should see the value of 6875 for prepayment and the calculation type should be Three months interest

    Scenario: Validate presence of fields when setting Alternative Mortgage to yes.
        Given access to the Prepayment Charge Calculator tab
        When I set 'Do you have an Alternative Mortgage?' to yes
        Then I should see the fields: Do You Have a Solutions Mortgage?, Do you have an Alternative Mortgage?, Current Term, Term Maturity Date, Current Interest Rate and Current Mortgage Balance

    Scenario: Validate presence of all fields when setting Alternative Mortgage to no.
        Given access to the Prepayment Charge Calculator tab
        When I set 'Do you have an Alternative Mortgage?' to no
        Then I should see all the fields

    Scenario: Validate error message with current interest rate above 100%.
        Given access to the Prepayment Charge Calculator tab
        When I fill in all the fields for full prepayment and I fill in the current interest rate field with 200%
        Then I should see the error message 'This field is empty/invalid please enter in a new value.'

    Scenario: Validate error message with Term Maturity date before current date.
        Given access to the Prepayment Charge Calculator tab
        When I fill in all the fields for full prepayment and I fill in the Term Maturity date field with the current date
        Then I should see the error message 'This field is required to complete the application. Please select a date in the future'

    Scenario: Verify that the error message is displayed if the 'Current Interest Rate' field is left blank.
        Given access to the Prepayment Charge Calculator tab
        When I leave the 'Current Interest Rate' field blank and fill in the other fields correctly
        Then I should see the error message 'This field is empty/invalid please enter in a new value.'
        
    Scenario: Verify that the error message is displayed if the 'Maximum Annual Prepayment Privilege' field is left blank.
        Given access to the Prepayment Charge Calculator tab
        When I leave the 'Maximum Annual Prepayment Privilege' field blank and fill in the other fields correctly
        Then I should see the error message 'Please enter an annual privilege amount.'

    Scenario: Verify error messages without filling any fields.
        Given access to the Prepayment Charge Calculator tab
        When I click on 'Calculate now' without filling any field
        Then I should see all fields with their respective error messages
# validation Do you have an Alternative Mortgage?


    Scenario: Validate the functionality of the information icon
        Given access to the Prepayment Charge Calculator tab
        When I click on the information icon
        Then I should see a related message

# 90,0.00
# validation Do you have an Alternative Mortgage?


