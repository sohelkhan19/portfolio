// HERO PARTICLES
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
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      out_mode: "out"
    }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 100 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// PROJECTS PARTICLES
particlesJS("particles-js-projects", {
  particles: {
    number: { value: 40 },
    color: { value: ["#00bfff", "#ff69b4", "#7fff00"] },
    shape: {
      type: "polygon",
      polygon: { nb_sides: 6 }
    },
    opacity: {
      value: 0.7,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.3,
        sync: false
      }
    },
    size: { value: 4, random: true },
    line_linked: {
      enable: true,
      distance: 100,
      color: "#00bfff",
      opacity: 0.3,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "bottom-right",
      random: true,
      straight: false,
      out_mode: "out",
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "repulse" }
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 0.5 } },
      repulse: { distance: 150 }
    }
  },
  retina_detect: true
});
