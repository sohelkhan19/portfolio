// Navbar toggle
const overlay = document.getElementById("menuOverlay");
const hamburger = document.getElementById("hamburger");

function toggleMenu(e) {
  if (e) e.stopPropagation();
  overlay.classList.toggle("active");
  hamburger.classList.toggle("hide-hamburger");
}
// Close if click on overlay but not on links or close-btn
overlay.addEventListener("click", function (e) {
  const clickedTag = e.target.tagName.toLowerCase();
  if (clickedTag !== "a" && !e.target.classList.contains("close-btn")) {
    overlay.classList.remove("active");
    hamburger.classList.remove("hide-hamburger");
  }
});
// Auto-close overlay on link click
document.querySelectorAll(".overlay-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    overlay.classList.remove("active");
    hamburger.classList.remove("hide-hamburger");
  });
});

// Theme Toggle Functionality
const toggleBtn = document.getElementById("darkModeToggle");
const body = document.body;
const hero = document.getElementById("hero");
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);

// Set initial state based on saved theme
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  hero.classList.remove("animated-bg");
  hero.classList.add("dark-hero");
  toggleBtn.innerHTML = '<i class="fas fa-sun me-2"></i> Light Mode';
} else {
  body.classList.remove("dark-mode");
  hero.classList.add("animated-bg");
  hero.classList.remove("dark-hero");
  toggleBtn.innerHTML = '<i class="fas fa-moon me-2"></i> Dark Mode';
}

toggleBtn.addEventListener("click", () => {
  // Toggle classes
  body.classList.toggle("dark-mode");
  hero.classList.toggle("animated-bg");
  hero.classList.toggle("dark-hero");

  // Update data-theme attribute
  const isDark = body.classList.contains("dark-mode");
  html.setAttribute("data-theme", isDark ? "dark" : "light");

  // Save preference
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Update button text
  toggleBtn.innerHTML = isDark
    ? '<i class="fas fa-sun me-2"></i> Light Mode'
    : '<i class="fas fa-moon me-2"></i> Dark Mode';
});

// Typewriter Effect
const titles = ["Web Developer", "App Designer", "Web Designer"];
const typewriter = document.getElementById("typewriter");

let index = 0;

function typeEffect(text, callback) {
  typewriter.classList.remove("typewriter-text"); // restart animation
  void typewriter.offsetWidth; // trigger reflow
  typewriter.classList.add("typewriter-text");
  typewriter.textContent = text;
  setTimeout(callback, 2500); // wait then move to next
}

function loopTitles() {
  typeEffect(titles[index], () => {
    index = (index + 1) % titles.length;
    loopTitles();
  });
}

// Initialize everything
loopTitles();

// Scroll to top
const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

document.getElementById("year").textContent = new Date().getFullYear();

// Cursor Animation
const trail = document.querySelector(".cursor-trail");
const overlay1 = document.querySelector(".overlay-menu");

document.addEventListener("mousemove", (e) => {
  if (overlay1.classList.contains("active")) {
    trail.style.opacity = 1;
    trail.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  } else {
    trail.style.opacity = 0;
  }
});
