1. Users

- GET /users/:id => returns a single user's information
- PUT /users/:id => edit a user's information
- POST /users => creates a new user
- POST /users/token => verifies user login credentials and returns a jwt token

2. Posts

- GET /posts => returns all posts in the main feed
- GET /posts/:id => returns a single post (pops up as a modal)
- GET /posts/:userId => return all the posts for a single user
- POST /posts => creates a new post
- DELETE /posts/:id => deletes a post

3. Comments

- GET /comments/:postId => returns all comments for a single post
- POST /comments/:postId => creates a new comment for a post
- PUT /comments/:id => edits a single comment
- DELETE /comments/:id => deletes a single comment

4. Likes

- GET /likes/:postId => returns all likes for a single post
- POST /likes/:postId => adds a new like for a post
- DELETE /likes/:id => removes a like for a post
