document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const N = slides.length;
  let cur = 0;
  
  const slider = document.getElementById('slider');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const pFill = document.getElementById('pFill');
  const tocList = document.getElementById('tocList');
  
  let lastMod = -1;
  const modTracker = [];
  const modBtns = [];
  
  slides.forEach((sl, idx) => {
    const m = sl.getAttribute('data-module');
    const t = sl.getAttribute('data-title');
    modTracker.push(m);
    
    if (m != lastMod && t) {
      lastMod = m;
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.className = 'toc-btn';
      if (idx === 0) btn.classList.add('active');
      btn.innerHTML = t;
      btn.setAttribute('data-target', idx);
      btn.setAttribute('data-mod', m);
      
      btn.addEventListener('click', () => {
        go(idx);
      });
      
      li.appendChild(btn);
      tocList.appendChild(li);
      modBtns.push(btn);
    }
  });
  
  function updateNav() {
    slider.style.transform = `translateX(-${cur * 100}%)`;
    pFill.style.width = ((cur / (N - 1)) * 100) + '%';
    
    slides.forEach((sl, i) => sl.classList.toggle('active', i === cur));
    
    btnPrev.disabled = cur === 0;
    btnNext.disabled = cur === N - 1;
    
    const currentMod = modTracker[cur];
    modBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mod') === String(currentMod));
    });
  }
  
  function go(idx) {
    if (idx < 0 || idx >= N) return;
    cur = idx;
    updateNav();
  }
  
  btnPrev.addEventListener('click', () => go(cur - 1));
  btnNext.addEventListener('click', () => go(cur + 1));
  
  window.addEventListener('keydown', e => {
    if (['ArrowRight', ' '].includes(e.key)) { e.preventDefault(); go(cur + 1); }
    if (['ArrowLeft'].includes(e.key)) { e.preventDefault(); go(cur - 1); }
  });
  
  updateNav();
});
