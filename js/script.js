/* ===== Helpers ===== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ===== 1. Theme toggle (saved in localStorage) ===== */
const themeBtn = $("#themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "🌙" : "☀️";
}

let savedTheme = "dark";
try { savedTheme = localStorage.getItem("theme") || "dark"; } catch (e) { /* storage blocked */ }
applyTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
});

/* ===== 2. Mobile menu ===== */
const menuBtn = $("#menuBtn");
const navLinks = $("#navLinks");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.textContent = open ? "✕" : "☰";
});
$$("#navLinks a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
  })
);

/* ===== 3. Typing effect ===== */
const roles = [
  "Computer Science student",
  "Cybersecurity enthusiast",
  "CTF player (Forensics)",
  "Defensive security learner",
  "AI & data curious mind",
];
const typedEl = $("#typed");
let roleIndex = 0, charIndex = 0, deleting = false;

function type() {
  const word = roles[roleIndex];
  typedEl.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 80);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1400);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 40);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 300);
  }
}
type();

/* ===== 4. Scroll reveal + counters + language bars ===== */
function animateCount(el) {
  const target = Number(el.dataset.target);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current;
  }, 40);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("visible");

      const counter = $(".count", el);
      if (counter) animateCount(counter);

      $$(".fill", el).forEach((bar) => (bar.style.width = bar.dataset.width + "%"));
      revealObserver.unobserve(el);
    });
  },
  { threshold: 0.15 }
);
$$(".reveal").forEach((el) => revealObserver.observe(el));

/* ===== 5. Scroll progress, active link, back-to-top ===== */
const progressBar = $("#progressBar");
const toTop = $("#toTop");
const sections = $$("main section[id]");
const links = $$("#navLinks a");

function onScroll() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (height > 0 ? (scrollTop / height) * 100 : 0) + "%";

  toTop.classList.toggle("show", scrollTop > 500);

  let current = "home";
  sections.forEach((sec) => {
    if (scrollTop >= sec.offsetTop - 140) current = sec.id;
  });
  links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ===== 6. Project filter ===== */
const filterBtns = $$(".filter");
const projects = $$(".project");

filterBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    projects.forEach((p) => p.classList.toggle("hide", f !== "all" && p.dataset.category !== f));
  })
);

/* ===== 7. Contact form validation ===== */
const form = $("#contactForm");
const status = $("#formStatus");

function setError(id, message) {
  $("#" + id + "Error").textContent = message;
  $("#" + id).classList.toggle("invalid", Boolean(message));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const message = $("#message").value.trim();
  let valid = true;

  setError("name", ""); setError("email", ""); setError("message", "");
  status.textContent = "";

  if (name.length < 2) { setError("name", "Please enter your name (2 characters min)."); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("email", "Please enter a valid email address."); valid = false; }
  if (message.length < 10) { setError("message", "Your message must be at least 10 characters."); valid = false; }
  if (!valid) return;

  // No backend: open the visitor's mail app with the message pre-filled.
  const subject = encodeURIComponent("Portfolio contact from " + name);
  const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
  window.location.href = "mailto:aa.zeddoun@ensta.edu.dz?subject=" + subject + "&body=" + body;

  status.textContent = "Thanks " + name + "! Your email app should open now.";
  form.reset();
});

/* ===== 8. Footer year ===== */
$("#year").textContent = new Date().getFullYear();
