const MESSAGE = "مرحبا بك على مدونة شاهين";
const DELAY = 100;
let currentIndex = 0

function animateWelcomeMessage() {
    const welcomeElement = document.getElementById("welcome-message");
    if (currentIndex < MESSAGE.length) {
        welcomeElement.innerHTML += MESSAGE[currentIndex];
        currentIndex++;
        setTimeout(animateWelcomeMessage, DELAY);
    }
}

document.addEventListener("DOMContentLoaded", animateWelcomeMessage)