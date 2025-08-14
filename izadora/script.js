// script.js

// Hearts flutuantes
const heartsContainer = document.getElementById('hearts');
function createHeart(){
  const heart = document.createElement('div');
  heart.className = 'heart-float';
  heart.textContent = '❤';
  heart.style.left = Math.random()*100+'vw';
  heart.style.fontSize = (10+Math.random()*20)+'px';
  heartsContainer.appendChild(heart);
  setTimeout(()=>heart.remove(),6000);
}
setInterval(createHeart,500);

// Lightbox da galeria
const galleryImgs = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
galleryImgs.forEach(img=>{
  img.addEventListener('click',()=>{
    lightbox.classList.add('open');
    lightboxImg.src = img.src;
  });
});
lightbox.addEventListener('click',()=>{
  lightbox.classList.remove('open');
});

// Planos futuros
const checks = Array.from(document.querySelectorAll('#plans input[type="checkbox"]'));
const bar = document.getElementById('progressBar');
const text = document.getElementById('progressText');

function updateProgress(){
  const total = checks.reduce((acc, el)=> acc + Number(el.dataset.weight||1),0);
  const done = checks.reduce((acc, el)=> acc + (el.checked ? Number(el.dataset.weight||1) : 0),0);
  const pct = total ? Math.round((done/total)*100) : 0;
  bar.style.width = pct+'%';
  text.textContent = pct+'%';
  localStorage.setItem('planosChecks',JSON.stringify(checks.map(c=>c.checked)));
}

// Recupera checkboxes salvos
const saved = JSON.parse(localStorage.getItem('planosChecks') || 'null');
if(saved && saved.length === checks.length){ checks.forEach((c,i) => c.checked = !!saved[i]); }

checks.forEach(c => c.addEventListener('change', updateProgress));
updateProgress();


