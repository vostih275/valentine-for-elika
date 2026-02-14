// ===== GET ELEMENTS =====
const messageEl = document.getElementById("message");
const photoEl = document.getElementById("photo");
const videoEl = document.getElementById("video");
const secretEl = document.getElementById("secret");
const heartsContainer = document.getElementById("hearts-container");
const clickableHeart = document.getElementById("clickable-heart");

let valentineData;

// ===== LOAD DATA & INIT =====
async function loadValentine() {
  const res = await fetch("data.json"); // or your backend endpoint
  valentineData = await res.json();

  // Combine all Valentine messages into one with paragraphs
  const combinedMessage = valentineData.valentineMessages.join('\n\n');

  displayMessage(combinedMessage);
  createHearts(30);

  clickableHeart.addEventListener("click", revealSurprise);
}

// ===== DISPLAY MESSAGE =====
function displayMessage(message) {
  messageEl.innerHTML = "";
  const paragraphs = message.split('\n\n');
  paragraphs.forEach(para => {
    const p = document.createElement("p");
    p.textContent = para;
    messageEl.appendChild(p);
  });

  // No loop, since it's one combined message
}

// ===== FLOATING HEARTS =====
function createHearts(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = Math.random() > 0.5 ? "❤️" : "💖";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = (Math.random() * 2 + 1) + "em";
      heart.style.animationDuration = (Math.random() * 4 + 4) + "s";
      heart.style.animationDelay = Math.random() * 2 + "s";
      heartsContainer.appendChild(heart);

      setTimeout(() => {
        if (heartsContainer.contains(heart)) heartsContainer.removeChild(heart);
      }, 8000);
    }, Math.random() * 5000);
  }
}

// ===== SECRET PAGE =====
function revealSurprise() {
  secretEl.innerHTML = "";

  // Intro
  valentineData.classified.intro.forEach(text => {
    const p = document.createElement("p");
    p.textContent = text;
    secretEl.appendChild(p);
  });

  // Sections
  valentineData.classified.sections.forEach(section => {
    const h3 = document.createElement("h3");
    h3.textContent = section.title;
    secretEl.appendChild(h3);

    section.paragraphs.forEach(text => {
      const p = document.createElement("p");
      p.textContent = text;
      secretEl.appendChild(p);
    });
  });

  // Final paragraphs
  valentineData.classified.final.forEach(text => {
    const p = document.createElement("p");
    p.textContent = text;
    secretEl.appendChild(p);
  });

  secretEl.hidden = false;
  secretEl.classList.add("show");

  // Play video if exists
  if (valentineData.videos && valentineData.videos.length > 0) {
    videoEl.src = valentineData.videos[0];
    videoEl.hidden = false;
    videoEl.classList.add("show");
    videoEl.play();
  }

  clickableHeart.style.display = "none";
  createConfetti();
}

// ===== SIMPLE CONFETTI =====
function createConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.textContent = "✨";
    confetti.style.position = "absolute";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "50vh";
    confetti.style.fontSize = "1.5em";
    confetti.style.color = ["#ff1744", "#ff9800", "#e91e63", "#9c27b0"][Math.floor(Math.random() * 4)];
    confetti.style.animation = `confetti-fall ${Math.random() * 2 + 1}s linear`;
    document.body.appendChild(confetti);

    setTimeout(() => {
      if (document.body.contains(confetti)) document.body.removeChild(confetti);
    }, 3000);
  }
}

// ===== CONFETTI KEYFRAMES =====
const style = document.createElement("style");
style.textContent = `
@keyframes confetti-fall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
`;
document.head.appendChild(style);

// ===== INIT =====
window.onload = loadValentine;