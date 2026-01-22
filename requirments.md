**Software requirements** 

**System overview**

The system that is being tested is the provided sample API that supports functions for a food shop. The system supports user registration, authentication and usage, and order placement.

The system is implemented using Node.js, Express, and MongoDB. The system utilized JWT and Bcrypt for authentication and password encryption.

The Primary stakeholders are:

- End users  
- Administrators, who manage users and orders  
- Developers, who maintain and extend the system

**Functional requirements**

**Order placement**  
The system should allow users to create an order selecting from the predefined boxed (box1 and box2).  
**Level**  
System  
**Purpose of requirement**  
Order placement is a primary business function  
**Test approach**   
System level api tests that validate that validate successful order placement and persistence  
**Test approach justification**  
Order placement involves validation to validate the order is valid, database interaction, and usage of multiple API endpoints to ensure an order has been successfully placed.

**Order validation**   
The system should reject orders with invalid box selections  
**Level**  
Unit / integration  
**Purpose of requirement**  
Input validation ensures that all inputs and user selections are valid which protects downstream errors relating to order placement with potential invalid data.  
**Test approach**  
Unit tests for validation logic ensuring order selections are valid and integration tests verifying API level responses.  
**Test approach justification**  
Validation logic ensures that invalid user selection is caught and integration tests confirm that invalid input is handled correctly at API level

**Order retrieval**  
Administrators should be able to retrieve all placed orders  
**Level**  
System  
**Purpose of requirement**  
Administrative order retrieval is needed as a core business function.  
**Test approach**  
System level tests that verify correct access control and ensure returned data is correct  
**Test approach justification**  
Admin order retrieval is an end-to-end operation that depends on authentication, role based authorisation, request handling, database access.

**User registration**   
The system should allow new users to register with a unique username and a chosen password  
**Level**  
System / integration   
**Purpose of requirement**  
User registration is required to allow other system functionalities to work. Without user registration we can't store user details for orders.  
**Test approach**  
API integration tests exercising correct registrations and ensuring rejection of invalid or duplication registration details.  
**Test approach justification**  
Registration involves interaction between validation, request handling, and the database. Integration testing is therefore required to validate that the components work as expected.

**User Authentication**   
The system should authenticate registered users and issue a valid JWT token upon successful login  
**Level**  
System / integration   
**Purpose of requirement**  
Authentication establishes a user's identity and is required before accessing system functionality such as order placement as users can't create an order without being logged in.  
**Test approach**  
Integration tests that verify that a token is issued for valid credentials and invalid credentials are rejected.  
**Test approach justification**  
Authentication relies on interactions between multiple components such as credential checking, token generation, and request handling. Therefore integration tests are required to validate that interactions between components are correct.

**Secure password storage**  
The system should store users passwords using bcrypt and shall not store users passwords as plain text  
**Level**  
System / integration   
**Purpose of requirement**  
Secure password storage ensures that users credentials are safe in the event of a database breach.  
**Test approach**  
Unit tests that validate that upon registration users passwords are hashed and stored and password comparisons on login are correct.  
**Test approach justification**  
Password hashing logic is localised and does not depend on other components of the system as hashing logic is deterministic. This means that unit tests are sufficient to ensure correct behaviour.

**Admin access control**  
The system should restrict admin api endpoints for users with an admin role  
**Level**  
System / integration   
**Purpose of requirement**  
Role based access control ensures that operations meant to be only accessed by admins are only used by admins.  
**Test approach**  
Integration tests that attempt to access administrative endpoints with different user roles  
**Test approach justification**  
Testing depends on how different components such as authentication, authorisation checks, and endpoint logic behave.

**Quality attributes requirements** 

**Performance under load**  
The system should handle concurrent order placements with acceptable response times under load.  
**Level**  
System  
**Purpose of requirement**  
Adequate performance under heavy load ensures usability and perceived reliability   
**Test approach**  
Performance tests that test multiple api endpoints with multiple concurrent requests and ensures correct responses and obtains the time to get a response.  
**Test approach justification**  
The best way to test performance of a system under load is to simulate that heavy load. 

**startup reliability**   
When required details such as database configuration details, or authentication details are incorrect or missing it should fail fast and inform the user with clear actionable information.  
**Level**  
System  
**Purpose of requirement**  
Errors relating to database connection or authentication often result in long hangs or silent failures which can confuse users and result in perceived bad reliability of the system. Ensuring that prompt error messages with actionable information such as a basic “Error occurred: please retry later” improves user experience.  
**Test approach**  
The system should test that with incorrect or missing authentication and or database configuration details that it fails in an appropriate amount of time and does not hang or result in silent failure.  
**Test approach justification**  
Startup reliability and failure transparency for database and authentication  depend on how configuration handling, database connection handling, authentication mechanism, and error handling work together during initialisation. These interactions cannot be tested in isolation, therefore system wide testing is required to observe whether or not it fails promptly and reports clear errors rather than hanging or silently failing.

