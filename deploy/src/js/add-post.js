document.querySelector(".back-button").addEventListener("click", () => {
    window.location.href = "home.html"; 
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

document.querySelector(".submit-button").addEventListener("click", async (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;

    if (!title || !content) {
        alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/posts/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                content
            })
        });
        if (response.ok) {
            alert("Thêm bài viết thành công");
            window.location.href = "home.html";
        } else {
            alert("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    } catch (error) {
        console.error("Error in add post: ", error);
    }
});