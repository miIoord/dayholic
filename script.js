
// ====== BAGIAN YANG BOLEH KAMU GANTI ======
const namaPacar = "Bibub :3";
const namaKamu = "Drew";

const kataKetik = [
  "aku cuma mau bilang: kamu itu spesial.",
  "semoga kamu senyum waktu buka ini.",
  "jangan lupa, aku bakal selalu sayang kamu.",
  "web kecil ini khusus buat kamu."
];
// ==========================================

document.querySelectorAll(".nama-pacar").forEach((el) => {
  el.textContent = namaPacar;
});

document.getElementById("namaKamuFooter").textContent = namaKamu;

const opening = document.getElementById("opening");
const content = document.getElementById("content");
const openBtn = document.getElementById("openBtn");

openBtn.addEventListener("click", () => {
  opening.classList.add("hide");
  content.classList.remove("hidden");

  setTimeout(() => {
    opening.style.display = "none";
  }, 760);

  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 18);
});

const typingText = document.getElementById("typingText");
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect() {
  const word = kataKetik[wordIndex];

  if (deleting) {
    typingText.textContent = word.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = word.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = deleting ? 38 : 68;

  if (!deleting && charIndex === word.length) {
    speed = 1300;
    deleting = true;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % kataKetik.length;
    speed = 420;
  }

  setTimeout(typingEffect, speed);
}

typingEffect();

const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.16 });

revealEls.forEach((el) => observer.observe(el));

const toast = document.getElementById("toast");
const kangenBtn = document.getElementById("kangenBtn");

kangenBtn.addEventListener("click", (event) => {
  toast.classList.add("show");
  burstHearts(event.clientX, event.clientY, 12);

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
});

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseText = document.getElementById("surpriseText");

surpriseBtn.addEventListener("click", (event) => {
  surpriseText.classList.toggle("show");
  burstHearts(event.clientX, event.clientY, 16);
});

function burstHearts(x, y, total) {
  const hearts = ["💗", "💖", "💕", "🌷", "✨"];

  for (let i = 0; i < total; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = `${x + (Math.random() * 120 - 60)}px`;
    heart.style.top = `${y + (Math.random() * 50 - 25)}px`;
    heart.style.animationDelay = `${Math.random() * 0.25}s`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1400);
  }
}

// ====== PARTICLE BACKGROUND LOVE ======
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
let mouse = { x: null, y: null };

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  makeParticles();
}

function makeParticles() {
  particles = [];
  const amount = Math.min(95, Math.floor((window.innerWidth * window.innerHeight) / 13000));

  for (let i = 0; i < amount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1.5,
      speedX: (Math.random() - 0.5) * 0.55,
      speedY: (Math.random() - 0.5) * 0.55,
      alpha: Math.random() * 0.5 + 0.25
    });
  }
}

function drawHeart(x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 18, size / 18);
  ctx.beginPath();
  ctx.moveTo(0, 6);
  ctx.bezierCurveTo(-14, -6, -8, -18, 0, -10);
  ctx.bezierCurveTo(8, -18, 14, -6, 0, 6);
  ctx.fillStyle = `rgba(255, 79, 143, ${alpha})`;
  ctx.fill();
  ctx.restore();
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < -20 || p.x > canvas.width + 20) p.speedX *= -1;
    if (p.y < -20 || p.y > canvas.height + 20) p.speedY *= -1;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        p.x -= dx / 80;
        p.y -= dy / 80;
      }
    }

    drawHeart(p.x, p.y, p.size * 4, p.alpha);
  });

  connectParticles();
  requestAnimationFrame(animateParticles);
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 105) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255, 111, 174, ${0.18 * (1 - distance / 105)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

window.addEventListener("resize", resize);

resize();
animateParticles();
