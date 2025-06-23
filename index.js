// Show all posts when the page loads
function displayPosts() {
  fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = "<h2>All Posts</h2>";

      // Go through each post and add it to the list
      posts.forEach(post => {
        const div = document.createElement("div");
        div.textContent = post.title;
        div.dataset.id = post.id;

        // When you click a title, show the full post
        div.addEventListener("click", () => {
          showPostDetails(post.id);
        });

        postList.appendChild(div);
      });
    });
}

// Get one post and show its full content
function showPostDetails(id) {
  fetch(`http://localhost:3000/posts/${id}`)
    .then(res => res.json())
    .then(post => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p><em>by ${post.author}</em></p>
      `;
    });
}

// Handle the form that adds a new post
function addNewPostListener() {
  const form = document.getElementById("new-post-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop the form from refreshing the page

    // Get values from the form inputs
    const title = document.getElementById("new-title").value;
    const author = document.getElementById("new-author").value;
    const content = document.getElementById("new-content").value;

    const newPost = { title, author, content };

    // Add the new title to the post list
    const postList = document.getElementById("post-list");
    const div = document.createElement("div");
    div.textContent = newPost.title;

    // When clicked, show the new post’s content
    div.addEventListener("click", () => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${newPost.title}</h2>
        <p>${newPost.content}</p>
        <p><em>by ${newPost.author}</em></p>
      `;
    });

    postList.appendChild(div);
    form.reset(); // clear the form after submission
  });
}

// Run everything after the page finishes loading
document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
  addNewPostListener();
});
