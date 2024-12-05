function toggleSB() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("show");
}

//swiper JS;

document.addEventListener("DOMContentLoaded", () => {
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
});
//accordion
document.addEventListener("DOMContentLoaded", () => {
  const accordionButtons = document.querySelectorAll(".accordion-btn"); // Get all accordion buttons
  let activeTimeouts = {}; // Object to store timeouts for each accordion

  accordionButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // Get the associated accordion content
      const content = btn.nextElementSibling; // This is the `.accordion-content`
      const textElement = content.querySelector("p"); // Get the `<p>` inside the content

      // Check if the current accordion is open
      const isOpen = content.style.maxHeight;

      // Close all other accordions and reset their text
      document.querySelectorAll(".accordion-content").forEach((item, i) => {
        if (i !== index) {
          item.style.maxHeight = null; // Close the accordion
          item.style.opacity = 0; // Hide the content
          const resetTextElement = item.querySelector("p");
          if (resetTextElement) {
            resetTextElement.textContent = ""; // Clear text for closed accordions
          }
          clearTimeout(activeTimeouts[i]); // Stop active typing timeout for other accordions
          activeTimeouts[i] = null; // Reset timeout
        }
      });

      if (isOpen) {
        // If already open, close it and clear text
        content.style.maxHeight = null;
        content.style.opacity = 0;
        clearTimeout(activeTimeouts[index]); // Stop typing animation
        textElement.textContent = ""; // Clear the text
        activeTimeouts[index] = null; // Reset timeout for this accordion
      } else {
        // Otherwise, open the accordion and start typing animation
        content.style.maxHeight = content.scrollHeight + "px"; // Open the accordion
        content.style.opacity = 1; // Make content visible

        // Store original text for typing animation
        const textToType =
          textElement.getAttribute("data-text") || textElement.textContent;
        textElement.setAttribute("data-text", textToType); // Save the original text
        textElement.textContent = ""; // Clear text for typing animation

        let charIndex = 0;
        const typingSpeed = 50; // Typing speed in milliseconds

        function typeText() {
          if (charIndex < textToType.length) {
            textElement.textContent += textToType.charAt(charIndex); // Append next character
            charIndex++;
            const timeout = setTimeout(typeText, typingSpeed); // Schedule next character
            activeTimeouts[index] = timeout; // Store timeout for this accordion
            content.style.maxHeight = content.scrollHeight + "px"; // Adjust height dynamically
          }
        }

        typeText(); // Start typing
      }
    });
  });
});
//typing effect
document.addEventListener("DOMContentLoaded", function () {
  var typed = new Typed(".input", {
    strings: ["Gryffindor ?", "Hufflepuff ?", "Ravenclaw ?", "Slytherin ?"],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
  });
});

//particles js
document.addEventListener("DOMContentLoaded", () => {
  particlesJS("particles-js", {
    particles: {
      number: { value: 200, density: { enable: true, value_area: 800 } },
      color: { value: "#641e1e" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#641e1e" },
        polygon: { nb_sides: 6 },
        image: { src: "img/github.svg", width: 100, height: 100 },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false, speed: 90, size_min: 0.1, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#d3a625",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 12,
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
        repulse: { distance: 200, duration: 9 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });
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
});
