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
        postList.appendChild(div);
      });
    });
}

document.addEventListener("DOMContentLoaded", displayPosts);
