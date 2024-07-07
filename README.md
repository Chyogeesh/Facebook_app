# Facebook_app
It is a internship assignment
To create a simple webpage using the MERN (MongoDB, Express.js, React, Node.js) stack that interacts with the Facebook Graph API, follow these steps. We will create a React frontend that allows Facebook login, fetches user profile information, displays a dropdown of managed pages, and shows insights for the selected page.

Step-by-Step Implementation
1. Create a Facebook App
Go to Facebook Developers.
Click on Create App.
Select Other and click Next.
Select Business and click Create App.
2. Enabling User Login
Navigate to https://developers.facebook.com/apps/<app_id>/add/.
Replace <app_id> with your app ID.
Scroll to Facebook Login for Facebook, click Set Up.
In the setup page, add http://localhost:3000 (or your development server URL) to Valid OAuth Redirect URIs and Allowed Domains for the JavaScript SDK.
Save changes.
