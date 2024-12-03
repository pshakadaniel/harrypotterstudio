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
    // on: {
    //   init: function () {
    //     // Modify pagination bullets after Swiper initialization
    //     const bullets = document.querySelectorAll(".swiper-pagination-bullet");
    //     bullets.forEach((bullet, index) => {
    //       bullet.style.backgroundColor = index === 0 ? "#641e1e" : "#00001b"; // Highlight first bullet
    //       bullet.style.width = "8px"; // Adjust bullet width
    //       bullet.style.height = "8px"; // Adjust bullet height
    //     });
    //   },
    //   slideChange: function () {
    //     // Highlight active bullet on slide change
    //     const bullets = document.querySelectorAll(".swiper-pagination-bullet");
    //     bullets.forEach((bullet, index) => {
    //       bullet.style.backgroundColor =
    //         index === this.activeIndex ? "#641e1e" : "#00001b";
    //     });
    //   },
    // },
  });
});
