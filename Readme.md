# Simple Blog Manager

A simple blog management app built using HTML, CSS, and JavaScript with a local JSON Server backend. It allows users to view, add, edit, and delete blog posts through a clean and user-friendly interface.

---

## Features

- View a list of blog post titles
- See full post details on click
- Add a new blog post using a form
- Edit post title and content
- Delete posts
- All data is fetched from and saved to a mock API using `fetch()`

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- [JSON Server](https://github.com/typicode/json-server) for the backend
- [Live Server](https://www.npmjs.com/package/live-server) for local frontend preview

---

## Getting Started

### Prerequisites

Make sure you have Node.js installed, then install the following globally:

```bash
npm install -g json-server live-server
Project Setup
Clone the repo or download the ZIP.

Inside the project folder, make sure you have:
index.html  
style.css  
index.js  
db.json
Start the backend server:


json-server --watch db.json
Launch the frontend with:

live-server
The app should open in your browser at: http://127.0.0.1:5500

API Endpoints (Local JSON Server)
GET /posts — fetch all posts

GET /posts/:id — fetch a single post

POST /posts — create a new post

PATCH /posts/:id — update an existing post

DELETE /posts/:id — delete a post

🔗 Live Demo (Frontend Only)
This version is hosted on GitHub Pages. Since it uses fetch() to call localhost:3000, you won’t see full functionality unless you run JSON Server locally.


Author
Kurui Joshua
Student at Moringa School


