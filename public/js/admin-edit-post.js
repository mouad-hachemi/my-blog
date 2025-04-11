const form = document.querySelector("form");
const actionButton = document.querySelector('input[type="button"]');

if (published == '1') {
    actionButton.value = "إخفاء";
    actionButton.onclick = hidePost;
    actionButton.style["background-color"] = "#FFD63A";
} else {
    actionButton.value = "نشر";
    actionButton.onclick = publishPost;
    actionButton.style["background-color"] = "#00c451";
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const content = JSON.stringify(quill.getContents().ops);

    formData.append('content', content);


    fetch("/admin/edit-post/" + postId, {
        method: "PUT",
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => animateSnackbar(data));
});

function publishPost () {
    fetch("/admin/edit-post/publish/" + postId, {
        method: 'PUT',
    })
        .then((res) => res.json())
        .then((data) => {
            animateSnackbar(data);
            if (data.flag) {
                actionButton.value = "إخفاء";
                actionButton.onclick = hidePost;
                actionButton.style["background-color"] = "#FFD63A";
            }
        });
}

function hidePost () {
    fetch("/admin/edit-post/hide/" + postId, {
        method: 'PUT',
    })
        .then((res) => res.json())
        .then((data) => {
            animateSnackbar(data);
            if (data.flag) {
                actionButton.value = "نشر";
                actionButton.onclick = publishPost;
                actionButton.style["background-color"] = "#00c451";
            }
        });
}