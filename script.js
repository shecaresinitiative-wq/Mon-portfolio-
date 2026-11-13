// To receive messages without opening an email app, create a free form at
// formspree.io and paste its URL here, e.g. "https://formspree.io/f/abcd1234".
// Leave empty to fall back to the visitor's email app.
const FORM_ENDPOINT = "";
const CONTACT_EMAIL = "robinbrian392@gmail.com";

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Theme toggle (initial theme is set in <head> to avoid a flash)
const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");
function updateToggle() {
  const dark = root.dataset.theme === "dark";
  toggle.textContent = dark ? "Light mode" : "Dark mode";
  toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}
toggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  updateToggle();
});
updateToggle();

// Contact form
const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    note.textContent = "Please fill in your name, a valid email and a short message.";
    form.reportValidity();
