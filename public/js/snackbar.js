function animateSnackbar({ flag, message, id }, redirect = false) {
    let snackbar = document.querySelector("#snackbar");
    snackbar.innerHTML = message;
    if (flag) {
        snackbar.className = "success";
    } else {
        snackbar.className = "fail";
    }
    setTimeout(() => {
        snackbar.className = snackbar.className.replace(/success|fail/g, "");
        if (redirect && flag) window.location.replace('/admin/edit-post/' + id);
    }, 3000);
}