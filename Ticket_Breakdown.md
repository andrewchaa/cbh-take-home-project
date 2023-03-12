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

### Ticket 1: Use a custom Agent Id to manage an Agent in the system

#### Acceptance Criteria

- Use a custom agent Id to create, update, or delete an agent.
- The custom Id should be human-readable and easy to identify an agent.
- API documentation to be updated upon this change

#### Time/Effort Estimate

2 day

#### Implementation Details

- A new column named `facility_agent_id` should be added to the Agents table with a `NVARCHAR` data type.
- The existing POST, PATCH, and DELETE endpoint should be updated to accomodate the change.
- Update the API documentation
- The input for `facility_agent_id` in the API request should be mandatory. The POST endpoint should verify that the provided facility Id exists in the request and is valid, and insert the value to the corresponding Agent's `facility_agent_id` column.
- If the value for the customer agent Id is missing, the API should return `400 BAD REQUEST`.
- The POST API endpoint should also checks if the incoming agent Id is already used in the table. Duplicate agent Ids are not allowed and the endpoints should return `409 CONFLICT`.

### Ticket 2: Update the getShiftsByFacility function to return the Facility-specific Agent ID

#### Acceptance Criteria

- The `getShiftsByFacility` function should be updated to include the `facility_agent_id` field for each Shift returned.

#### Time/Effort Estimate

1/2 day

#### Implementation Details

The `getShiftsByFacility` function should be updated to include the `facility_agent_id` field in the query and return the value along with the other metadata for each Shift.

### Ticket 3: Display the custom agent Id in the PDF report.

#### Acceptance Criteria

- The `facility_agent_id` should be visible in the PDF refport instead of database-generated Id for each agent.

#### Time/Effort Estimate

1/2 day

#### Implementation Details

- The `generateReport` function should be updated to use the `facility_agent_id` field from the given list of shifts.
- The PDF report will be updated to display `facility_agent_id` to identify an Agent, instead of the internal database ID.

### Definition of done

- Each change should have accompanying unit tests
- Each change should have at least one happy-path integration test
- Each change should not break any build in each environment

