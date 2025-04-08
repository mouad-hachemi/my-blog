const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Capture quill editor content.
    const content = JSON.stringify(quill.getContents().ops);

    // Capture other input data.
    const formData = new FormData(form);

    formData.append('content', content);

    fetch('/admin/new-post', {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            animateSnackbar(data)
        })
        .catch((error) => console.error(error));
});