function startCounters() {
  animCount('stat1', 0, 1847, 1200, '', '');
  animCount('stat2', 0, 4, 1000, '', 'h');
  animCount('stat3', 0, 94, 1200, '', '%');
  animCount('stat4', 0, 12, 900, '', '+');
}
function animCount(id, from, to, dur, pre, suf) {
  const el = document.getElementById(id);
  if(!el) return;
  const start = performance.now();
  function step(now) {
    const t = Math.min((now-start)/dur, 1);
    const ease = 1 - Math.pow(1-t, 3);
    const val = Math.floor(from + (to-from)*ease);
    el.innerHTML = pre + val + `<span>${suf}</span>`;
    if(t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); if(e.target.querySelector('#stat1')) startCounters(); }});
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
startCounters();