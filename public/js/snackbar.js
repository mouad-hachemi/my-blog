function animateSnackbar({ flag, message }) {
    let snackbar = document.querySelector("#snackbar");
    snackbar.innerHTML = message;
    if (flag) {
        snackbar.className = "success";
    } else {
        snackbar.className = "fail";
    }
    setTimeout(() => { snackbar.className = snackbar.className.replace(/success|fail/g, "") }, 3000);
}