const categoriesLinks = document.getElementsByClassName("category-link");

for (let item of categoriesLinks) {
    item.addEventListener('click', (event) => {
        event.preventDefault();

        const category = item.id;
        window.location.href = `/?category=${category}`;
    });
}

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});