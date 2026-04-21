const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
  });
}

const navLinks = document.querySelectorAll(".main-nav a, .mobile-nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileNav) {
      mobileNav.classList.remove("show");
    }
  });
});
