/* ============================================
   FELIZ DÍA MAMÁ — JavaScript Premium
   ============================================ */

// ── ENVELOPE / CARTA ──────────────────────────
const overlay   = document.getElementById('envelopeOverlay');
const flap      = document.getElementById('envelopeFlap');
const mainContent = document.getElementById('mainContent');

overlay.addEventListener('click', openEnvelope);

function openEnvelope() {
  flap.classList.add('open');
  setTimeout(() => {
    overlay.classList.add('hidden');
    mainContent.classList.add('visible');
    startParticles();
    spawnPetals();
    spawnHearts();
    initReveal();
  }, 900);
}

// ── MÚSICA ────────────────────────────────────
const musicBtn  = document.getElementById('musicBtn');
const bgMusic   = document.getElementById('bgMusic');
const musicIcon = musicBtn.querySelector('.music-icon');
const musicLabel = musicBtn.querySelector('.music-label');
let   playing   = false;

// Fade in suave al reproducir
bgMusic.volume = 0;

function fadeIn(audio, duration = 2000) {
  let vol = 0;
  const step = 0.05;
  const interval = duration / (1 / step);
  const fade = setInterval(() => {
    vol = Math.min(vol + step, 0.75);
    audio.volume = vol;
    if (vol >= 0.75) clearInterval(fade);
  }, interval);
}

function fadeOut(audio, duration = 1000) {
  let vol = audio.volume;
  const step = 0.05;
  const interval = duration / (vol / step);
  const fade = setInterval(() => {
    vol = Math.max(vol - step, 0);
    audio.volume = vol;
    if (vol <= 0) { clearInterval(fade); audio.pause(); }
  }, interval);
}

musicBtn.addEventListener('click', () => {
  if (playing) {
    fadeOut(bgMusic);
    musicIcon.textContent = '🎵';
    musicLabel.textContent = 'Música';
    playing = false;
  } else {
    bgMusic.play().catch(() => {});
    fadeIn(bgMusic);
    musicIcon.textContent = '⏸️';
    musicLabel.textContent = 'Pausar';
    playing = true;
  }
});

// ── CANVAS PARTÍCULAS ─────────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');
let   particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticle() {
  return {
    x:    Math.random() * canvas.width,
    y:    Math.random() * canvas.height,
    r:    Math.random() * 2.5 + 0.5,
    dx:   (Math.random() - 0.5) * 0.3,
    dy:   (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? '#f9c6d0' : '#d4a853',
  };
}

function startParticles() {
  for (let i = 0; i < 80; i++) particles.push(createParticle());
  animateParticles();
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
}

// ── PÉTALOS ───────────────────────────────────
const petalsContainer = document.getElementById('petalsContainer');
const petalEmojis = ['🌸', '🌺', '🌷', '🌹', '✿'];

function spawnPetals() {
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      const p = document.createElement('span');
      p.className = 'petal';
      p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
      p.style.left     = Math.random() * 100 + '%';
      p.style.fontSize = (Math.random() * 14 + 12) + 'px';
      const dur = (Math.random() * 8 + 7) + 's';
      const del = (Math.random() * 10) + 's';
      p.style.animationDuration = dur;
      p.style.animationDelay    = del;
      petalsContainer.appendChild(p);
    }, i * 400);
  }
}

// ── CORAZONES FLOTANTES ───────────────────────
const heartsContainer = document.getElementById('heartsContainer');
const heartEmojis = ['💖', '💗', '💕', '💓', '🤍', '💛'];

function spawnHearts() {
  for (let i = 0; i < 14; i++) {
    setTimeout(() => {
      const h = document.createElement('span');
      h.className = 'floating-heart';
      h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      h.style.left     = Math.random() * 100 + '%';
      h.style.fontSize = (Math.random() * 12 + 10) + 'px';
      const dur = (Math.random() * 10 + 10) + 's';
      const del = (Math.random() * 8) + 's';
      h.style.animationDuration = dur;
      h.style.animationDelay    = del;
      heartsContainer.appendChild(h);
    }, i * 600);
  }
}

