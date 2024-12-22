POST /auth/register - User registration.
POST /auth/login - User login.
POST /auth/logout - User logout.
POST /auth/forgot-password - Request password reset.
POST /auth/reset-password - Reset password.
GET /auth/verify-email/:token - Verify user email.
POST /auth/resend-verification-email - Resend verification email.
User Routes
GET /user - Fetch all users (e.g., for admin or follower suggestions).
GET /user/:id - Fetch a specific user's profile.
PUT /user/:id - Update user profile (bio, profile picture, banner, etc.).
GET /user/:id/followers - Fetch a user's followers.
GET /user/:id/following - Fetch users a user is following.
POST /user/:id/follow - Follow a user.
DELETE /user/:id/unfollow - Unfollow a user.
Post Routes
POST /posts - Create a new post (text and optional image).
GET /posts - Fetch all posts (e.g., for a feed).
GET /posts/:id - Fetch details of a specific post.
PUT /posts/:id - Update a specific post (e.g., edit text).
DELETE /posts/:id - Delete a specific post.
POST /posts/:id/like - Like a post.
DELETE /posts/:id/unlike - Unlike a post.
GET /posts/:id/comments - Fetch comments on a post.
POST /posts/:id/comments - Add a comment to a post.
DELETE /posts/:postId/comments/:commentId - Delete a comment.
Notification Routes
GET /notifications - Fetch all notifications for the logged-in user.
PUT /notifications/:id/mark-as-read - Mark a notification as read.
DELETE /notifications/:id - Delete a specific notification.
File Upload Routes (AWS S3 Integration)
POST /upload/profile-picture - Upload a profile picture.
POST /upload/banner-picture - Upload a banner picture.
POST /upload/post-image - Upload an image for a post.
Other Routes
GET /feed - Fetch the user’s feed (posts from followed users).
GET /search - Search for users or posts. nothing just 