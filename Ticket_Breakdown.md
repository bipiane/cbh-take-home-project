# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1. Ticket #1: Support Custom Agent ID
Update database schema to add the `custom_id` column to the `agents` table. This custom ID is provided and maintained by the agent facility.
Since it's a new column, consider creating the `custom_id` as varchar 255 and null-able true.
   1. Acceptance criteria:
      1. Database:
         1. New `custom_id` in `agents` table. 
         2. New INDEX KEY for the new `custom_id`.
      2. Backend:
         1. Controllers, services and APIs create, read, update, delete agents with the new customer ID. Other features remain unchanged, including Agent database ID.
         2. Data validation to return an error when the `custom_id` is invalid: not empty strings and only alphanumeric characters. Retrieve the error code and the end user readable error message. 
         3. Update or create new tests. 
         4. Coverage with more than 80%.
      3. Frontend:
         1. The new `custom_id` can be displayed and updated by facility users from the frontend.
         2. Show an error message to the end user in case of a validation error.
   2. Time/effort:
      1. Database: 1hs.
      2. Backend: 6hs.
      3. Frontend: 5h.
   3. Implementation:
      1. A migration script is created to add the new customer ID and its index to the Agent table.
      2. Compatibility: Since the new custom ID is optional (null-able true), a new API or service version is unnecessary.
      3. Deployment: Asynchronous but in order, Database, Backend and finally Frontend.
2. Ticket #2: Update getShiftsByFacility to return Custom Agent ID.
Update `getShiftsByFacility` so that in the agent metadata the Custom ID is also returned.
This method is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned.
   1. Acceptance criteria:
      1. Backend: 
         1. The `getShiftsByFacility` method is updated to return the Agent's `custom_id` in addition to the Agent database id.
         2. Any method, function or service that calls the `getShiftsByFacility` is updated to use the `custom_id` if it's available. 
         3. New tests are created or updated to start using the new `custom_id`. 
         4. Coverage with more than 80%.
   2. Time/effort:
      1. Backend: 2hs
   3. Implementation:
      1. The `getShiftsByFacility` method is compatible with agents without custom ID.
3. Ticket #3: Update generateReport to support Agent's Custom ID
Update `generateReport` to support the new Agent's `custom_id` (when it's possible) along with the database id. 
This method is called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.
   1. Acceptance criteria:
      1. Backend:
         1. The `generateReport` method is updated to use the Agent's `custom_id` when its available, instead of the database id.
         2. The exported PDF shows the Agent's Custom ID when is available.
         3. New tests are created or updated using the new `custom_id`.
         4. Coverage with more than 80%.
   2. Time/effort:
      1. Backend: 1h.
   3. Implementation:
      1. The `generateReport` method is compatible with agents without custom ID.
4. Ticket #3: Agent Custom ID Documentation.
Create documentation for end users and for internal or dev users. 
   1. Acceptance criteria:
      1. Backend: 
         1. Update the API documentation with the `custom_id` field.
         2. Add the new validation code for invalid `custom_id`.
         3. Update any reference to the `getShiftsByFacility` and `generateReport` methods.
      2. Frontend:
         1. Update the frontend documentation to the final user. 
         2. Explain what the new `custom_id` field is, and how to save and update it. Add screenshots of the new UI.
   2. Time/effort:
      1. Backend: 1h.
      2. Frontend: 1h.
   3. Implementation:
      1. The new documentation should be validated before deployment.

The time and effort estimate for all tickets would be around 17 hours. The effort is focusing on back-end code and writing unit tests.