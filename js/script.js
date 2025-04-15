const toggleBtn = document.getElementById("darkModeToggle");
const body = document.body;
const hero = document.getElementById("hero");

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  hero.classList.toggle("animated-bg");
  hero.classList.toggle("dark-hero");

  const isDark = body.classList.contains("dark-mode");
  toggleBtn.innerHTML = isDark
    ? '<i class="fas fa-sun me-2"></i> Light Mode'
    : '<i class="fas fa-moon me-2"></i> Dark Mode';
});


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

loopTitles();
