const categoriesLinks = document.getElementsByClassName("category-link");

for (let item of categoriesLinks) {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        
        const category = item.id;
        window.location.href = `/?category=${category}`;
    });
}