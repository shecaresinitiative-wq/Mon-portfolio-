// --- TABS LOGIC ---
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.target).classList.add('active');
    });
});

// --- TYPEWRITER EFFECT ---
const textToType = "Architecting enterprise-grade systems for global clients. From AI agents to native M-Pesa Daraja integrations, I build the engines that scale businesses.";
const typewriterElement = document.getElementById('typewriter');
let index = 0;

function typeText() {
    if (index < textToType.length) {
        typewriterElement.textContent += textToType.charAt(index);
        index++;
        setTimeout(typeText, 30);
    }
}

window.onload = () => {
    setTimeout(typeText, 500);
};

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
