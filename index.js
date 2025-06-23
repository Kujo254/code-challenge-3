// Load all posts when the page starts
function displayPosts() {
  fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = "<h2>All Posts</h2>";

      // Show the first post by default
      if (posts.length > 0) {
        showPostDetails(posts[0].id);
      }

      // Show all titles
      posts.forEach(post => {
        const div = document.createElement("div");
        div.textContent = post.title;
        div.dataset.id = post.id;

        // When I click a title, show the post
        div.addEventListener("click", () => {
          showPostDetails(post.id);
        });

        postList.appendChild(div);
      });
    });
}

// Show one post’s full details
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

// Add a new post from the form
function addNewPostListener() {
  const form = document.getElementById("new-post-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // don’t reload the page

    const title = document.getElementById("new-title").value;
    const author = document.getElementById("new-author").value;
    const content = document.getElementById("new-content").value;

    const newPost = { title, author, content };

    // Show the new post title
    const postList = document.getElementById("post-list");
    const div = document.createElement("div");
    div.textContent = newPost.title;

    // Let me click the new post to see its details
    div.addEventListener("click", () => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${newPost.title}</h2>
        <p>${newPost.content}</p>
        <p><em>by ${newPost.author}</em></p>
      `;
    });

    postList.appendChild(div);
    form.reset(); // clear the form
  });
}

// Run when page is ready
document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
  addNewPostListener();
});
