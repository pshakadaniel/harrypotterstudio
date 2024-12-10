function toggleSB() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("show");
}

function headerScroll() {
  const header = document.querySelector(".header");
  if (window.scrollY > 0) {
    header.classList.add("header-scroll");
  } else {
    header.classList.remove("header-scroll");
  }
}

window.addEventListener("scroll", headerScroll);

// Ensure Swiper is defined before using it
document.addEventListener("DOMContentLoaded", () => {
  if (typeof Swiper !== "undefined") {
    const swiper = new Swiper(".swiper", {
      slidesPerView: "auto",
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    });
  }
});

//faq
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const faq = question.parentElement;
    faq.classList.toggle("active");
  });
});

//typing effect

var typed = new Typed(".input", {
  strings: ["Gryffindor ?", "Hufflepuff ?", "Ravenclaw ?", "Slytherin ?"],
  typeSpeed: 92,
  backSpeed: 82,
  loop: true,
});

//particles js

particlesJS("particles-js", {
  particles: {
    number: { value: 150, density: { enable: true, value_area: 999 } },
    color: { value: "#641e1e" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#641e1e" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 0.1,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 1,
      random: true,
      anim: { enable: false, speed: 90, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#caf0f8",
      opacity: 0.7,
      width: 0.7,
    },
    move: {
      enable: true,
      speed: 5,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: true, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 190, duration: 5 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
});

// Ensure Stats is defined before using it
if (typeof Stats !== "undefined") {
  var count_particles, stats, update;
  stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0px";
  stats.domElement.style.top = "0px";
  document.body.appendChild(stats.domElement);
  count_particles = document.querySelector(".js-count-particles");
  update = function () {
    stats.begin();
    stats.end();
    if (
      window.pJSDom[0].pJS.particles &&
      window.pJSDom[0].pJS.particles.array
    ) {
      count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
    }
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
