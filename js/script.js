// Navbar toggle
const overlay = document.getElementById("menuOverlay");
const hamburger = document.getElementById("hamburger");
const trail = document.getElementById("cursorTrail");
let isOverlayActive = false;

function toggleMenu(e) {
  if (e) e.stopPropagation();
  overlay.classList.toggle("active");
  hamburger.classList.toggle("hide-hamburger");

  // Hide cursor trail if overlay is not active anymore
  if (!overlay.classList.contains("active")) {
    trail.style.opacity = 0;
  }
}

// Close if click on overlay but not on links or close-btn
overlay.addEventListener("click", function (e) {
  const clickedTag = e.target.tagName.toLowerCase();
  if (clickedTag !== "a" && !e.target.classList.contains("close-btn")) {
    overlay.classList.remove("active");
    hamburger.classList.remove("hide-hamburger");
    trail.style.opacity = 0; // Fix lingering dot
  }
});

// Auto-close overlay on link click
document.querySelectorAll(".overlay-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    overlay.classList.remove("active");
    hamburger.classList.remove("hide-hamburger");
    trail.style.opacity = 0; // Fix lingering dot
  });
});

// Optimized Cursor Animation with requestAnimationFrame
let mouseX = 0;
let mouseY = 0;
let rafActive = false;

document.addEventListener("mousemove", (e) => {
  if (overlay.classList.contains("active")) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafActive) {
      rafActive = true;
      requestAnimationFrame(moveTrail);
    }
  } else {
    trail.style.opacity = 0;
  }
});

function moveTrail() {
  trail.style.opacity = 1;
  trail.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  rafActive = false;
}

// Theme Toggle Functionality
const toggleBtn = document.getElementById("darkModeToggle");
const body = document.body;
const hero = document.getElementById("hero");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);

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
  body.classList.toggle("dark-mode");
  hero.classList.toggle("animated-bg");
  hero.classList.toggle("dark-hero");

  const isDark = body.classList.contains("dark-mode");
  html.setAttribute("data-theme", isDark ? "dark" : "light");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  toggleBtn.innerHTML = isDark
    ? '<i class="fas fa-sun me-2"></i> Light Mode'
    : '<i class="fas fa-moon me-2"></i> Dark Mode';
});

// Typewriter Effect
const titles = ["Web Developer", "App Designer", "Web Designer"];
const typewriter = document.getElementById("typewriter");
let index = 0;

function typeEffect(text, callback) {
  typewriter.classList.remove("typewriter-text");
  void typewriter.offsetWidth;
  typewriter.classList.add("typewriter-text");
  typewriter.textContent = text;
  setTimeout(callback, 2500);
}

function loopTitles() {
  typeEffect(titles[index], () => {
    index = (index + 1) % titles.length;
    loopTitles();
  });
}

loopTitles();

// Scroll to top
const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

document.getElementById("year").textContent = new Date().getFullYear();

// Contact Form
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const msgEl = document.getElementById("formMsg");

  msgEl.innerText = "Sending...";

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      msgEl.style.color = "lightgreen";
      msgEl.innerText = "Your message was sent to Sohel Khan successfully! 🤗";
      form.reset();
    } else {
      return response.json().then(data => {
        msgEl.style.color = "salmon";
        msgEl.innerText = data.error || "Oops! Something went wrong.";
      });
    }
  })
  .catch(() => {
    msgEl.style.color = "salmon";
    msgEl.innerText = "Something went wrong. Try again later.";
  });
});

// Video and image logic for projects
document.querySelectorAll('.project-card').forEach(card => {
  const video = card.querySelector('.project-video');
  const fallbackImg = card.querySelector('.fallback-img');

  // Hide fallback image initially
  fallbackImg.style.display = 'none';

  // Handle video error
  video.onerror = function () {
    video.style.display = 'none';
    fallbackImg.style.display = 'block';
  };

  // Optional: If source fails to load, this also catches it
  const source = video.querySelector('source');
  source.addEventListener('error', () => {
    video.style.display = 'none';
    fallbackImg.style.display = 'block';
  });
});