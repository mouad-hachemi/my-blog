const categoriesLinks = document.getElementsByClassName("category-link");

for (let item of categoriesLinks) {
    item.addEventListener('click', (event) => {
        event.preventDefault();

        const category = item.id;
        const urlParams = new URLSearchParams();
        urlParams.append("category", category);

        window.location.search = urlParams;
    });
}