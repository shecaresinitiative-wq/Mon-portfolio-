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
  if (!toggle) return;
  const dark = root.dataset.theme === "dark";
  toggle.textContent = dark ? "Light mode" : "Dark mode";
  toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}
if (toggle) toggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  updateToggle();
});
updateToggle();

// Jump links (Start a project, See my work, nav)
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", a.getAttribute("href"));
  });
});

// Contact form
const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");
if (form && note) form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    note.textContent = "Please fill in your name, a valid email and a short message.";
    form.reportValidity();
    return;
  }
  const d = Object.fromEntries(new FormData(form));
  if (FORM_ENDPOINT) {
    try {
      const r = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(d),
      });
      if (!r.ok) throw new Error("failed");
      form.reset();
      note.textContent = "Thanks, your message was sent. I’ll reply soon.";
    } catch (err) {
      note.textContent = "Sending failed. Please email " + CONTACT_EMAIL + " directly.";
    }
    return;
  }
  const body = "Name: " + d.name + "\nEmail: " + d.email + "\nNeed: " + d.type + "\n\n" + d.message;
  location.href = "mailto:" + CONTACT_EMAIL + "?subject=" +
    encodeURIComponent("Project enquiry from " + d.name) + "&body=" + encodeURIComponent(body);
  note.textContent = "Your email app should open with the message ready to send.";
});
