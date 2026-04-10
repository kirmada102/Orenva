const pageName = document.body.dataset.page || "";
const navLinks = document.querySelectorAll("[data-nav-link]");
const siteHeader = document.querySelector(".site-header");
const connectForm = document.getElementById("connectForm");
const formStatus = document.getElementById("formStatus");

function buildUtilityRibbon() {
  return `
    <section class="utility-ribbon" data-utility-ribbon aria-label="App downloads and social media">
      <div class="utility-group">
        <span class="utility-label">Download orenva</span>
        <div class="utility-actions">
          <a
            class="store-badge"
            href="#"
            data-placeholder-link
            aria-label="Download orenva on the App Store"
          >
            <span class="store-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M8 5.5L15.8 18.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M12.1 5.5L4.6 18.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M4.5 14.5H19.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            <span class="store-copy">
              <small>Download on the</small>
              <strong>App Store</strong>
            </span>
          </a>

          <a
            class="store-badge"
            href="#"
            data-placeholder-link
            aria-label="Get orenva on Google Play"
          >
            <span class="store-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 4.5L18.8 12L5 19.5V4.5Z" />
              </svg>
            </span>
            <span class="store-copy">
              <small>Get it on</small>
              <strong>Google Play</strong>
            </span>
          </a>
        </div>
      </div>

      <div class="utility-group utility-group--social">
        <span class="utility-label">Connect with orenva</span>
        <div class="social-links">
          <a
            class="social-link"
            href="#"
            data-placeholder-link
            aria-label="orenva on LinkedIn"
          >
            <span class="social-icon social-icon--linkedin" aria-hidden="true">in</span>
            <span>LinkedIn</span>
          </a>

          <a
            class="social-link"
            href="#"
            data-placeholder-link
            aria-label="orenva on Instagram"
          >
            <span class="social-icon social-icon--instagram" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="4.5" y="4.5" width="15" height="15" rx="4.5" stroke="currentColor" stroke-width="1.9" />
                <circle cx="12" cy="12" r="3.6" stroke="currentColor" stroke-width="1.9" />
                <circle cx="17.1" cy="7.1" r="1.1" fill="currentColor" />
              </svg>
            </span>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </section>
  `;
}

if (siteHeader && !document.querySelector("[data-utility-ribbon]")) {
  siteHeader.insertAdjacentHTML("afterend", buildUtilityRibbon());
}

navLinks.forEach((link) => {
  if (link.dataset.navLink === pageName) {
    link.classList.add("is-active");
  }
});

document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

const revealNodes = document.querySelectorAll("[data-reveal]");

if (revealNodes.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    },
  );

  revealNodes.forEach((node) => observer.observe(node));
}

if (connectForm && formStatus) {
  connectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameField = connectForm.elements.namedItem("name");
    const focusField = connectForm.elements.namedItem("focus");
    const name =
      nameField instanceof HTMLInputElement && nameField.value.trim()
        ? nameField.value.trim()
        : "friend";
    const focus =
      focusField instanceof HTMLSelectElement && focusField.value
        ? focusField.value
        : "wellness support";

    formStatus.hidden = false;
    formStatus.textContent = `Thanks ${name}. Your note about ${focus.toLowerCase()} is ready for the orenva team, and this static demo now shows the page flow you can later connect to email, Forms, or a backend.`;
    connectForm.reset();
  });
}
