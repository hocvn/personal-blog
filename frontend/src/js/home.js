// Thêm sự kiện click cho các nút chuyển trang
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


document.querySelector(".add-post-button").addEventListener("click", () => {
    window.location.href = "add-post.html"; // Chuyển sang trang nhập bài viết
});


document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Gọi API lấy danh sách bài viết
        const response = await fetch("http://localhost:3000/api/posts"); 

        console.log(response);
        const posts = await response.json();

        // Hiển thị bài viết lên giao diện
        const blogContainer = document.querySelector(".blog-container");
        blogContainer.innerHTML = ""; // Xóa nội dung cũ trước khi render mới

        posts.forEach(post => {
            const article = document.createElement("article");
            article.classList.add("blog-post");

            article.innerHTML = `
                <img src="${post.image || '../../images/blog.jpg'}" alt="${post.title}">
                <h3>${post.title}</h3>
                <p>${post.content.substring(0, 40)}...</p>
                <a href="#" class="read-more" data-id="${post._id}">Đọc tiếp</a>
            `;

            article.querySelector(".read-more").addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = `post.html?id=${post._id}`;
            });

            blogContainer.appendChild(article);
        });

    } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
    }
});
