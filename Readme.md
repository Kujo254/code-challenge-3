# Simple Blog Manager

A simple blog management app built using HTML, CSS, and JavaScript with a local JSON server backend. It allows users to view, add, edit, and delete blog posts from a clean and easy-to-use interface.

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
- [JSON Server](https://github.com/typicode/json-server) for the local backend
- Live Server for frontend preview

---

## Getting Started

### Prerequisites

- Node.js installed
- `json-server` and `live-server` installed globally:

```bash
npm install -g json-server live-server
Project Setup
1.Clone the repo or download the ZIP

2.Inside the project folder, you should see:
index.html  
style.css  
index.js  
db.json
3.Run the backend server:
json-server --watch db.json
4.Open the frontend with:
live-server
The app will open at something like http://127.0.0.1:5500

API Endpoints (local JSON server)
GET /posts - fetch all posts

GET /posts/:id - fetch single post

POST /posts - create new post

PATCH /posts/:id - update a post

DELETE /posts/:id - delete a post

Author
Kurui Joshua
Student at Moringa School

