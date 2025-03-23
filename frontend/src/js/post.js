// Get the post ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);

        if (targetId === "home") {
            window.location.href = "home.html";
            return;
        }
        const targetElement = document.getElementById(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 60,
            behavior: "smooth"
        });
    });
});


// Fetch the post data dynamically
if (postId) {
    fetch(`http://localhost:3000/api/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch post data");
            }
            return response.json();
        })
        .then(postData => {
            document.getElementById('post-title').textContent = postData.title;
            document.getElementById('post-content').innerHTML = postData.content;
        })
        .catch(error => {
            console.error("Error fetching post data:", error);
            alert("Unable to load the post. Please try again later.");
        });
} else {
    alert("No post ID provided in the URL.");
}

document.querySelector(".back-button").addEventListener("click", () => {
    window.location.href = "home.html"; // Chuyển sang trang chủ
});

document.querySelector(".edit-button").addEventListener("click", () => {    
    window.location.href = `edit-post.html?id=${postId}`; // Chuyển sang trang sửa bài viết
});

// Delete post
document.querySelector(".delete-button").addEventListener("click", async () => {
    try {
        console.log(postId);
        const response = await fetch(`http://localhost:3000/api/posts/delete/${postId}`, {
            method: "DELETE"
        });
        if (response.ok) {
            alert("Xóa bài viết thành công");
            window.location.href = "home.html";
        } else {
            alert("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    } catch (error) {
        console.error("Error in delete post: ", error);
    }
});