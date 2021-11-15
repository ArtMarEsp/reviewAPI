# Introduction
This API helps you get the reviews of the last game session of a user. They can only post one review per session and it should be rated from 1 to 5, also they can choose to leave a comment or not, that doesn't matter.

# How it works
When a user finishes his game session, he will be redirected to localhost:3000/exits where he will get a sessionId, then he has to put that sessionId in the url (localhost:3000/exits/sessionId) and on that page he can post his review.

The SCP team can register at localhost:3000/users/signup, here they can create their spId and set a password. Then they can use it at localhost:3000/users/login to create an authorization token that allows them to view the reviews at localhost:3000/reviews (which shows all reviews) and localhost:3000/reviews/last (which shows only the last 10 reviews).

Also everyone can access the filtered reviews at localhost:3000/reviews/rate, here they can see all reviews with any value they want (as long as it is a number between 1 and 5).
