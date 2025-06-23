// Fetch all posts and display them in the sidebar
function displayPosts() {
  fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = "<h2>All Posts</h2>";

      // Automatically show the first post when page loads
      if (posts.length > 0) {
        showPostDetails(posts[0].id);
      }

      // Add each post title to the list
      posts.forEach(post => {
        const div = document.createElement("div");
        div.textContent = post.title;
        div.dataset.id = post.id;
        div.addEventListener("click", () => showPostDetails(post.id));
        postList.appendChild(div);
      });
    });
}

// Display the details of a single post when clicked
function showPostDetails(id) {
  fetch(`http://localhost:3000/posts/${id}`)
    .then(res => res.json())
    .then(post => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p><em>by ${post.author}</em></p>
        <button id="edit-btn">Edit</button>
        <button id="delete-btn">Delete</button>
      `;

      // Attach listeners to the edit and delete buttons
      attachDetailButtons(post.id);
    });
}

// Add functionality to Edit and Delete buttons
function attachDetailButtons(postId) {
  // Handle edit click
  document.getElementById("edit-btn").addEventListener("click", () => {
    fetch(`http://localhost:3000/posts/${postId}`)
      .then(res => res.json())
      .then(post => {
        const editForm = document.getElementById("edit-post-form");
        editForm.classList.remove("hidden");

        // Fill in the form with the current post's info
        document.getElementById("edit-title").value = post.title;
        document.getElementById("edit-content").value = post.content;
        editForm.dataset.id = post.id;
      });
  });

  // Handle delete click
  document.getElementById("delete-btn").addEventListener("click", () => {
    deletePost(postId);
  });
}

// Delete a post from the server and remove it from the UI
function deletePost(postId) {
  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "DELETE",
  })
    .then(res => {
      if (res.ok) {
        // Remove the post from the list
        document.querySelector(`#post-list div[data-id="${postId}"]`).remove();
        // Reset the detail section
        document.getElementById("post-detail").innerHTML = "<p>Select a post to see details</p>";
        // Hide the edit form if it was open
        document.getElementById("edit-post-form").classList.add("hidden");
      }
    });
}

// Handle new post form submission
function addNewPostListener() {
  const form = document.getElementById("new-post-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Grab input values
    const title = document.getElementById("new-title").value;
    const author = document.getElementById("new-author").value;
    const content = document.getElementById("new-content").value;

    const newPost = { title, author, content };

    // Save new post to server
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    })
      .then(res => res.json())
      .then(post => {
        // Add the new post title to the list
        const div = document.createElement("div");
        div.textContent = post.title;
        div.dataset.id = post.id;
        div.addEventListener("click", () => showPostDetails(post.id));
        document.getElementById("post-list").appendChild(div);
        // Clear the form
        form.reset();
      });
  });
}

// Handle post editing
document.getElementById("edit-post-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const postId = e.target.dataset.id;
  const title = document.getElementById("edit-title").value;
  const content = document.getElementById("edit-content").value;

  const updatedPost = { title, content };

  // Send updated info to server
  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost)
  })
    .then(res => res.json())
    .then(post => {
      // Refresh the detail view with updated info
      showPostDetails(post.id);
      // Hide the edit form again
      document.getElementById("edit-post-form").classList.add("hidden");

      // Also update the title in the post list
      const postDiv = document.querySelector(`#post-list div[data-id="${post.id}"]`);
      if (postDiv) postDiv.textContent = post.title;
    });
});

// Cancel editing and hide form
document.getElementById("cancel-edit").addEventListener("click", () => {
  document.getElementById("edit-post-form").classList.add("hidden");
});

// Start the app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
  addNewPostListener();
});
