**Overview**

The test plan describes how testing will be used to evaluate whether the system complies with the requirements set out in the requirements document. The sample project chosen already includes a moderate amount of testing at different levels including unit, performance, and integration tests. Where requirements are already satisfied by the existing tests they will be reused or adapted if they did not quite satisfy the existing requirement. Where the existing tests do not satisfy the requirements additional tests will be added to cover those requirements.

**Order placement**

The sample project already extensively tests order placement for users all roles, including testing that the order is stored correctly inside the database. The requirement is therefore already fulfilled by the existing tests.

**Order validation**

The existing tests do not cover what happens when a type other than “Box1” or “Box2” is selected. Additional tests will be to verify that invalid inputs such as null, or unsupported box selections such as “Box3”, are handled correctly. These tests will be implemented in the existing API test files and are expected to result in error messages.

**Order retrieval** 

The sample project already extensively tests order retrieval for admin and non admin users. The requirement is therefore already fulfilled by the existing tests.

**User registration**

The sample project already extensively tests order retrieval for user registration. The requirement is therefore already fulfilled by the existing tests.

**User authentication**

The sample project already extensively tests order retrieval for user authentication/login. The requirement is therefore already fulfilled by the existing tests.

**Secure password storage**

The sample project already tests whether password comparisons are accurate through its testing of logging in as well as whether or not passwords are hashed.. The requirement is therefore already fulfilled by the existing tests.

**Admin access control**

The sample project already extensively tests role based access control for every admin restricted end point. The requirement is therefore already fulfilled by the existing tests.

**Performance under load**

The sample project only tests single request latency which does not satisfy the performance under load test. Therefore I will extend the existing performance test file to use artillery to run concurrent request performance tests. Each artillery scenario will have multiple concurrent authenticated users place orders for “Box1” and “box2” generating repeated order requests. The results will be evaluated using artillery reported metrics (e.g p95 response time, throughput, and error rate) I will then define a reasonable threshold for an acceptable result to make this a measurable quality attribute. 

**Startup reliability** 

The startup reliability requirement is not covered by existing tests. I will construct tests with wrong database configuration. Testing placing an order without also sending an access token is already tested and results in a 401 error instantly. The test will then observe whether or not there is an error response in an appropriate amount of time (3 seconds).

**Evidence and reporting**

Test execution results will be captured and stored in the repository to provide evidence that tests were executed.

**Instrumentation plan**

Performance instrumentation is implemented using Artillery to execute concurrent requests and collect latency, throughput, and error metrics.  
