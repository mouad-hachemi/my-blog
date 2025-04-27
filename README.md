# My Blog - A Node.js (Express.js) Blogging Platform

A full-featured blogging platform built with Node.js, Express, and EJS, featuring admin authentication, rich text editing, and responsive design.

---
## Screenshots
![blogshot-1](https://github.com/user-attachments/assets/2dc9e342-8d43-4887-a706-134d0e3af977)
![blogshot-2](https://github.com/user-attachments/assets/999c4bc0-ee3f-4cbc-bcca-398a7245d6df)
![blogshot-3](https://github.com/user-attachments/assets/7d94a459-487b-4b89-87c7-747ebcfd1548)
![blogshot-4](https://github.com/user-attachments/assets/9a4b6197-74dd-4dc3-9b92-6ed4c687546c)

---
## Features

- 🚀 Admin authentication
- ✍️ Rich text editor (Quill.js) for post creation
- 📱 Fully responsive design
- 🗃️ SQLite database for data storage
---
## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, HTML5, CSS3, JavaScript
- **Database**: TURSO SQLite
- **Editor**: Quill.js
- **Authentication**: Session-based

---
## Installation & Configuration
1. Clone the repository:
   ```bash
   git clone https://github.com/mouad-hachemi/my-blog.git
   cd my-blog
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   touch .env
   ```
   ```
   PORT = "5000"
   TURSO_DATABASE_URL = "YOUR TURSO DB URL"
   TURSO_AUTH_TOKEN = "YOUR TURSO DB TOKEN"
   GITHUB_TOKEN = "YOUR GITHUB TOKEN"
   OWNER = "GITHUB_USERNAME"
   REPO = "GITHUB REPO NAME TO STORE POSTS THUMBNAILS"
   ADMIN_AUTH = "YOUR ADMIN PASSWORD"
   SECRET_KEY = "YOUR APP SECRET KEY FOR COOKIES"
   REDIS_URL = "REDIS SERVER URL FOR SESSION MANAGEMENT"
   ```
4. Create A TURSO account and create a database with the schema found in > datastore/migrations/001-initial.sql
5. Create a Github repo where post thumbnails will be saved.
6. Start the development server:
   ```bash
   npm run start
   ```
---
## How to login to admin page
I was lazy to make a login page so I just setup a URL to login with queries:
> http://localhost:5000/admin-login?username=your_username&password=your_password
**disclaimer**: the password stored in the .env file should encrypted using bcrypt with 10 rounds, use this website to encrypt your password: > https://bcrypt-generator.com/
