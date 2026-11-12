/* script.js */
/* Rohit's personal signal lab — dependency-free, accessible interactions. */
'use strict';
document.documentElement.classList.add('js');

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOut = x => 1 - Math.pow(1 - x, 3);
const sigmoid = x => 1 / (1 + Math.exp(-clamp(x, -20, 20)));

// Header, scroll meter, menu and anchored navigation.
const header = $('#header');
const progress = $('#scrollProgress');
let scrollQueued = false;
function updateScroll() {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  progress.style.transform = `scaleX(${clamp(scrollY / maxScroll, 0, 1)})`;
  header.classList.toggle('is-scrolled', scrollY > 20);
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) { requestAnimationFrame(updateScroll); scrollQueued = true; }
}, { passive: true });
updateScroll();
$('#year').textContent = new Date().getFullYear();

const menuToggle = $('#menuToggle');
const mobileNav = $('#mobileNav');
function closeMenu() {
  menuToggle.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
  mobileNav.classList.remove('is-open');
  mobileNav.inert = true;
  document.body.classList.remove('menu-open');
}
menuToggle.addEventListener('click', () => {
  const open = !mobileNav.classList.contains('is-open');
  if (!open) return closeMenu();
  mobileNav.inert = false;
  mobileNav.classList.add('is-open');
  menuToggle.classList.add('is-open');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Close menu');
  document.body.classList.add('menu-open');
});
$$('#mobileNav a, .logo, .nav a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (innerWidth > 760) closeMenu(); }, { passive: true });

// Motion is only triggered when content enters view. The page remains readable without JS.
const revealItems = $$('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add('in-view');
    revealObserver.unobserve(entry.target);
  }
}, { rootMargin: '0px 0px -40px 0px', threshold: 0.04 });
revealItems.forEach((el, i) => {
  if (reducedMotion.matches) el.classList.add('in-view');
  else { el.style.transitionDelay = `${Math.min(120, (i % 4) * 35)}ms`; revealObserver.observe(el); }
});

// Simple cycle that explains the three overlapping parts of Rohit's work.
const cycling = ['MACHINE LEARNING', 'QUANT FINANCE', 'DATA SCIENCE', 'PRODUCT ENGINEERING'];
let cycleIndex = 0;
let cycleTimer;
function startCycling() {
  if (cycleTimer || reducedMotion.matches) return;
  cycleTimer = setInterval(() => {
    if (document.hidden) return;
    cycleIndex = (cycleIndex + 1) % cycling.length;
    const text = $('#cycleText');
    text.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-5px)' }], { duration: 170, fill: 'forwards' }).finished.then(() => {
      text.textContent = cycling[cycleIndex];
      $('#cycleCounter').textContent = `${String(cycleIndex + 1).padStart(2, '0')} / 04`;
      text.animate([{ opacity: 0, transform: 'translateY(7px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 270, fill: 'forwards' });
    }).catch(() => {});
  }, 3200);
}
startCycling();
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches && cycleTimer) { clearInterval(cycleTimer); cycleTimer = undefined; }
  else startCycling();
});

// Gentle magnetic interactions, only for people using a pointer with hover.
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  $$('.magnetic').forEach(el => {
    el.addEventListener('pointermove', e => {
      if (reducedMotion.matches) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) * .10;
      const dy = (e.clientY - r.top - r.height / 2) * .12;
      el.style.translate = `${dx}px ${dy}px`;
    });
    el.addEventListener('pointerleave', () => { el.style.translate = '0 0'; });
  });
}

// Portrait image is optional: the designed placeholder stays visible until an image loads.
$$('#portrait, .about-photo, .actual-screen').forEach(img => {
  const show = () => { if (img.naturalWidth > 2) img.classList.add('loaded'); };
  if (img.complete) show();
  img.addEventListener('load', show);
  img.addEventListener('error', () => img.classList.remove('loaded'));
});

// Project filters and expandable work archive.
const filterButtons = $$('.filter');
const projects = $$('[data-category]', $('#projectCollection'));
filterButtons.forEach(btn => btn.addEventListener('click', () => {
  const selected = btn.dataset.filter;
  filterButtons.forEach(b => {
    const active = b === btn;
    b.classList.toggle('is-selected', active);
    b.setAttribute('aria-pressed', String(active));
  });
  projects.forEach(project => {
    const visible = selected === 'all' || project.dataset.category === selected;
    if (!visible && project.tagName === 'DETAILS') project.open = false;
    project.hidden = !visible;
  });
}));
// Don't allow multiple archive entries to crowd small screens.
$$('.archive-item').forEach(item => item.addEventListener('toggle', () => {
  if (!item.open) return;
  $$('.archive-item').forEach(other => { if (other !== item) other.open = false; });
}));

