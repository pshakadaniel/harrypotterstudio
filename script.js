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
  // Select all accordion buttons
  const accordionButtons = document.querySelectorAll(".accordion-btn");
  let activeTimeouts = {}; // Object to store timeouts for each accordion

  accordionButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // Get the associated accordion content
      const content = btn.nextElementSibling;
      const textElement = content.querySelector("p");

      // Check if the current accordion is open
      const isOpen = content.style.maxHeight;

      // Close all other accordions
      document.querySelectorAll(".accordion-content").forEach((item, i) => {
        if (i !== index) {
          item.style.maxHeight = null; // Close the accordion
          item.style.opacity = 0; // Hide the content
          const resetTextElement = item.querySelector("p");
          if (resetTextElement) {
            resetTextElement.textContent = ""; // Clear text for closed accordions
          }
          clearTimeout(activeTimeouts[i]); // Clear active typing timeout for other accordions
          activeTimeouts[i] = null; // Reset timeout
        }
      });

      if (isOpen) {
        // If already open, close it
        content.style.maxHeight = null;
        content.style.opacity = 0;
        clearTimeout(activeTimeouts[index]); // Stop typing animation
        textElement.textContent = ""; // Clear the text
        activeTimeouts[index] = null; // Reset timeout for this accordion
      } else {
        // Otherwise, open the accordion and start typing animation
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = 1;

        const textToType =
          textElement.getAttribute("data-text") || textElement.textContent;
        textElement.setAttribute("data-text", textToType); // Save the original text
        textElement.textContent = ""; // Clear text for typing animation

        let charIndex = 0;
        const typingSpeed = 50;

        function typeText() {
          if (charIndex < textToType.length) {
            textElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            const timeout = setTimeout(typeText, typingSpeed);
            activeTimeouts[index] = timeout; // Store timeout for this accordion
            content.style.maxHeight = content.scrollHeight + "px"; // Dynamically adjust height
          }
        }

        typeText(); // Start typing
      }
    });
  });
});
