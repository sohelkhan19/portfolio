// Theme Toggle Functionality
const toggleBtn = document.getElementById("darkModeToggle");
const body = document.body;
const hero = document.getElementById("hero");
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

// Set initial state based on saved theme
if (savedTheme === 'dark') {
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
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  
  // Save preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
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