// Watch a section rather than running all canvases off-screen.
function observeActive(element, callback) {
  const observer = new IntersectionObserver(entries => callback(entries[0].isIntersecting), { rootMargin: '150px 0px 150px 0px' });
  observer.observe(element);
  return observer;
}
function initCanvas(canvas) {
  const ctx = canvas.getContext('2d', { alpha: true });
  let size = { w: 1, h: 1 };
  const resize = () => {
    const box = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    size = { w: Math.max(1, box.width), h: Math.max(1, box.height) };
    canvas.width = Math.round(size.w * dpr);
    canvas.height = Math.round(size.h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    requestAnimationFrame(() => canvas.dispatchEvent(new Event('canvasresized')));
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  return { ctx, size: () => size };
}
function grid(ctx, w, h, color = 'rgba(62,110,70,.13)', dx = 39, dy = 35) {
  dx = Math.max(8, Math.abs(dx)); dy = Math.max(8, Math.abs(dy));
  ctx.save();ctx.strokeStyle = color;ctx.lineWidth = 1;ctx.beginPath();
  for (let x = 0; x <= w; x += dx) { ctx.moveTo(Math.round(x) + .5, 0); ctx.lineTo(Math.round(x) + .5, h); }
  for (let y = 0; y <= h; y += dy) { ctx.moveTo(0, Math.round(y) + .5); ctx.lineTo(w, Math.round(y) + .5); }
  ctx.stroke();ctx.restore();
}
function line(ctx, pts, color, width = 2, dash = []) {
  if (pts.length < 2) return;
  ctx.save();ctx.strokeStyle = color;ctx.lineWidth = width;ctx.lineCap = 'round';ctx.lineJoin = 'round';ctx.setLineDash(dash);
  ctx.beginPath();pts.forEach(([x,y],i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));ctx.stroke();ctx.restore();
}
function pseudorand(seed) { let s = seed >>> 0; return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return (s >>> 0) / 4294967296; }; }

// HERO / THREE EXPRESSIONS OF A SINGLE INTEREST.
const heroCanvas = $('#heroCanvas');
const hero = initCanvas(heroCanvas);
heroCanvas.addEventListener('canvasresized', () => renderHero());
let heroMode = 'market', heroVisible = true, heroT = 0, heroHover = null;
const heroModes = {
  market: { label: 'SYNTHETIC TIME SERIES', status: 'Exploring market behavior' },
  ml: { label: 'NEURAL NETWORK / TOY MODEL', status: 'Visualizing connected neurons' },
  data: { label: 'CLUSTERED DATA / TOY SAMPLE', status: 'Finding patterns in data' }
};
$$('.signal-option').forEach(btn => btn.addEventListener('click', () => {
  heroMode = btn.dataset.signal;
  $$('.signal-option').forEach(option => { const active = option === btn; option.classList.toggle('is-active', active); option.setAttribute('aria-pressed', String(active)); });
  $('#signalAxis').textContent = heroModes[heroMode].label;
  $('#signalStatus').textContent = heroModes[heroMode].status;
  heroT = 0;
  renderHero();
}));
heroCanvas.addEventListener('pointermove', e => { const r = heroCanvas.getBoundingClientRect(); heroHover = { x: e.clientX - r.left, y: e.clientY - r.top }; });
heroCanvas.addEventListener('pointerleave', () => { heroHover = null; });
observeActive(heroCanvas, visible => { heroVisible = visible; if (visible) renderHero(); });
const heroNoise = Array.from({length: 170}, (_, i) => { const r = pseudorand(i * 37 + 521); return (r() - .5) * .21; });
function heroMarket(ctx, w, h, t) {
  const left = 17, right = w - 16, top = 50, bottom = h - 29;
  const coords = Array.from({length: 170}, (_, i) => {
    const u = i / 169;
    const v = .54 + .12*Math.sin(u*11.7+t*.27) + .08*Math.sin(u*27+t*.45) - u*.23 + heroNoise[i]*.6;
    return [lerp(left,right,u),lerp(top,bottom,v)];
  });
  const visible = Math.max(2, Math.round(clamp(t/1.8, 0, 1)*169));
  const pts = coords.slice(0, visible);
  ctx.save();ctx.beginPath();ctx.moveTo(pts[0][0],bottom);pts.forEach(([x,y])=>ctx.lineTo(x,y));ctx.lineTo(pts.at(-1)[0],bottom);ctx.closePath();
  const fill = ctx.createLinearGradient(0,top,0,bottom);fill.addColorStop(0,'rgba(78,153,91,.25)');fill.addColorStop(1,'rgba(78,153,91,0)');ctx.fillStyle=fill;ctx.fill();ctx.restore();
  const avg = pts.map((_, i) => [pts[i][0], pts.slice(Math.max(0,i-12),i+1).reduce((acc,p)=>acc+p[1],0)/(Math.min(i,12)+1)]);
  line(ctx,avg,'rgba(238,137,85,.9)',1.8,[5,5]);
  line(ctx,pts,'#286e44',2.7);
  const last=pts.at(-1);ctx.fillStyle='#286e44';ctx.beginPath();ctx.arc(...last,4.5,0,Math.PI*2);ctx.fill();
  const glow=6+2*Math.sin(t*4);ctx.strokeStyle='#77b88777';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(...last,glow,0,Math.PI*2);ctx.stroke();
  if(heroHover){const idx=clamp(Math.round((heroHover.x-left)/(right-left)*169),0,visible-1);const p=pts[idx];if(p){ctx.strokeStyle='#55875d99';ctx.setLineDash([3,5]);ctx.beginPath();ctx.moveTo(p[0],top);ctx.lineTo(p[0],bottom);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#fff';ctx.strokeStyle='#286e44';ctx.lineWidth=2;ctx.beginPath();ctx.arc(...p,5,0,Math.PI*2);ctx.fill();ctx.stroke();}}
}
function heroNeural(ctx,w,h,t){
  const columns=[6,8,7,4], xs=[.12,.37,.64,.89].map(v=>w*v), top=57,bot=h-33;
  const nodes=columns.map((n,j)=>Array.from({length:n},(_,i)=>({x:xs[j],y:lerp(top,bot,(i+.5)/n)})));
  nodes.slice(0,-1).forEach((col,j)=>col.forEach((a,ai)=>nodes[j+1].forEach((b,bi)=>{const intensity=Math.sin(ai*.8+bi*.55+j+t*.9);ctx.strokeStyle=intensity>0?'rgba(44,125,74,.20)':'rgba(234,134,81,.14)';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();if((ai+bi+j)%3===0){const q=(t*.23+ai*.18+bi*.11)%1;ctx.fillStyle='#75b06a';ctx.beginPath();ctx.arc(lerp(a.x,b.x,q),lerp(a.y,b.y,q),1.6,0,Math.PI*2);ctx.fill();}})));
  nodes.flat().forEach((n,i)=>{const pulse=.5+.5*Math.sin(t*2+i);ctx.beginPath();ctx.fillStyle=i%4===0?'#e88b58':'#4c9463';ctx.arc(n.x,n.y,2.5+1.5*pulse,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#f1f8ec';ctx.lineWidth=1;ctx.stroke();});
  ctx.fillStyle='#628569';ctx.font='9px monospace';ctx.fillText('INPUT',xs[0]-18,h-18);ctx.fillText('HIDDEN',xs[1]-20,h-18);ctx.fillText('HIDDEN',xs[2]-20,h-18);ctx.fillText('OUTPUT',xs[3]-22,h-18);
}
const scatterRand=pseudorand(78211);
const scatter=Array.from({length:125},(_,i)=>{let group=i%3;const x=group===0? .2+scatterRand()*.4 : group===1? .48+scatterRand()*.37:.1+scatterRand()*.45;const y=group===0? .25+scatterRand()*.4:group===1?.2+scatterRand()*.3:.55+scatterRand()*.3;return{x,y,group}});
function heroData(ctx,w,h,t){
  const top=50,bot=h-32,left=22,right=w-20;
  scatter.forEach((p,i)=>{const ox=Math.sin(t*.6+i)*1.5,oy=Math.cos(t*.8+i*.8)*1.5;ctx.fillStyle=['#3e8c62','#ee9162','#8fb666'][p.group];ctx.globalAlpha=.4+.5*(.5+.5*Math.sin(t+i*.4));ctx.beginPath();ctx.arc(lerp(left,right,p.x)+ox,lerp(top,bot,1-p.y)+oy,2.2+(i%4)*.32,0,Math.PI*2);ctx.fill();});ctx.globalAlpha=1;
  ctx.save();ctx.strokeStyle='#2d865b99';ctx.lineWidth=1.7;ctx.setLineDash([7,6]);ctx.beginPath();ctx.moveTo(left+22,bot-12);ctx.bezierCurveTo(w*.4,h*.67,w*.65,h*.42,right-25,top+20);ctx.stroke();ctx.restore();
  ctx.fillStyle='#296544';ctx.font='9px monospace';ctx.fillText('CLUSTERS / CORRELATION',left+7,top+12);
}
function renderHero(){
  const {ctx}=hero,{w,h}=hero.size();ctx.clearRect(0,0,w,h);if(w<24||h<24)return;grid(ctx,w,h,'rgba(80,132,82,.14)',36,35);
  if(heroMode==='market')heroMarket(ctx,w,h,heroT);
  else if(heroMode==='ml')heroNeural(ctx,w,h,heroT);
  else heroData(ctx,w,h,heroT);
}

// QUANT / The data is synthetic and generated locally. No live finance feeds.
const quant = initCanvas($('#quantCanvas'));
$('#quantCanvas').addEventListener('canvasresized', () => renderQuant());
let quantVisible=false, regime='trend', noise=40, quantT=0, revealPhase=0;
const noiseEl=$('#noiseRange');
function sampleQuant(){
  const random=pseudorand(32214);
  const data=[];const N=145;
  let previous=.52;
  for(let i=0;i<N;i++){
    const u=i/(N-1);
    const drift=regime==='trend'?-.24*u:regime==='range'?0:-.07*u;
    const cyc=regime==='range'?Math.sin(u*17)*.24:regime==='volatile'?Math.sin(u*30)*.18:Math.sin(u*12)*.06;
    const sigma=(noise/100)* (regime==='volatile'?.28:.12);
    let value=.55+drift+cyc+(random()-.5)*2*sigma;
    value=.5*value+.5*previous;previous=value;
    data.push(clamp(value,.1,.9));
  }
  return data;
}
let quantData=sampleQuant();
function changeQuant(){quantData=sampleQuant();revealPhase=0;renderQuant();}
$$('.quant-regime').forEach(btn=>btn.addEventListener('click',()=>{
  regime=btn.dataset.regime;
  $$('.quant-regime').forEach(b=>{const active=b===btn;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});
  $('#quantRegimeLabel').textContent=({trend:'UPTREND / SIMULATED',range:'SIDEWAYS / SIMULATED',volatile:'HIGH VOLATILITY / SIMULATED'})[regime];
  changeQuant();
}));
noiseEl.addEventListener('input',()=>{noise=Number(noiseEl.value);$('#noiseOutput').value=`${noise}%`;changeQuant();});
observeActive($('#quantCanvas'),visible=>{quantVisible=visible;if(visible)renderQuant();});
function renderQuant(){
  const {ctx}=quant,{w,h}=quant.size();ctx.clearRect(0,0,w,h);if(w<24||h<24)return;
  grid(ctx,w,h,'rgba(63,115,70,.11)',w/8,h/5);
  const pad={l:14,r:13,t:26,b:20};const x=i=>lerp(pad.l,w-pad.r,i/(quantData.length-1)),y=v=>lerp(pad.t,h-pad.b,v);
  const visible=Math.max(2,Math.round(clamp(revealPhase,0,1)*(quantData.length-1)));
  const p=quantData.slice(0,visible).map((v,i)=>[x(i),y(v)]);
  ctx.beginPath();ctx.moveTo(p[0][0],h-pad.b);p.forEach(([px,py])=>ctx.lineTo(px,py));ctx.lineTo(p.at(-1)[0],h-pad.b);ctx.closePath();
  const g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(80,157,98,.24)');g.addColorStop(1,'rgba(80,157,98,0)');ctx.fillStyle=g;ctx.fill();
  const av=quantData.slice(0,visible).map((_,i)=>[x(i),y(quantData.slice(Math.max(0,i-13),i+1).reduce((a,b)=>a+b,0)/(Math.min(13,i)+1))]);
  line(ctx,av,'#ec9461',2);line(ctx,p,'#277c50',2.5);
  const end=p.at(-1);ctx.beginPath();ctx.arc(...end,4,0,Math.PI*2);ctx.fillStyle='#277c50';ctx.fill();
  const scan=(quantT*26)%Math.max(1,w);ctx.strokeStyle='rgba(70,130,72,.2)';ctx.setLineDash([3,5]);ctx.beginPath();ctx.moveTo(scan,pad.t);ctx.lineTo(scan,h-pad.b);ctx.stroke();ctx.setLineDash([]);
}

// ML / Gradient descent for binary logistic regression on editable 2D toy points.
const ml = initCanvas($('#mlCanvas'));
$('#mlCanvas').addEventListener('canvasresized', () => renderML());
let mlVisible=false, selectedClass=1, epoch=0, training=false, mlT=0;
const model={w0:0,w1:0,b:0};
const initialRand=pseudorand(60221);
const normalApprox=()=> (initialRand()+initialRand()+initialRand()+initialRand()-2)*.47;
function initialPoints(){
  const pts=[];
  for(let i=0;i<44;i++){
    const label=i<22?1:0;
    const sign=label?1:-1;
    pts.push({x:clamp(sign*.42+normalApprox(),-.95,.95),y:clamp(sign*.28+normalApprox(),-.95,.95),label});
  }
  return pts;
}
let points=initialPoints();
function predict(p){return sigmoid(model.w0*p.x+model.w1*p.y+model.b);}
function stepModel(){
  let gx=0,gy=0,gb=0;
  for(const p of points){const e=predict(p)-p.label;gx+=e*p.x;gy+=e*p.y;gb+=e;}
  const n=points.length;
  const rate=.55;
  model.w0-=rate*(gx/n+.012*model.w0);
  model.w1-=rate*(gy/n+.012*model.w1);
  model.b-=rate*gb/n;
  epoch++;
}
function updateMLLabels(){
  $('#epochLabel').textContent=`EPOCH ${String(epoch).padStart(3,'0')}`;
  const accuracy=points.reduce((correct,p)=>correct+(Number(predict(p)>=.5)===p.label?1:0),0)/points.length;
  $('#modelAccuracy').textContent=`ACCURACY ${Math.round(accuracy*100)}%`;
}
// Pretrain the first boundary so the static preview has meaningful content too.
for(let i=0;i<170;i++)stepModel();updateMLLabels();
function renderML(){
  const {ctx}=ml,{w,h}=ml.size();ctx.clearRect(0,0,w,h);if(w<24||h<24)return;
  const l=16,r=w-16,t=19,b=h-19;
  const X=x=>lerp(l,r,(x+1)/2),Y=y=>lerp(b,t,(y+1)/2);
  const W=17,H=17;
  for(let yy=0;yy<H;yy++)for(let xx=0;xx<W;xx++){
    const nx=(xx+.5)/W*2-1,ny=1-(yy+.5)/H*2;
    const prob=predict({x:nx,y:ny});
    ctx.fillStyle=prob>.5?`rgba(76,150,102,${.025+Math.abs(prob-.5)*.15})`:`rgba(233,143,98,${.025+Math.abs(prob-.5)*.14})`;
    ctx.fillRect(lerp(l,r,xx/W),lerp(t,b,yy/H), (r-l)/W+1,(b-t)/H+1);
  }
  grid(ctx,w,h,'rgba(85,127,92,.13)',(r-l)/7,(b-t)/5);
  if(epoch>0&&Math.abs(model.w1)>.005){
    let a={x:-1,y:-(model.w0*-1+model.b)/model.w1},q={x:1,y:-(model.w0+model.b)/model.w1};
    const intersections=[];
    if(a.y>=-1&&a.y<=1)intersections.push(a);
    if(q.y>=-1&&q.y<=1)intersections.push(q);
    if(Math.abs(model.w0)>.005){for(const y of [-1,1]){const x=-(model.w1*y+model.b)/model.w0;if(x>=-1&&x<=1)intersections.push({x,y});}}
    if(intersections.length>=2){ctx.save();ctx.shadowColor='rgba(21,87,52,.25)';ctx.shadowBlur=10;line(ctx,[[X(intersections[0].x),Y(intersections[0].y)],[X(intersections[1].x),Y(intersections[1].y)]],'#1e5e3c',2.6);ctx.restore();}
  }
  points.forEach((p,i)=>{
    const pulse=Math.sin(mlT*2+i*1.1)*.25;
    ctx.beginPath();ctx.arc(X(p.x),Y(p.y),4.1+pulse,0,Math.PI*2);
    ctx.fillStyle=p.label?'#39946a':'#e79057';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.2;ctx.stroke();
  });
}
function trainModel(){
  if(training)return;
  model.w0=0;model.w1=0;model.b=0;epoch=0;
  training=true;$('#trainButton').disabled=true;$('#trainButton').textContent='Training…';
  if(reducedMotion.matches){for(let i=0;i<170;i++)stepModel();finishTraining();renderML();return;}
  renderML();
}
function finishTraining(){training=false;$('#trainButton').disabled=false;$('#trainButton').textContent='↗ Retrain model';updateMLLabels();}
$('#trainButton').addEventListener('click',trainModel);
$('#resetModel').addEventListener('click',()=>{points=initialPoints();model.w0=0;model.w1=0;model.b=0;epoch=0;training=false;$('#trainButton').disabled=false;$('#trainButton').textContent='↗ Train model';updateMLLabels();renderML();});
$$('.class-select').forEach(btn=>btn.addEventListener('click',()=>{
  selectedClass=Number(btn.dataset.class);
  $$('.class-select').forEach(b=>{const active=b===btn;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});
}));
const mlCanvas=$('#mlCanvas');
mlCanvas.style.cursor='crosshair';
mlCanvas.addEventListener('pointerdown',e=>{
  if(training)return;
  const rect=mlCanvas.getBoundingClientRect();
  const x=clamp(((e.clientX-rect.left-16)/(rect.width-32))*2-1,-.98,.98);
  const y=clamp(1-((e.clientY-rect.top-19)/(rect.height-38))*2,-.98,.98);
  points.push({x,y,label:selectedClass});
  if(points.length>140)points.shift();
  $('#epochLabel').textContent='NEW DATA ADDED';
  renderML();
});
observeActive(mlCanvas,visible=>{mlVisible=visible;if(visible)renderML();});

// Run a light, single animation loop; no additional libraries or network connections.
let previousFrame=0;
function animate(now){
  const dt=Math.min((now-previousFrame)/1000||.016,.035);previousFrame=now;
  const animateMotion=!document.hidden&&!reducedMotion.matches;
  if(heroVisible){if(animateMotion)heroT+=dt;renderHero();}
  if(quantVisible){if(animateMotion){quantT+=dt;revealPhase=clamp(revealPhase+dt*.95,0,1);}else revealPhase=1;renderQuant();}
  if(mlVisible){if(animateMotion)mlT+=dt;renderML();}
  if(training){for(let i=0;i<(animateMotion?4:170);i++){if(epoch>=170)break;stepModel();}updateMLLabels();if(epoch>=170)finishTraining();}
  requestAnimationFrame(animate);
}
// Render a useful frame immediately, including on screenshots and without scrolling.
heroT = reducedMotion.matches ? 2 : 0.7;
revealPhase = 1;
renderHero(); renderQuant(); renderML();
requestAnimationFrame(animate);

// Active section navigation is managed by final.js.

;
/* v3.js */
/* ROHIT / V3 interactions: seamless marquee, gallery viewer, richer educational labs. */
'use strict';
(() => {
  const qs = (s,r=document) => r.querySelector(s);
  const qsa = (s,r=document) => [...r.querySelectorAll(s)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  // A genuine seamless marquee. Both units have identical rendered widths.
  const ticker = qs('.ticker-track');
  if(ticker){
    const items=['MACHINE LEARNING','QUANTITATIVE THINKING','PRODUCT ENGINEERING','DATA TO DECISIONS','SIGNALS TO SYSTEMS','CURIOUS BY DESIGN'];
    const unit = () => {
      const div=document.createElement('div');div.className='ticker-unit';
      items.forEach(item=>{
        const a=document.createElement('span');a.textContent=item;div.appendChild(a);
        const i=document.createElement('i');i.textContent='✳';i.setAttribute('aria-hidden','true');div.appendChild(i);
      });
      return div;
    };
    ticker.replaceChildren(unit(),unit());
    ticker.classList.add('marquee-ready');
    ticker.style.setProperty('--marquee-speed','46s');
  }

  // A compact personal gallery with fullsize images, captions, keyboard / touch controls.
  const photos=[
    {src:'assets/moments/event-conversation-1.webp',alt:'Rohit with Prof. V. Kamakoti at the PanIIT Summit in Vijayawada',meta:'PANIIT ANDHRA PRADESH SUMMIT · VIJAYAWADA · 2026',title:'With Prof. V. Kamakoti',description:'I spoke with the Director of IIT Madras about startups and shared my ideas for building useful technology.'},
    {src:'assets/moments/event-conversation-2.webp',alt:'Rohit with Dr. L. Venkata Subramaniam, CEO of Qbit Force',meta:'PANIIT ANDHRA PRADESH SUMMIT · VIJAYAWADA · 2026',title:'With Dr. L. Venkata Subramaniam',description:'A memorable conversation with the Qbit Force CEO about startups, my ideas and bringing ambitious technologies into practical products.'},
    {src:'assets/moments/community.webp',alt:'Rohit with fellow members of the student organising team at the summit',meta:'STUDENT ORGANISING TEAM · PANIIT VIJAYAWADA · 2026',title:'With our student organising team',description:'Fellow student organisers at the PanIIT Andhra Pradesh Summit. The most meaningful moments are often built together.'},
    {src:'assets/moments/club-launch.webp',alt:'Rohit and the Linux & Systems Club launch artwork',meta:'IIT MADRAS · JARVIS SOCIETY × IIC · 2026',title:'Launching the Linux & Systems Club',description:'Another milestone: helping create a welcoming place to learn Linux, systems and open source through hands-on work.'}
  ];
  const dialog=qs('#galleryLightbox');let selected=0, previousFocus=null, touchX=null;
  const thumbnails=qs('#galleryThumbnails');
  const thumbButtons=photos.map((p,i)=>{
    const btn=document.createElement('button');btn.type='button';btn.setAttribute('aria-label',`View photo ${i+1}: ${p.title}`);
    btn.innerHTML=`<img src="${p.src.includes('club-launch')?p.src:p.src.replace(/\.webp$/,'-thumb.webp')}" alt="" loading="lazy">`;
    btn.addEventListener('click',()=>renderPhoto(i));thumbnails.append(btn);return btn;
  });
  function renderPhoto(index){
    selected=(index+photos.length)%photos.length;
    const p=photos[selected];
    const im=qs('#galleryImage');
    // Srcset from the initial photograph must not override the newly selected photo.
    im.removeAttribute('srcset');im.removeAttribute('sizes');im.loading='eager';im.alt=p.alt;
    const current=selected;
    const low=p.src.includes('club-launch')?p.src:p.src.replace(/\.webp$/,'-480.webp');
    im.classList.add('is-loading');im.src=low;
    const hi=new Image();hi.decoding='async';hi.src=p.src;
    const finish=()=>{if(selected!==current)return;im.src=p.src;im.classList.remove('is-loading');};
    if(hi.decode)hi.decode().then(finish,()=>im.classList.remove('is-loading'));
    else{hi.onload=finish;hi.onerror=()=>im.classList.remove('is-loading');}
    // Anticipate a gallery swipe without downloading every full photo on page load.
    if(!reduced.matches){[(current+1)%photos.length,(current+photos.length-1)%photos.length].forEach(n=>{
      const warm=new Image();warm.src=photos[n].src.includes('club-launch')?photos[n].src:photos[n].src.replace(/\.webp$/,'-800.webp');
    });}
    qs('#galleryMeta').textContent=p.meta;
    qs('#galleryTitle').textContent=p.title;
    qs('#galleryDescription').textContent=p.description;
    qs('#galleryCount').textContent=`${String(selected+1).padStart(2,'0')} / ${String(photos.length).padStart(2,'0')}`;
    thumbButtons.forEach((b,i)=>{b.classList.toggle('active',i===selected);b.setAttribute('aria-current',i===selected?'true':'false');});
  }
  function openGallery(index){
    previousFocus=document.activeElement;
    renderPhoto(index);dialog.hidden=false;dialog.setAttribute('aria-hidden','false');
    document.body.classList.add('gallery-open-body');qs('#closeGallery').focus({preventScroll:true});
  }
  function closeGallery(){
    dialog.hidden=true;dialog.setAttribute('aria-hidden','true');
    document.body.classList.remove('gallery-open-body');
    if(previousFocus?.focus)previousFocus.focus({preventScroll:true});
  }
  qsa('[data-moment]').forEach(el=>{
    el.removeAttribute('role');
    el.addEventListener('click',()=>openGallery(Number(el.dataset.moment)));
  });
  qs('#openGallery').addEventListener('click',()=>openGallery(0));
  qs('#closeGallery').addEventListener('click',closeGallery);
  qs('#galleryPrev').addEventListener('click',()=>renderPhoto(selected-1));
  qs('#galleryNext').addEventListener('click',()=>renderPhoto(selected+1));
  dialog.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();closeGallery();}
    if(e.key==='ArrowLeft'){e.preventDefault();renderPhoto(selected-1);}
    if(e.key==='ArrowRight'){e.preventDefault();renderPhoto(selected+1);}
    if(e.key==='Tab'){
      const elements=qsa('button:not([disabled])',dialog).filter(x=>x.offsetParent!==null);
      const first=elements[0],last=elements.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
  qs('.gallery-viewer figure').addEventListener('touchstart',e=>{touchX=e.touches[0]?.clientX;},{passive:true});
  qs('.gallery-viewer figure').addEventListener('touchend',e=>{
    const end=e.changedTouches[0]?.clientX;
    if(touchX!==null&&end!==undefined&&Math.abs(end-touchX)>50)renderPhoto(selected+(end<touchX?1:-1));touchX=null;
  },{passive:true});

  // Enhanced simulated price study: chart can show SMA + an illustrative +/- 1.5 std band.
  // The underlying generation and animation come from the original lab.
  let sampleVariation=0;
  const smaSwitch=qs('#showSMA'),bandsSwitch=qs('#showBands');
  const originalChangeQuant=changeQuant;
  changeQuant=function(){
    originalChangeQuant();
    sampleVariation++;
    const random=pseudorand(7721+sampleVariation*91);
    quantData=quantData.map((v,i)=>clamp(v+(random()-.5)*(.02+noise/1300),.06,.94));
    updateQuantStats();renderQuant();
  };
  function updateQuantStats(){
    const delta=quantData.at(-1)-quantData[0];
    const avg=quantData.reduce((a,b)=>a+b,0)/quantData.length;
    const sigma=Math.sqrt(quantData.reduce((a,v)=>a+(v-avg)**2,0)/quantData.length);
    qs('#marketDrift').textContent=`DIRECTION / ${delta<-.025?'UP':delta>.025?'DOWN':'MIXED'}`;
    qs('#marketVol').textContent=`DISPERSION / ${(sigma*100).toFixed(1)}%`;
  }
  const oldRenderQuant=renderQuant;
  renderQuant=function(){
    const {ctx}=quant,{w,h}=quant.size();ctx.clearRect(0,0,w,h);if(w<24||h<24)return;
    grid(ctx,w,h,'rgba(62,114,69,.11)',w/8,h/5);
    const pad={l:14,r:13,t:26,b:20},X=i=>lerp(pad.l,w-pad.r,i/(quantData.length-1)),Y=v=>lerp(pad.t,h-pad.b,v);
    const n=Math.max(2,Math.round(clamp(revealPhase,0,1)*(quantData.length-1)));
    const raw=quantData.slice(0,n);const p=raw.map((v,i)=>[X(i),Y(v)]);
    const sma=raw.map((_,i)=>raw.slice(Math.max(0,i-13),i+1).reduce((a,b)=>a+b,0)/(Math.min(i,13)+1));
    if(bandsSwitch.checked){
      const upper=[],lower=[];
      raw.forEach((v,i)=>{
        const set=raw.slice(Math.max(0,i-13),i+1),mean=sma[i];
        const sd=Math.sqrt(set.reduce((a,b)=>a+(b-mean)**2,0)/set.length);
        upper.push([X(i),Y(clamp(mean-1.5*sd,0,1))]);
        lower.push([X(i),Y(clamp(mean+1.5*sd,0,1))]);
      });
      ctx.save();ctx.fillStyle='rgba(109,168,99,.11)';ctx.beginPath();upper.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));lower.reverse().forEach(([x,y])=>ctx.lineTo(x,y));ctx.closePath();ctx.fill();ctx.restore();
    }
    ctx.save();ctx.beginPath();ctx.moveTo(p[0][0],h-pad.b);p.forEach(([x,y])=>ctx.lineTo(x,y));ctx.lineTo(p.at(-1)[0],h-pad.b);ctx.closePath();
    const g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(66,152,93,.2)');g.addColorStop(1,'rgba(66,152,93,0)');ctx.fillStyle=g;ctx.fill();ctx.restore();
    if(smaSwitch.checked)line(ctx,sma.map((v,i)=>[X(i),Y(v)]),'#ec9461',2);
    line(ctx,p,'#277c50',2.6);
    const last=p.at(-1);ctx.fillStyle='#277c50';ctx.beginPath();ctx.arc(last[0],last[1],4.1,0,Math.PI*2);ctx.fill();
    if(!reduced.matches){const scan=(quantT*26)%Math.max(1,w);ctx.save();ctx.strokeStyle='rgba(65,122,73,.19)';ctx.setLineDash([3,5]);ctx.beginPath();ctx.moveTo(scan,pad.t);ctx.lineTo(scan,h-pad.b);ctx.stroke();ctx.restore();}
  };
  smaSwitch.addEventListener('change',renderQuant);
  bandsSwitch.addEventListener('change',renderQuant);
  qs('#regenerateSeries').addEventListener('click',changeQuant);
  updateQuantStats();renderQuant();

  // Logistic model: the threshold is now adjustable. This changes the actual region,
  // boundary and measured in-sample accuracy (NOT generalization performance).
  let threshold=.5;
  const originalRenderML=renderML;
  const originalUpdateLabels=updateMLLabels;
  renderML=function(){
    const {ctx}=ml,{w,h}=ml.size();ctx.clearRect(0,0,w,h);if(w<24||h<24)return;
    const l=16,r=w-16,t=19,b=h-19;
    const X=x=>lerp(l,r,(x+1)/2),Y=y=>lerp(b,t,(y+1)/2);
    for(let yy=0;yy<25;yy++)for(let xx=0;xx<25;xx++){
      const x=(xx+.5)/25*2-1,y=1-(yy+.5)/25*2,prob=predict({x,y});
      const d=Math.abs(prob-threshold);
      ctx.fillStyle=prob>=threshold?`rgba(61,157,105,${.035+Math.min(.15,d*.27)})`:`rgba(232,147,94,${.035+Math.min(.15,d*.27)})`;
      ctx.fillRect(lerp(l,r,xx/25),lerp(t,b,yy/25),(r-l)/25+1,(b-t)/25+1);
    }
    grid(ctx,w,h,'rgba(85,127,92,.14)',(r-l)/7,(b-t)/5);
    const boundary=Math.log(threshold/(1-threshold));
    const intersections=[];
    if(Math.abs(model.w1)>.005){
      for(const x of [-1,1]){const y=(boundary-model.w0*x-model.b)/model.w1;if(y>=-1&&y<=1)intersections.push({x,y});}
    }
    if(Math.abs(model.w0)>.005){
      for(const y of [-1,1]){const x=(boundary-model.w1*y-model.b)/model.w0;if(x>=-1&&x<=1)intersections.push({x,y});}
    }
    if(intersections.length>=2){ctx.save();ctx.shadowColor='rgba(21,87,52,.25)';ctx.shadowBlur=8;line(ctx,[[X(intersections[0].x),Y(intersections[0].y)],[X(intersections[1].x),Y(intersections[1].y)]],'#1e5e3c',2.8);ctx.restore();}
    points.forEach((p,i)=>{
      const pulse=reduced.matches?0:Math.sin(mlT*2+i*1.1)*.22;
      ctx.beginPath();ctx.arc(X(p.x),Y(p.y),4+pulse,0,2*Math.PI);ctx.fillStyle=p.label?'#39946a':'#e79057';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.1;ctx.stroke();
    });
  };
  updateMLLabels=function(){
    qs('#epochLabel').textContent=`EPOCH ${String(epoch).padStart(3,'0')}`;
    const correct=points.filter(p=>Number(predict(p)>=threshold)===p.label).length;
    qs('#modelAccuracy').textContent=`TRAIN ACC ${(correct/points.length*100).toFixed(0)}%`;
    qs('#mlExplain').textContent=`Decision threshold ${threshold.toFixed(2)} · ${points.length} labeled examples · training accuracy only.`;
  };
  qs('#thresholdRange').addEventListener('input',e=>{threshold=Number(e.target.value)/100;qs('#thresholdOutput').textContent=threshold.toFixed(2);updateMLLabels();renderML();});
  updateMLLabels();renderML();

  // Actual simulated three-asset mean/variance portfolio search.
  // No financial data feeds or pretend backtested performance.
  const assets=[{name:'Defensive basket',mu:.068,sd:.067},{name:'Broad market',mu:.118,sd:.166},{name:'Growth basket',mu:.174,sd:.270}];
  const corr=[[1,.10,-.04],[.10,1,.40],[-.04,.40,1]];
  const covariance=assets.map((a,i)=>assets.map((b,j)=>a.sd*b.sd*corr[i][j]));
  const portfolios=[];
  function calcPortfolio(weights){
    const ret=weights.reduce((acc,v,i)=>acc+v*assets[i].mu,0);
    let variance=0;for(let i=0;i<3;i++)for(let j=0;j<3;j++)variance+=weights[i]*weights[j]*covariance[i][j];
    const risk=Math.sqrt(Math.max(0,variance));
    return {weights,ret,risk,sharpe:(ret-.035)/risk};
  }
  for(let x=0;x<=100;x+=2)for(let y=0;y<=100-x;y+=2){
    portfolios.push(calcPortfolio([x/100,y/100,(100-x-y)/100]));
  }
  const sorted=portfolios.slice().sort((a,b)=>a.risk-b.risk);
  let best=-Infinity;const frontier=[];
  sorted.forEach(p=>{if(p.ret>best+.0007){frontier.push(p);best=p.ret;}});
  // First point is minimum-risk; choose by risk quantile, not fictitious live data.
  let selectedPortfolio=frontier[0],appetite=15;
  const chart=initCanvas(qs('#portfolioCanvas'));
  const canvas=qs('#portfolioCanvas');
  const minX=.045,maxX=.275,minY=.035,maxY=.195;
  function renderPortfolio(){
    const {ctx}=chart,{w,h}=chart.size();if(w<30||h<30)return;
    ctx.clearRect(0,0,w,h);
    const pad={l:42,r:16,t:21,b:35};
    const X=r=>pad.l+(r-minX)/(maxX-minX)*(w-pad.l-pad.r);
    const Y=r=>h-pad.b-(r-minY)/(maxY-minY)*(h-pad.t-pad.b);
    ctx.save();ctx.strokeStyle='rgba(37,89,55,.1)';ctx.lineWidth=1;
    for(let i=0;i<=5;i++){
      const yy=pad.t+(h-pad.t-pad.b)*i/5;ctx.beginPath();ctx.moveTo(pad.l,yy);ctx.lineTo(w-pad.r,yy);ctx.stroke();
      const xx=pad.l+(w-pad.l-pad.r)*i/5;ctx.beginPath();ctx.moveTo(xx,pad.t);ctx.lineTo(xx,h-pad.b);ctx.stroke();
    }
    ctx.font='10px "IBM Plex Mono",monospace';ctx.fillStyle='#64816b';
    for(let i=0;i<=4;i++){
      const x=.05+.05*i;ctx.fillText(`${Math.round(x*100)}%`,X(x)-11,h-13);
      const y=.05+.035*i;ctx.fillText(`${Math.round(y*100)}%`,5,Y(y)+3);
    }
    portfolios.forEach((p,i)=>{if(i%3!==0)return;ctx.beginPath();ctx.arc(X(p.risk),Y(p.ret),1.35,0,Math.PI*2);ctx.fillStyle='rgba(99,142,106,.17)';ctx.fill();});
    line(ctx,frontier.map(p=>[X(p.risk),Y(p.ret)]),'#23683f',3.3);
    ctx.setLineDash([4,5]);ctx.strokeStyle='rgba(26,76,42,.40)';ctx.beginPath();ctx.moveTo(X(selectedPortfolio.risk),h-pad.b);ctx.lineTo(X(selectedPortfolio.risk),Y(selectedPortfolio.ret));ctx.lineTo(pad.l,Y(selectedPortfolio.ret));ctx.stroke();ctx.setLineDash([]);
    ctx.beginPath();ctx.arc(X(selectedPortfolio.risk),Y(selectedPortfolio.ret),9,0,Math.PI*2);ctx.fillStyle='rgba(176,238,87,.45)';ctx.fill();
    ctx.beginPath();ctx.arc(X(selectedPortfolio.risk),Y(selectedPortfolio.ret),5.2,0,Math.PI*2);ctx.fillStyle='#22593d';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();ctx.restore();
  }
  function updatePortfolio(value){
    appetite=Number(value);qs('#riskRange').value=appetite;qs('#riskOutput').value=`${appetite} / 100`;qs('#riskOutput').textContent=`${appetite} / 100`;
    selectedPortfolio=frontier[Math.round(appetite/100*(frontier.length-1))];
    qs('#portReturn').textContent=(selectedPortfolio.ret*100).toFixed(1)+'%';
    qs('#portVolatility').textContent=(selectedPortfolio.risk*100).toFixed(1)+'%';
    qs('#portSharpe').textContent=selectedPortfolio.sharpe.toFixed(2);
    selectedPortfolio.weights.forEach((v,i)=>{
      qs(['#weightA','#weightB','#weightC'][i]).textContent=Math.round(v*100)+'%';
      qs(['#barA','#barB','#barC'][i]).style.width=`${v*100}%`;
    });
    qsa('.risk-preset').forEach(b=>{const active=Number(b.dataset.risk)===appetite;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});
    renderPortfolio();
  }
  canvas.addEventListener('canvasresized',renderPortfolio);
  qs('#riskRange').addEventListener('input',e=>updatePortfolio(e.target.value));
  qsa('.risk-preset').forEach(b=>b.addEventListener('click',()=>updatePortfolio(b.dataset.risk)));
  canvas.addEventListener('pointerdown',e=>{
    const r=canvas.getBoundingClientRect();const x=(e.clientX-r.left-42)/Math.max(1,r.width-58);
    const desired=minX+clamp(x,0,1)*(maxX-minX);
    let closest=0;
    for(let i=1;i<frontier.length;i++)if(Math.abs(frontier[i].risk-desired)<Math.abs(frontier[closest].risk-desired))closest=i;
    updatePortfolio(Math.round(100*closest/Math.max(1,frontier.length-1)));
  });
  updatePortfolio(15);

})();

;
/* finish.js */
/* Final small interaction polish.  All effects are optional and never obscure content. */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;
  const $all = selector => Array.from(document.querySelectorAll(selector));
  const easing = 'cubic-bezier(.16,1,.3,1)';

  // Stagger visual details as their parent section enters view.  Each element
  // remains readable without JavaScript: the animation runs from a faint state
  // toward the already-styled destination, not from display:none.
  const targets = $all([
    '.project-copy .project-type', '.project-copy .project-tech',
    '.project-proof', '.project-links',
    '.lab-panel-top', '.lab-chart-head', '.lab-panel .quant-controls',
    '.lab-panel .ml-controls', '.skills-top', '.leadership-list > div',
    '.about-badges', '.gallery-foot', '.summit-heading',
    '.exploring-note', '.contact-kicker', '.social-links'
  ].join(','));
  const once = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      once.unobserve(entry.target);
      if (reduce.matches || !entry.target.animate) return;
      const el = entry.target;
      const parentItems = [...(el.parentElement?.children || [])];
      const index = Math.max(0, parentItems.indexOf(el));
      el.animate([
        {opacity:.64,transform:'translate3d(0,13px,0)'},
        {opacity:1,transform:'translate3d(0,0,0)'}
      ], {duration:680,delay:Math.min(index,7)*45,easing,fill:'none'});
    });
  }, {threshold:.1,rootMargin:'0px 0px -25px 0px'});
  targets.forEach(t => once.observe(t));

  // Thin index rules grow in from the left, giving each section its own beat.
  const rules = $all('.eyebrow-line,.hero-mark-track');
  const ruleIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      ruleIO.unobserve(e.target);
      if (reduce.matches || !e.target.animate) return;
      e.target.animate([
        {transform:'scaleX(.05)',transformOrigin:'left'},
        {transform:'scaleX(1)',transformOrigin:'left'}
      ], {duration:780,easing,fill:'none'});
    });
  }, {threshold:.05});
  rules.forEach(r => ruleIO.observe(r));

  // Tiny, responsive visual confirmation when interacting with experimental
  // controls; their real data actions continue to run in script.js/v3.js.
  $all('.signal-option,.pill-group button,.risk-preset,.gallery-arrow,.filter').forEach(control => {
    control.addEventListener('click', () => {
      if (reduce.matches) return;
      control.classList.remove('pressed');
      void control.offsetWidth;
      control.classList.add('pressed');
    });
    control.addEventListener('animationend', () => control.classList.remove('pressed'));
  });

  // Avoid keeping IntersectionObservers alive after navigation.
  window.addEventListener('pagehide', () => {once.disconnect();ruleIO.disconnect();},{once:true});
})();

