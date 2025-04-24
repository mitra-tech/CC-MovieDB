# 🎬 Movie Database App

This is a Movie Database application that allows users to find their next movie to watch, view movie ratings, reviews, actors, and create their own watchlist. The application fetches data from a Movie API (MovieDB) and provides useful features to enhance the user experience.

Worth mentioning: a MongoDB database is used to handle user watchlists, allowing for permanent storage. This differs from MovieDB’s watchlist, which is only accessible for one week.

---

## ✨ Features

- 🔐 Authentication and authorization
- 🏠 View the latest movies on the homepage
- 🔍 Filter movies by a partial text string
- 📄 Implemented proper pagination for a smooth user experience
- 🧑‍💻 User account creation
- 📝 Create and manage your own movie watchlist
- 💬 See user feedback

---

## 🛠 Tech Stack

- **Frontend:** React, Next.js, TypeScript, Zod
- **Auth & Security:** bcrypt, Jose
- Docker
- **Database:** MongoDB
- **Testing:** Playwright
- **API:** MovieDB API
---

## 🚀 How to Run the App

### 1. Create a `.env` File

Copy `.env-sample` to `.env` in the root directory.

### 2. Install Dependencies

<pre lang="markdown">npm install</pre>



### 3. Run Mongo as your local database
<pre lang="markdown"> docker compose up </pre>


### 4. Run the development server:
<pre lang="markdown">npm run dev </pre>

### 5. Open the application in your browser at http://localhost:3000

### 6. 🧪 Running Tests with Playwright
there are tests for authenticated and unauthenticated users. For authenticated users tests, a user credential has been hard coded in the tests which is not the best practice but reasong for doing this way was uncertainity about the deadline. The best practice is to create a global set up in the test directory and then creating a session for the tests that need authentication. With the current set up to pass all the test, a user with the following credentials needs to be registered before running the test:

username: mitra@gmail.com
password: 123456a@



▶️ To run all the tests:

<pre lang="markdown"> npm run test:e2e </pre>



▶️ To run all the tests by ui:

<pre lang="markdown">npm run test:e2e:ui </pre>


▶️ To run all a specific test:

<pre lang="markdown">npm run test test_file_name </pre>

---

## 🧠 Thought Process & Assumptions

🔐 1. Custom Authentication
Instead of using third-party libraries like NextAuth, I implemented a custom authentication system using email and password. This allowed for:

Greater control over the user experience and flow
Fine-tuned validation and error handling
Flexibility to integrate future features like multi-factor authentication or role-based access
Assumption: The authentication logic would remain relatively simple in scope, making a custom solution more maintainable and tailored than using a heavy external library.

⚙️ 2. Server-Side Rendering (SSR)
I prioritized using Server-Side Rendering (SSR) wherever possible to:

Improve SEO and initial load times
Deliver dynamic content faster, especially for routes like movie listings or watchlists
Ensure user-specific data loads securely and promptly

📨 3. Server Actions in Next.js
I leveraged Next.js Server Actions to handle form submissions directly on the server. This streamlined the logic by:

Reducing the need for API route boilerplate
Keeping form-handling code closer to the UI logic
Enforcing better security by limiting client-side exposure

💾 4. A mongodb database has been used to handle a custom user watch list rather than using MovieDB Api, so users can have a permanent watch list while on the MovieDB user can have access to watch list only for one week.

🧪 5. Tests have been added for both public routes (e.g. "/", "/register") and protected routes (e.g. "/dashboard", "/movies/[id]")

