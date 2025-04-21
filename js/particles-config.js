// Initialize particles.js
document.addEventListener("DOMContentLoaded", function () {
  // Only initialize if the element exists
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 50 },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          out_mode: "out",
        },
      },
      interactivity: {
        detect_on: "window", // This makes it respond to window clicks
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
        },
        modes: {
          repulse: { distance: 100 },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
    // Make sure particles cover the full hero section
    const hero = document.getElementById("hero");
    const particles = document.getElementById("particles-js");
    particles.style.width = hero.offsetWidth + "px";
    particles.style.height = hero.offsetHeight + "px";
  }
});
