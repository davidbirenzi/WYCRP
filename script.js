const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
const topHeader = document.getElementById("topHeader");
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

function setMobileNavOpen(isOpen) {
  if (!menuBtn || !mobileNav) {
    return;
  }

  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  mobileNav.hidden = !isOpen;
  mobileNav.classList.toggle("show", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
}

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    setMobileNavOpen(!isOpen);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
      setMobileNavOpen(false);
      menuBtn.focus();
    }
  });
}

const navLinks = document.querySelectorAll(".main-nav a, .mobile-nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMobileNavOpen(false);
  });
});

const sections = document.querySelectorAll("main section[id], .donate-section[id]");
const sectionNavLinks = document.querySelectorAll('.main-nav a[href^="#"], .mobile-nav a[href^="#"]');

function updateActiveNav() {
  const scrollPosition = window.scrollY + 120;
  let currentSectionId = "landing";

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      currentSectionId = section.id;
    }
  });

  sectionNavLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const isActive = href === `#${currentSectionId}`;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateHeaderState() {
  if (!topHeader) {
    return;
  }

  topHeader.classList.toggle("is-scrolled", window.scrollY > 8);
}

window.addEventListener("scroll", () => {
  updateActiveNav();
  updateHeaderState();
}, { passive: true });

updateActiveNav();
updateHeaderState();

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