;
/* final.js */
/* Production finish: stable active nav, content-led motion and resilient interactions.
   GSAP is optional; all essential behavior works without the CDN. */
(()=>{'use strict';
 const q=(sel,root=document)=>root.querySelector(sel);
 const qa=(sel,root=document)=>Array.from(root.querySelectorAll(sel));
 const sectionIds=['home','work','lab','about','moments','contact'];
 const header=q('#header');let navFrame=0;
 function updateActive(){
   navFrame=0;
   const marker=(header?.getBoundingClientRect().height||72)+Math.min(window.innerHeight*.25,180);
   let active='home';
   sectionIds.forEach(id=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=marker)active=id;});
   if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-15)active='contact';
   qa('.header .nav a,.mobile-nav a').forEach(a=>{
     const selected=a.getAttribute('href')==='#'+active;
     a.classList.toggle('active',selected);
     if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
   });
 }
 function queueActive(){if(!navFrame)navFrame=requestAnimationFrame(updateActive)}
 window.addEventListener('scroll',queueActive,{passive:true});
 window.addEventListener('resize',queueActive,{passive:true});
 window.addEventListener('hashchange',()=>setTimeout(updateActive,80));
 window.addEventListener('load',updateActive,{once:true});updateActive();
 // Respect visual preferences throughout; all effects are progressive enhancements.
 const reduced=window.matchMedia('(prefers-reduced-motion:reduce)');
 if(reduced.matches)return;
 const fine=window.matchMedia('(hover:hover) and (pointer:fine)');
 // Timed lettering sequence in hero (subtle; existing CSS handles initial headline reveal).
 const word=q('.hero-name-ink');
 if(word){word.animate([{filter:'brightness(1.25)'},{filter:'brightness(1)'}],{duration:1200,delay:650,easing:'ease-out'});}
 // Individual stat counters, scrolling into view; preserving authentic displayed values.
 const stats=qa('.stat-cell>strong');
 const statIO=new IntersectionObserver(entries=>{
   for(const e of entries){if(!e.isIntersecting)continue;statIO.unobserve(e.target);
     const el=e.target;const text=el.textContent||'';
     const m=text.match(/^(\d[\d,]*)(\+?)(.*)$/);
     if(!m)continue;
     const total=Number(m[1].replace(/,/g,''));if(!Number.isFinite(total)||total>1000000||total<2)continue;
     let start=0;const suffix=m[2]+m[3],prefixDigits=m[1],fmt=n=>prefixDigits.includes(',')?Math.round(n).toLocaleString('en-IN'):Math.round(n).toString();
     function step(ts){if(!start)start=ts;const p=Math.min(1,(ts-start)/1050),t=1-Math.pow(1-p,3);el.textContent=fmt(total*t)+suffix;if(p<1)requestAnimationFrame(step);else el.textContent=text;}
     requestAnimationFrame(step);
   }
 },{threshold:.4});stats.forEach(e=>statIO.observe(e));
 // Gallery and tool sections reveal in small groups, without hiding text awaiting JS.
 const entries=qa('.tool-chip,.project-proof>div,.summit-caption');
 const entryIO=new IntersectionObserver(items=>{
   items.forEach(item=>{if(!item.isIntersecting)return;entryIO.unobserve(item.target);
     const el=item.target;const siblings=[...(el.parentElement?.children||[])];const i=siblings.indexOf(el);
     el.animate([{opacity:.48,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,delay:Math.min(i,9)*35,easing:'cubic-bezier(.16,1,.3,1)'});
   });
 },{threshold:.05,rootMargin:'0px 0px -20px 0px'});entries.forEach(e=>entryIO.observe(e));
 // Desktop image depth follows the mouse within a small cap; no image or face warping.
 if(fine.matches){
   qa('.summit-card').forEach(card=>{
      const img=q('.summit-photo img',card);if(!img)return;
      let x=0,y=0,raf=0;
      card.addEventListener('pointermove',event=>{
        const r=card.getBoundingClientRect();x=((event.clientX-r.left)/r.width-.5)*3;y=((event.clientY-r.top)/r.height-.5)*3;
        if(!raf)raf=requestAnimationFrame(()=>{raf=0;img.style.transform=`scale(1.045) translate3d(${x}px,${y}px,0)`;});
      },{passive:true});
      card.addEventListener('pointerleave',()=>{img.style.transform='';},{passive:true});
   });
 }
 // GSAP only: gentle scrub on selected visual dividers, restrained enough for text clarity.
 function enhanceGSAP(){
   if(!window.gsap||!window.ScrollTrigger||window.__finalGsapInstalled)return;
   window.__finalGsapInstalled=true;
   const gsap=window.gsap;gsap.registerPlugin(window.ScrollTrigger);
   if(window.innerWidth>=960){
     qa('.summit-photo').forEach((el,i)=>{
        const image=q('img',el);if(!image)return;
        gsap.fromTo(image,{yPercent:-3},{yPercent:3,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:.75},overwrite:'auto'});
     });
     qa('.toolkit-group').forEach((el,i)=>{
       gsap.fromTo(el,{y:12},{y:0,ease:'none',scrollTrigger:{trigger:el,start:'top 95%',end:'top 48%',scrub:1}});
     });
   }
 }
 window.addEventListener('load',enhanceGSAP,{once:true});enhanceGSAP();
})();

