// Fetch and display all posts
function displayPosts() {
  fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = "<h2>All Posts</h2>";

      posts.forEach(post => {
        const div = document.createElement("div");
        div.textContent = post.title;
        div.dataset.id = post.id;

        // When clicked, show post details
        div.addEventListener("click", () => {
          showPostDetails(post.id);
        });

        postList.appendChild(div);
      });
    });
}

// Show full post details
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

// Run after page loads
document.addEventListener("DOMContentLoaded", displayPosts);
