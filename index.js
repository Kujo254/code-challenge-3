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
        <button id="edit-btn">Edit</button>
        <button id="delete-btn">Delete</button>
      `;

      attachDetailButtons(post.id);
    });
}

// Helper to attach event listeners for edit and delete buttons
function attachDetailButtons(postId) {
  document.getElementById("edit-btn").addEventListener("click", () => {
    fetch(`http://localhost:3000/posts/${postId}`)
      .then(res => res.json())
      .then(post => {
        const editForm = document.getElementById("edit-post-form");
        editForm.classList.remove("hidden");
        document.getElementById("edit-title").value = post.title;
        document.getElementById("edit-content").value = post.content;
        editForm.dataset.id = post.id;
      });
  });

  document.getElementById("delete-btn").addEventListener("click", () => {
    deletePost(postId);
  });
}

// Delete post from backend and update DOM
function deletePost(postId) {
  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "DELETE",
  })
    .then(res => {
      if (res.ok) {
        const postList = document.getElementById("post-list");
        const postDivs = postList.querySelectorAll("div");
        postDivs.forEach(div => {
          if (parseInt(div.dataset.id) === postId) {
            div.remove();
          }
        });

        const detail = document.getElementById("post-detail");
        detail.innerHTML = "<p>Select a post to see details</p>";

        const editForm = document.getElementById("edit-post-form");
        editForm.classList.add("hidden");
      } else {
        console.error("Failed to delete post");
      }
    })
    .catch(err => console.error("Error deleting post:", err));
}

// Add a new post from the form, saving to backend
function addNewPostListener() {
  const form = document.getElementById("new-post-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("new-title").value;
    const author = document.getElementById("new-author").value;
    const content = document.getElementById("new-content").value;

    const newPost = { title, author, content };

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    })
      .then(res => res.json())
      .then(post => {
        const postList = document.getElementById("post-list");
        const div = document.createElement("div");
        div.textContent = post.title;
        div.dataset.id = post.id;

        div.addEventListener("click", () => {
          showPostDetails(post.id);
        });

        postList.appendChild(div);
        form.reset();
      })
      .catch(err => console.error("Error adding post:", err));
  });
}

// Handle the edit form submission with PATCH request
const editForm = document.getElementById("edit-post-form");

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTitle = document.getElementById("edit-title").value;
  const newContent = document.getElementById("edit-content").value;
  const postId = editForm.dataset.id;

  const updatedPost = {
    title: newTitle,
    content: newContent,
  };

  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  })
    .then(res => res.json())
    .then(post => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p><em>updated</em></p>
        <button id="edit-btn">Edit</button>
        <button id="delete-btn">Delete</button>
      `;

      editForm.classList.add("hidden");

      // Update title in post list
      const postList = document.getElementById("post-list");
      const postDivs = postList.querySelectorAll("div");
      postDivs.forEach(div => {
        if (parseInt(div.dataset.id) === post.id) {
          div.textContent = post.title;
        }
      });

      attachDetailButtons(post.id);
    })
    .catch(err => console.error("Error updating post:", err));
});

// Cancel edit and hide form
document.getElementById("cancel-edit").addEventListener("click", () => {
  editForm.classList.add("hidden");
});

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
  addNewPostListener();
});
