/* ============================================================
   script.js — Website Ucapan Spesial untuk Nona
   Berisi:
     1. Generate bunga matahari & tulip SVG di latar belakang
     2. Konfeti emoji otomatis
     3. Kontrol musik
     4. Tombol pelukan hangat
     5. Scroll fade-in
   ============================================================ */

/* ====================================================
   1. LATAR BELAKANG BUNGA — generate banyak bunga kecil
      yang disebar secara acak di seluruh halaman
   ==================================================== */
(function generateBgFlowers() {
  const container = document.getElementById('bgFlowers');
  if (!container) return;

  /* Template SVG bunga matahari kecil */
  function sunflowerSVG(size, seed) {
    const r = seed % 3 === 0 ? 0.9 : 1;
    return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(50,50)">
        <ellipse rx="7" ry="20" fill="#FFD600" transform="rotate(0) translate(0,-28)"/>
        <ellipse rx="7" ry="20" fill="#FFB800" transform="rotate(40) translate(0,-28)"/>
        <ellipse rx="7" ry="20" fill="#FFD600" transform="rotate(80) translate(0,-28)"/>
        <ellipse rx="7" ry="20" fill="#FFB800" transform="rotate(120) translate(0,-28)"/>
        <ellipse rx="7" ry="20" fill="#FFD600" transform="rotate(160) translate(0,-28)"/>
        <ellipse rx="7" ry="20" fill="#FFB800" transform="rotate(200) translate(0,-28)"/>
        <ellipse rx="7" ry="20" fill="#FFD600" transform="rotate(240) translate(0,-28)"/>
        <ellipse rx="7" ry="20" fill="#FFB800" transform="rotate(280) translate(0,-28)"/>
        <ellipse rx="7" ry="20" fill="#FFD600" transform="rotate(320) translate(0,-28)"/>
        <circle r="18" fill="#5C3317"/>
        <circle r="13" fill="#3d1f0a"/>
        <circle r="2" fill="#7a4520" cx="-5" cy="-5"/>
        <circle r="2" fill="#7a4520" cx="5" cy="-5"/>
        <circle r="2" fill="#7a4520" cx="0" cy="3"/>
        <circle r="2" fill="#7a4520" cx="-5" cy="5"/>
        <circle r="2" fill="#7a4520" cx="5" cy="5"/>
      </g>
    </svg>`;
  }

  /* Template SVG tulip kecil */
  function tulipSVG(size, seed) {
    const petal = seed % 2 === 0 ? '#F4A7C3' : '#e8749a';
    const inner = seed % 2 === 0 ? '#d4537e' : '#f4c0d1';
    return `<svg width="${size}" height="${size * 1.4}" viewBox="0 0 60 84" xmlns="http://www.w3.org/2000/svg">
      <rect x="27" y="56" width="6" height="28" rx="3" fill="#6aaa2a"/>
      <ellipse cx="30" cy="30" rx="12" ry="28" fill="${petal}"/>
      <ellipse cx="19" cy="42" rx="9" ry="22" fill="${inner}" transform="rotate(-18 19 42)"/>
      <ellipse cx="41" cy="42" rx="9" ry="22" fill="${inner}" transform="rotate(18 41 42)"/>
      <ellipse cx="30" cy="30" rx="10" ry="24" fill="${petal}" opacity="0.55"/>
    </svg>`;
  }

  /* Template bunga kecil sederhana (daisy) */
  function daisySVG(size, seed) {
    const col = seed % 3 === 0 ? '#FFD600' : seed % 3 === 1 ? '#F4A7C3' : '#FFB800';
    return `<svg width="${size}" height="${size}" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(30,30)">
        <ellipse rx="5" ry="14" fill="${col}" transform="rotate(0) translate(0,-18)"/>
        <ellipse rx="5" ry="14" fill="${col}" transform="rotate(60) translate(0,-18)"/>
        <ellipse rx="5" ry="14" fill="${col}" transform="rotate(120) translate(0,-18)"/>
        <ellipse rx="5" ry="14" fill="${col}" transform="rotate(180) translate(0,-18)"/>
        <ellipse rx="5" ry="14" fill="${col}" transform="rotate(240) translate(0,-18)"/>
        <ellipse rx="5" ry="14" fill="${col}" transform="rotate(300) translate(0,-18)"/>
        <circle r="10" fill="#fff8dc"/>
        <circle r="6" fill="#FFD600" opacity="0.7"/>
      </g>
    </svg>`;
  }

  /* Tempatkan bunga-bunga di seluruh latar secara acak */
  const pageH = Math.max(document.body.scrollHeight, 2000);
  const configs = [
    // Format: [type, count, sizeMin, sizeMax, opacityMin, opacityMax]
    ['sunflower', 18, 60, 140, 0.07, 0.18],
    ['tulip',     20, 45, 110, 0.08, 0.17],
    ['daisy',     22, 35, 80,  0.09, 0.20],
  ];

  let seed = 0;
  configs.forEach(([type, count, sMin, sMax, oMin, oMax]) => {
    for (let i = 0; i < count; i++) {
      seed++;
      const size = Math.round(sMin + Math.random() * (sMax - sMin));
      const x    = Math.random() * 100;   /* % dari lebar */
      const y    = Math.random() * 100;   /* % dari tinggi */
      const rot  = Math.random() * 360;
      const op   = (oMin + Math.random() * (oMax - oMin)).toFixed(3);
      const dur  = (8 + Math.random() * 10).toFixed(1);
      const del  = (Math.random() * 6).toFixed(1);

      const wrap = document.createElement('div');
      wrap.style.cssText = `
        position:absolute;
        left:${x}%;
        top:${(y / 100 * pageH)}px;
        transform:rotate(${rot}deg);
        opacity:${op};
        animation:sway ${dur}s ease-in-out ${del}s infinite alternate;
        transform-origin:center bottom;
        pointer-events:none;
      `;

      if (type === 'sunflower') wrap.innerHTML = sunflowerSVG(size, seed);
      else if (type === 'tulip') wrap.innerHTML = tulipSVG(size, seed);
      else wrap.innerHTML = daisySVG(size, seed);

      container.appendChild(wrap);
    }
  });

  /* Animasi goyang untuk semua bunga latar */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes sway {
      from { transform: rotate(calc(var(--rot, 0deg) - 8deg)) translateY(0); }
      to   { transform: rotate(calc(var(--rot, 0deg) + 8deg)) translateY(-6px); }
    }
  `;
  document.head.appendChild(style);
})();


/* ====================================================
   2. KONFETI BUNGA & HATI — otomatis saat halaman dibuka
   ==================================================== */
(function initConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const SHAPES = ['🌻','🌷','🌸','💛','🩷','🌼','💗','⭐','🌺','💕'];
  const COUNT  = 60;
  const parts  = Array.from({ length: COUNT }, () => mkPart(true));

  function mkPart(randY = false) {
    return {
      x    : Math.random() * canvas.width,
      y    : randY ? Math.random() * canvas.height * -2 : -40,
      size : Math.random() * 18 + 12,
      spd  : Math.random() * 1.8 + 0.5,
      drift: (Math.random() - 0.5) * 1.4,
      spin : (Math.random() - 0.5) * 0.05,
      angle: Math.random() * Math.PI * 2,
      emoji: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      alpha: Math.random() * 0.5 + 0.5,
    };
  }

  let frame = 0, running = true;

  function draw(p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.font = `${p.size}px serif`;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.fillText(p.emoji, -p.size/2, p.size/2);
    ctx.restore();
  }

  function tick() {
    if (!running) return;
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach(p => {
      draw(p);
      p.y += p.spd; p.x += p.drift; p.angle += p.spin;
      if (p.y > canvas.height + 30) Object.assign(p, mkPart(false));
    });
    if (frame < 320) {
      requestAnimationFrame(tick);
    } else {
      let op = 1;
      const fade = setInterval(() => {
        op -= 0.04;
        canvas.style.opacity = Math.max(0, op);
        if (op <= 0) { clearInterval(fade); ctx.clearRect(0,0,canvas.width,canvas.height); running = false; }
      }, 40);
    }
  }
  tick();

  /* Bisa dipanggil lagi dari luar */
  window.burstConfetti = function() {
    frame = 0; running = true;
    canvas.style.opacity = 1;
    parts.forEach(p => { Object.assign(p, mkPart(false)); p.y = -Math.random()*200; });
    tick();
  };
})();


