// Scroll reveal effect
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(section => {
    const elementTop = section.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// Subtle heartbeat pulse effect near bottom
window.addEventListener("scroll", () => {
  const scrollPercent =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

  if (scrollPercent > 70) {
    document.body.classList.add("pulse");
  }
});