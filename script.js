// footer year (si existe)
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// clock pill
const clock = document.getElementById("clock");
function pad(n){ return String(n).padStart(2,"0"); }
function tick(){
  if (!clock) return;
  const d = new Date();
  clock.textContent = `ONLINE / ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
tick();
setInterval(tick, 10000);

// FX toggle
const fxBtn = document.getElementById("toggleFx");
if (fxBtn){
  fxBtn.addEventListener("click", () => {
    document.body.classList.toggle("fx-on");
    fxBtn.textContent = `FX: ${document.body.classList.contains("fx-on") ? "ON" : "OFF"}`;
  });
}

// CHAOS toggle (optional class)
const chaosBtn = document.getElementById("toggleChaos");
if (chaosBtn){
  chaosBtn.addEventListener("click", () => {
    document.body.classList.toggle("chaos-on");
    chaosBtn.textContent = `CHAOS: ${document.body.classList.contains("chaos-on") ? "ON" : "OFF"}`;
  });
}

// SPARKLES
const sparkleLayer = document.getElementById("sparkles");
let last = { x: 0, y: 0, t: 0 };

function spawnSparkle(x, y){
  if (!sparkleLayer) return;

  const s = document.createElement("div");
  s.className = "sparkle";

  const ox = (Math.random() - 0.5) * 10;
  const oy = (Math.random() - 0.5) * 10;
  const size = 7 + Math.random() * 12;

  s.style.left = `${x + ox}px`;
  s.style.top  = `${y + oy}px`;
  s.style.width = `${size}px`;
  s.style.height = `${size}px`;

  const rot = Math.floor(Math.random() * 30) - 15;
  s.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;

  sparkleLayer.appendChild(s);
  setTimeout(() => s.remove(), 650);
}

function onMove(x, y){
  const now = performance.now();
  const dx = x - last.x;
  const dy = y - last.y;
  const dist = Math.hypot(dx, dy);

  // throttle: avoid too many DOM nodes
  if (dist > 10 && (now - last.t) > 16){
    spawnSparkle(x, y);
    if (dist > 45) spawnSparkle(x, y);
    last = { x, y, t: now };
  }
}

window.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY), { passive: true });
window.addEventListener("touchmove", (e) => {
  const t = e.touches && e.touches[0];
  if (t) onMove(t.clientX, t.clientY);
}, { passive: true });
