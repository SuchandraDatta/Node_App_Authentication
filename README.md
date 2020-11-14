**Authenticating Node app**
1. Using cookies 
2. Using sessions
3. Using JWT

For first two methods, no database connections were done so as to keep it simple and not get overwhelmed as a beginner. The third method is done using MongoDB for storage, retrieval and password checking. One of the mistakes made is using POST with /auth route but not properly set up the body parser middleware so the form data can't be obtained as expected in passport and the failureRedirect keeps getting fired. Tried to make a simple UI for authentication with passport and sessions. Testing all the methods using Postman(it makes making requests with bearer token so easy, else same needs to be done with ajax). Using passport and sessions, while defining session, if cookie:{maxAge: milliseconds} is not defined then cookie is treated as a non-persistent cookie and deleted on exiting the application.
Further in-depth understanding of the topic is present in my article published on freecodecamp.org linked below
https://www.freecodecamp.org/news/authenticate-users-node-app/

![pic1](https://user-images.githubusercontent.com/41965125/87876821-1cc58300-c9f8-11ea-9aac-bcde69fbe26b.png)

**Samples of the UI**
![pic1](https://user-images.githubusercontent.com/41965125/87876845-54342f80-c9f8-11ea-8849-bc1bb0ef03eb.png)

![pic1](https://user-images.githubusercontent.com/41965125/87876857-73cb5800-c9f8-11ea-9f14-64b9f85a3d4b.png)
![pic1](https://user-images.githubusercontent.com/41965125/87876887-9a898e80-c9f8-11ea-93aa-d54002acc615.png)