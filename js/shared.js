const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
const particles = [];
for(let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.1
  });
}
function animBg() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if(p.x < 0) p.x = canvas.width;
    if(p.x > canvas.width) p.x = 0;
    if(p.y < 0) p.y = canvas.height;
    if(p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(108,99,255,${p.alpha})`;
    ctx.fill();
  });
  for(let i = 0; i < particles.length; i++) {
    for(let j = i+1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(108,99,255,${0.08*(1-dist/120)})`;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animBg);
}
animBg();

function goTo(page) {
  window.location.href = page + '.html';
}

function showToast(msg, type='success') {
  const t = document.getElementById('toast');
  const m = document.getElementById('toast-msg');
  const ic = document.getElementById('toast-icon');
  m.textContent = msg;
  ic.textContent = type === 'error' ? '❌' : '✅';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}