;
/* production.js */
/* Accessible finishing interactions: no GSAP/CDN dependency, no invisible content while loading. */
(() => {
 'use strict';
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(pointer:fine) and (hover:hover)');
 const qs=(s,root=document)=>root.querySelector(s);
 const all=(s,root=document)=>[...root.querySelectorAll(s)];
 const easing='cubic-bezier(.16,1,.3,1)';

 // A failsafe for scripts that load slowly or are stopped by privacy extensions.
 all('.reveal').forEach(el=>{el.style.opacity='1';el.style.transform='none';});
 const heroLabel=qs('.hero-name-eyebrow');if(heroLabel){heroLabel.style.opacity='1';heroLabel.style.visibility='visible';}

 // Content-first entrance animations, local and independent of third-party code.
 // Everything remains readable if IntersectionObserver, Web Animations or JS fails.
 if(!reduce.matches && 'IntersectionObserver' in window){
  const activated=new WeakSet();
  const animables=[
    ...all('.section-intro h2,.moments-header h2,.about-story h2,.contact-main h2'),
    ...all('.project-feature,.archive-item,.lab-panel,.toolkit-group,.summit-card,.leadership-list>div,.exploring-note'),
    ...all('.hero-name,.hero-subtitle,.hero-ctas,.stat-cell')
  ];
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(!entry.isIntersecting)continue;
    const el=entry.target;observer.unobserve(el);
    if(activated.has(el)||!el.animate)continue;activated.add(el);
    const asCard=el.matches('.summit-card,.project-feature,.lab-panel,.toolkit-group');
    const duration=asCard?860:720;
    const rect=el.getBoundingClientRect();
    // Do not wash out crucial words such as "Hi, I'm" while they are entering.
    const fromOpacity=el.matches('.hero-name,.hero-subtitle')?.88:.52;
    el.animate([
     {opacity:fromOpacity,transform:`translate3d(0,${asCard?30:22}px,0) scale(${asCard?.985:1})`},
     {opacity:1,transform:'translate3d(0,0,0) scale(1)'}
    ],{duration,easing,fill:'none'});
   }
  },{threshold:.04,rootMargin:'0px 0px -25px 0px'});
  animables.forEach(el=>observer.observe(el));
  window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});
 }

 // Physical-feedback micro-interaction. Does not interfere with actual actions.
 if(!reduce.matches){
  all('.button,.button-small,.round-arrow,.gallery-arrow,.contact-email,.copy-email,.filter,.pill-group button').forEach(el=>{
   el.addEventListener('pointerdown',e=>{
    if(!e.isPrimary||e.pointerType==='touch'&&e.buttons===0)return;
    const r=el.getBoundingClientRect();
    if(!r.width||!r.height)return;
    const dot=document.createElement('span');dot.className='tap-ripple';
    dot.style.setProperty('--tap-x',(e.clientX-r.left)+'px');dot.style.setProperty('--tap-y',(e.clientY-r.top)+'px');
    el.style.position='relative';el.style.overflow='hidden';el.append(dot);dot.addEventListener('animationend',()=>dot.remove(),{once:true});
   },{passive:true});
  });
 }

 // Email: mailto requires a configured OS handler. Gmail and copy both work in-browser.
 const copy=qs('#copyEmail'),notice=qs('#copyNotice');
 if(copy && notice){
  let msgTimer=0;
  async function copyEmail(){
   const value='rohitpulamarasetty@gmail.com';let ok=false;
   try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(value);ok=true;}}catch(e){}
   if(!ok){
    const input=document.createElement('textarea');input.value=value;input.setAttribute('aria-hidden','true');
    input.style.cssText='position:fixed;top:-9999px;left:-9999px;opacity:0';document.body.append(input);
    input.focus();input.select();try{ok=document.execCommand('copy');}catch(e){}input.remove();
   }
   if(ok){notice.textContent='Email copied — ready to paste.';copy.firstChild.textContent='Copied! ';}
   else{notice.textContent='Copy this email: '+value;copy.firstChild.textContent='Select email ';}
   clearTimeout(msgTimer);msgTimer=setTimeout(()=>{notice.textContent='';copy.firstChild.textContent='Copy email ';},3500);
  }
  copy.addEventListener('click',copyEmail);
 }

 // Unify every club, society and company external arrow, including the accessible name.
 all('.leadership-list>div>a').forEach(el=>{
   el.textContent='↗';el.title='Open website in a new tab';
 });

 // Lightweight image reveal when decoding finishes, but never make a photo invisible.
 all('.summit-photo img').forEach(img=>{
  const frame=img.closest('.summit-photo');if(!frame)return;
  frame.classList.add('photo-ready');
  const decoded=()=>{
   frame.classList.add('photo-decoded');
   if(!reduce.matches && img.animate)img.animate([
    {opacity:.83,filter:'saturate(.83)'},{opacity:1,filter:'saturate(1)'}
   ],{duration:440,easing,fill:'none'});
  };
  if(img.complete && img.naturalWidth>0)decoded();else img.addEventListener('load',decoded,{once:true});
 });

 // Draw a little attention to the interactive tools only when they enter view.
 if(!reduce.matches && 'IntersectionObserver' in window){
  const controlsIO=new IntersectionObserver(entries=>{
   for(const e of entries){if(!e.isIntersecting)continue;
    controlsIO.unobserve(e.target);
    if(e.target.animate)e.target.animate([{opacity:.72,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],
      {duration:580,easing});
   }
  },{threshold:.05});
  all('.signal-options,.quant-controls,.ml-controls,.portfolio-controls,.toolkit-tags,.project-tech').forEach(el=>controlsIO.observe(el));
 }


 // Prefetch compact frames when the gallery is approaching, without delaying the hero.
 const moments=qs('#moments');
 if(moments && 'IntersectionObserver' in window){
  const warmIO=new IntersectionObserver(entries=>{
   if(!entries.some(e=>e.isIntersecting))return;warmIO.disconnect();
   if(navigator.connection?.saveData)return;
   ['event-conversation-1-800.webp','event-conversation-2-800.webp','community-800.webp'].forEach(filename=>{
    const img=new Image();img.decoding='async';img.src='assets/moments/'+filename;
   });
  },{rootMargin:'900px 0px'});warmIO.observe(moments);
 }

 // Ensure name and primary call-to-action stay visible when navigating from a fragment.
 window.addEventListener('pageshow',()=>{
  all('.hero-name-eyebrow,.hero-name-ink,.hero-ctas').forEach(el=>{el.style.visibility='visible';});
 });
})();
