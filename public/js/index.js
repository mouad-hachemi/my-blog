const MESSAGE = "مرحبا بك على مدونة شاهين";
const DELAY = 100;
let currentIndex = 0

const form = document.querySelector('form');
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchInput = document.getElementById("search");
    const searchTerm = searchInput.value;

    const urlParams = new URLSearchParams();
    urlParams.append('searchTerm', searchTerm);

    window.location.search = urlParams;
});

function animateWelcomeMessage() {
    const welcomeElement = document.getElementById("welcome-message");
    if (currentIndex < MESSAGE.length) {
        welcomeElement.innerHTML += MESSAGE[currentIndex];
        currentIndex++;
        setTimeout(animateWelcomeMessage, DELAY);
    }
}

document.addEventListener("DOMContentLoaded", animateWelcomeMessage)