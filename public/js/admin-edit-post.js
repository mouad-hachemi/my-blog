const form = document.querySelector("form");

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