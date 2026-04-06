const pageName = document.body.dataset.page || "";
const navLinks = document.querySelectorAll("[data-nav-link]");
const orbNodes = document.querySelectorAll("[data-orb]");
const revealNodes = document.querySelectorAll("[data-reveal]");
const connectForm = document.getElementById("connectForm");
const formStatus = document.getElementById("formStatus");

navLinks.forEach((link) => {
  if (link.dataset.navLink === pageName) {
    link.classList.add("is-active");
  }
});

const orbTones = ["white", "purple"];
let orbToneIndex = 0;

function applyOrbTone() {
  const tone = orbTones[orbToneIndex];
  orbNodes.forEach((node) => {
    node.dataset.tone = tone;
  });
}

applyOrbTone();
window.setInterval(() => {
  orbToneIndex = (orbToneIndex + 1) % orbTones.length;
  applyOrbTone();
}, 1000);

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
    formStatus.textContent = `Thanks ${name}. Your note about ${focus.toLowerCase()} is ready for the ZYNTHER team, and this static demo now shows the page flow you can later connect to email, Forms, or a backend.`;
    connectForm.reset();
  });
}
