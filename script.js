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

const newsletterForm = document.querySelector(".newsletter-form");
const newsletterStatus = document.getElementById("newsletter-status");

if (newsletterForm && newsletterStatus) {
  newsletterForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    newsletterStatus.className = "newsletter-status status-loading";
    newsletterStatus.textContent = "Sending...";

    try {
      const response = await fetch(newsletterForm.action, {
        method: "POST",
        body: new FormData(newsletterForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      newsletterForm.reset();
      newsletterStatus.className = "newsletter-status status-success";
      newsletterStatus.textContent = "Thank you! You are now subscribed.";
    } catch (error) {
      newsletterStatus.className = "newsletter-status status-error";
      newsletterStatus.textContent = "Sorry, something went wrong. Please try again.";
    }
  });
}
