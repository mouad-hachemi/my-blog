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
            const submitButton = document.querySelector('input[type="submit"]');
            submitButton.disabled = true;
            submitButton.value = "يتم التوجيه لصفحة التعديل..";
            animateSnackbar(data, true)
        })
        .catch((error) => console.error(error));
});