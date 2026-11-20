// Personalised for Iyawo Mi — Olufemi (David's ife).
const modal = document.getElementById("surpriseModal");
document.getElementById("surpriseBtn").addEventListener("click", () => modal.classList.add("show"));
document.getElementById("closeModal").addEventListener("click", () => modal.classList.remove("show"));
document.getElementById("celebrateBtn").addEventListener("click", () => {
  modal.classList.remove("show");
  makeHearts(28);
  document.getElementById("letter").scrollIntoView({behavior:"smooth"});
});
modal.addEventListener("click", event => { if (event.target === modal) modal.classList.remove("show"); });
document.addEventListener("keydown", event => { if (event.key === "Escape") modal.classList.remove("show"); });

document.getElementById("wishBtn").addEventListener("click", () => {
  document.getElementById("wishResult").textContent = "Amen to every beautiful thing coming your way, Olufemi. 🤍";
  makeHearts(20);
});

function makeHearts(count=1) {
  const symbols = ["♡", "✧", "🤍", "♥"];
  for (let i=0; i<count; i++) {
    const item = document.createElement("span");
    item.className = "heart-float";
    item.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    item.style.left = Math.random()*100 + "vw";
    item.style.color = ["#b18a4b", "#d1b77f", "#a58b62"][Math.floor(Math.random()*3)];
    item.style.fontSize = (16 + Math.random()*22) + "px";
    item.style.animationDuration = (3 + Math.random()*3) + "s";
    document.body.appendChild(item);
    setTimeout(() => item.remove(), 6500);
  }
}
setInterval(() => { if (Math.random() > .55) makeHearts(1); }, 1900);

// Full-screen universe opening: animated stars and shooting stars.
const intro = document.getElementById("universeIntro");
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [], shootingStars = [], starAnimation;
function resizeStarfield() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * ratio); canvas.height = Math.floor(window.innerHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  stars = Array.from({length: Math.min(260, Math.floor(window.innerWidth * 0.28))}, () => ({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,radius:Math.random()*1.7+.25,alpha:Math.random()*.75+.2,twinkle:Math.random()*.025+.004,phase:Math.random()*Math.PI*2}));
}
function drawStarfield(time=0) {
  const w=window.innerWidth,h=window.innerHeight; ctx.clearRect(0,0,w,h);
  for(const star of stars){const glow=star.alpha+Math.sin(time*star.twinkle+star.phase)*.22;ctx.beginPath();ctx.arc(star.x,star.y,star.radius,0,Math.PI*2);ctx.fillStyle=`rgba(255,239,205,${Math.max(.08,glow)})`;ctx.shadowBlur=star.radius>1.3?10:3;ctx.shadowColor="#f4d99e";ctx.fill();}
  ctx.shadowBlur=0;
  if(Math.random()<.035) shootingStars.push({x:Math.random()*w*.8,y:Math.random()*h*.55,vx:7+Math.random()*5,vy:3+Math.random()*3,life:0});
  shootingStars=shootingStars.filter(s=>s.life<22);
  for(const s of shootingStars){s.x+=s.vx;s.y+=s.vy;s.life++;ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-s.vx*5,s.y-s.vy*5);ctx.strokeStyle=`rgba(255,231,180,${1-s.life/22})`;ctx.lineWidth=1.5;ctx.shadowBlur=12;ctx.shadowColor="#f6d99b";ctx.stroke();}
  ctx.shadowBlur=0;starAnimation=requestAnimationFrame(drawStarfield);
}
resizeStarfield();drawStarfield();window.addEventListener("resize",resizeStarfield);
document.getElementById("enterUniverse").addEventListener("click",()=>{intro.classList.add("leaving");cancelAnimationFrame(starAnimation);setTimeout(()=>intro.remove(),1300);makeHearts(35);});