// ── REVEAL ON SCROLL ──────────────────────────
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-card');
  const observer  = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.classList.contains('reveal-card') ? i * 120 : 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
}

// ── BOTONES ───────────────────────────────────
const btnLove     = document.getElementById('btnLove');
const btnHug      = document.getElementById('btnHug');
const btnResponse = document.getElementById('btnResponse');
const heartBurst  = document.getElementById('heartBurst');

const loveMessages = [
  '¡Te amo con todo mi corazón, mamá! 💖',
  '¡Sos lo más hermoso de mi vida! 🌸',
  '¡Mi amor por vos no tiene límites! 💕',
  '¡Gracias por existir, mamá! 🌷',
];
const hugMessages = [
  '¡Recibiste un abrazo enorme lleno de amor! 🤗💐',
  '¡Un abrazo que dura para siempre! 🌸🤍',
  '¡El abrazo más cálido del mundo para vos! 💛🌺',
];

let loveIdx = 0, hugIdx = 0;

btnLove.addEventListener('click', (e) => {
  showResponse(loveMessages[loveIdx % loveMessages.length]);
  loveIdx++;
  burstHearts(e.clientX, e.clientY);
});

btnHug.addEventListener('click', (e) => {
  showResponse(hugMessages[hugIdx % hugMessages.length]);
  hugIdx++;
  burstHearts(e.clientX, e.clientY, '💐');
});

function showResponse(msg) {
  btnResponse.style.opacity = '0';
  setTimeout(() => {
    btnResponse.textContent = msg;
    btnResponse.style.opacity = '1';
  }, 200);
}

function burstHearts(x, y, emoji = '💖') {
  const emojis = ['💖', '💗', '💕', '💓', emoji];
  for (let i = 0; i < 12; i++) {
    const h = document.createElement('span');
    h.className = 'burst-heart';
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = (Math.PI * 2 / 12) * i;
    const dist  = 80 + Math.random() * 80;
    h.style.left = x + 'px';
    h.style.top  = y + 'px';
    h.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    h.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    heartBurst.appendChild(h);
    setTimeout(() => h.remove(), 1300);
  }
}

// ── CARRUSEL ──────────────────────────────────
const track    = document.getElementById('carouselTrack');
const slides   = track.querySelectorAll('.carousel-slide');
const dotsWrap = document.getElementById('carouselDots');
const prevBtn  = document.getElementById('prevBtn');
const nextBtn  = document.getElementById('nextBtn');
let   current  = 0;
let   autoPlay;

// Crear dots
slides.forEach((_, i) => {
  const d = document.createElement('span');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(d);
});

function goTo(idx) {
  current = (idx + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

// Touch / swipe
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend',   e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) { diff > 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
});

function startAuto() { autoPlay = setInterval(() => goTo(current + 1), 4000); }
function resetAuto()  { clearInterval(autoPlay); startAuto(); }
startAuto();

// ── TOUCH RIPPLE EN FOTOS ─────────────────────
slides.forEach(slide => {
  slide.addEventListener('click', (e) => {
    const rect = slide.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    burstHearts(e.clientX, e.clientY, '🌸');
  });
});

// ── ESCENA EMOCIONAL FINAL ──────────────────────────
const emotionalScene = document.querySelector('.emotional-scene');
const starsContainer  = document.getElementById('starsContainer');
const particlesContainer = document.getElementById('particlesContainer');

function createStars() {
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 4 + 's';
    starsContainer.appendChild(star);
  }
}

function createParticles() {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particlesContainer.appendChild(particle);
  }
}

function initEmotionalScene() {
  createStars();
  createParticles();
}

// Observer para la escena emocional
const emotionalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initEmotionalScene();
      emotionalObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (emotionalScene) {
  emotionalObserver.observe(emotionalScene);
}


