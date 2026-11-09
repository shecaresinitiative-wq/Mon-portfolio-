// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic Typewriter Effect for the Terminal
const textToType = "Architecting scalable systems. From Tinder-style matching to M-Pesa Daraja integrations. I build the engine, not just the UI.";
const typewriterElement = document.getElementById('typewriter');
let index = 0;

function typeText() {
    if (index < textToType.length) {
        typewriterElement.textContent += textToType.charAt(index);
        index++;
        setTimeout(typeText, 40); // Speed of typing (lower is faster)
    }
}

// Start typing when the page loads
window.onload = () => {
    setTimeout(typeText, 500); // Slight delay before typing starts
};
