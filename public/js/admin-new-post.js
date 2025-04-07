const quill = new Quill("#editor", {
    modules: {
        syntax: true,
        toolbar: '#toolbar-container',
    },
    theme: 'snow'
});

document.querySelector(".ql-direction").click();

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

function animateSnackbar({flag, message}) {
    let snackbar = document.querySelector("#snackbar");
    snackbar.innerHTML = message;
    if (flag) {
        snackbar.className = "success";
    } else {
        snackbar.className = "fail";
    }
    setTimeout(() => { snackbar.className = snackbar.className.replace(/success|fail/g, "") }, 3000);
}