/* ====================================================
   3. KONTROL MUSIK
   ==================================================== */
(function initMusic() {
  const audio = document.getElementById('bgMusic');
  const btn   = document.getElementById('btnMusic');
  const icon  = document.getElementById('musicIcon');
  const bar   = document.getElementById('musicBar');

  const play = audio.play();
  if (play !== undefined) {
    play.catch(() => { icon.className = 'fa-solid fa-play'; bar.classList.add('paused'); });
  }

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      icon.className = 'fa-solid fa-pause';
      bar.classList.remove('paused');
    } else {
      audio.pause();
      icon.className = 'fa-solid fa-play';
      bar.classList.add('paused');
    }
  });
})();


/* ====================================================
   4. TOMBOL PELUKAN HANGAT
   ==================================================== */
(function initHugBtn() {
  document.getElementById('btnHug').addEventListener('click', () => {
    if (typeof window.burstConfetti === 'function') window.burstConfetti();
    setTimeout(() => {
      alert('🤗 Untuk nona tersayang, kamu hebat! Aku di sini selalu. 🌻');
    }, 220);
  });
})();


/* ====================================================
   5. SCROLL FADE-IN
   ==================================================== */
(function initScrollFade() {
  const els = document.querySelectorAll('.fade-in');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => {
    el.style.animationPlayState = 'paused';
    obs.observe(el);
  });
})();\