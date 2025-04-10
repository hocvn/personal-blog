document.querySelector(".back-button").addEventListener("click", () => {
    history.back();
});

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


const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// load post data
if (postId) {
    fetch(`http://localhost:3000/api/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch post data");
            }
            return response.json();
        })
        .then(postData => {
            document.querySelector('#title').value = postData.title;
            document.querySelector('#content').value = postData.content;
        })
        .catch(error => {
            console.error("Error fetching post data:", error);
            alert("Unable to load the post. Please try again later.");
        });
} else {
    alert("No post ID provided in the URL.");
}

document.querySelector(".submit-button").addEventListener("click", async (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;

    if (!title || !content) {
        alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/posts/edit/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                content
            })
        });
        if (response.ok) {
            alert("Sửa bài viết thành công");
            window.location.href = "home.html";
        } else {
            alert("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    } catch (error) {
        console.error("Error in add post: ", error);
    }
});