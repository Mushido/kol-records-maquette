/* KoL Records — moteur commun (nav, curseur, transitions, animations, shortlist) */
(function(){
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => [...c.querySelectorAll(s)];
  const page = document.body.dataset.page || '';
  const hasGSAP = !!window.gsap;
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- shared layout ---------- */
  const NAV = [
    ['index.html','Accueil','home'],['label.html','Le Label','label'],['artistes.html','Artistes','artistes'],
    ['snoop-dogg.html','Légendes','legend'],['booking.html','Booking','booking'],['clients.html','Références','clients'],['contact.html','Contact','contact']
  ];
  const navEl = document.createElement('header');
  navEl.className = 'nav';
  navEl.innerHTML = `
    <a href="index.html" class="logo" aria-label="KoL Records"><img src="kol-logo.png" alt="KoL Records"></a>
    <nav class="links">${NAV.map(([h,t,k])=>`<a href="${h}" class="${k===page?'active':''} ${k==='legend'?'legend-link':''}">${t}</a>`).join('')}</nav>
    <div class="right">
      <a href="booking.html" class="btn btn-accent btn-hide-m" data-magnetic>Booker un artiste <span class="badge" data-sl-count>0</span></a>
      <button class="burger" aria-label="Menu"><span></span><span></span></button>
    </div>`;
  document.body.prepend(navEl);
  const mm = document.createElement('div');
  mm.className = 'mobile-menu';
  mm.innerHTML = `<div>${NAV.map(([h,t],i)=>`<a class="big" href="${h}"><small>0${i+1}</small>${t}</a>`).join('')}</div>
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;color:var(--bone-2)"><a href="tel:+33615296949">+33 6 15 29 69 49</a><a href="mailto:contact@kolrecords.com">contact@kolrecords.com</a></div>`;
  document.body.appendChild(mm);
  $('.burger').addEventListener('click',()=>document.documentElement.classList.toggle('menu-open'));

  const ft = document.createElement('footer');
  ft.className = 'footer';
  ft.innerHTML = `<div class="wrap">
    <div class="ft-grid">
      <div><h5>KoL Records</h5><p style="max-width:340px">Label indépendant de production musicale basé à Paris. Production, management, édition, branding et booking d’artistes.</p>
        <a href="booking.html" class="btn btn-light" style="margin-top:18px;display:inline-flex">Demander un artiste <span class="arr">→</span></a></div>
      <div><h5>Navigation</h5>${NAV.map(([h,t])=>`<a href="${h}">${t}</a>`).join('')}</div>
      <div><h5>Contact</h5><a href="tel:+33615296949">Label · +33 6 15 29 69 49</a><a href="tel:+33652231000">Booking · +33 6 52 23 10 00</a><a href="mailto:contact@kolrecords.com">contact@kolrecords.com</a><p>226 Rue Saint-Honoré<br>75001 Paris</p><p>Lun – Dim · 9h – 23h</p></div>
      <div><h5>Suivre</h5><a href="https://www.instagram.com/_kolrecords/" target="_blank">Instagram · Label ↗</a><a href="https://www.instagram.com/kolrecords_booking/" target="_blank">Instagram · Booking ↗</a><a href="https://www.facebook.com/kol.record" target="_blank">Facebook ↗</a></div>
    </div>
    <div class="ft-word">KoL Records</div>
    <div class="ft-bottom"><span>© 2026 KoL Records · Maquette de refonte — document de travail non contractuel</span><span>Photos d’artistes : Wikimedia Commons (licences libres, auteurs crédités sur les fichiers source) · Logos : kolrecords.com</span></div>
  </div>`;
  document.body.appendChild(ft);

  ['grain','curtain'].forEach(c=>{const d=document.createElement('div');d.className=c;document.body.appendChild(d);});
  const cur = document.createElement('div');
  cur.className='cursor'; cur.innerHTML='<div class="ring"></div><div class="dot"></div><div class="lbl">Voir</div>';
  document.body.appendChild(cur);

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (window.Lenis){
    lenis = new Lenis({lerp:.09, smoothWheel:true});
    if (hasGSAP){ lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
    else { const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)}; requestAnimationFrame(raf); }
    window.__lenis = lenis;
  }

  /* ---------- nav hide/show ---------- */
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    navEl.classList.toggle('scrolled', y > 40);
    navEl.classList.toggle('hide', y > lastY && y > 400 && !document.documentElement.classList.contains('menu-open'));
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, {passive:true});

  /* ---------- cursor ---------- */
  const ring = $('.ring',cur), dot = $('.dot',cur), lbl = $('.lbl',cur);
  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
  (function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';lbl.style.left=rx+'px';lbl.style.top=ry+'px';requestAnimationFrame(loop)})();
  document.addEventListener('mouseover',e=>{
    const v = e.target.closest('[data-cursor]');
    const h = e.target.closest('a,button,label,.chip,input,select,textarea');
    cur.classList.toggle('is-view', !!v);
    if (v) lbl.textContent = v.dataset.cursor || 'Voir';
    cur.classList.toggle('is-hover', !!h && !v);
  });

  /* ---------- magnetic buttons ---------- */
  $$('[data-magnetic]').forEach(b=>{
    b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`;});
    b.addEventListener('mouseleave',()=>{b.style.transform='';b.style.transition='transform .6s cubic-bezier(.76,0,.24,1)';setTimeout(()=>b.style.transition='',600);});
  });

  /* ---------- page transitions ---------- */
  const curtain = $('.curtain');
  if (hasGSAP){
    gsap.set(curtain,{scaleY:1,transformOrigin:'top'});
    gsap.to(curtain,{scaleY:0,duration:.9,ease:'expo.inOut',delay:.05});
  } else curtain.style.transform='scaleY(0)';
  document.addEventListener('click',e=>{
    const a = e.target.closest('a');
    if (!a || a.target==='_blank' || e.metaKey || e.ctrlKey) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || /^https?:/.test(href)) return;
    e.preventDefault();
    document.documentElement.classList.remove('menu-open');
    if (hasGSAP){ gsap.set(curtain,{transformOrigin:'bottom'}); gsap.to(curtain,{scaleY:1,duration:.7,ease:'expo.inOut',onComplete:()=>location.href=href}); }
    else location.href = href;
  });

  /* ---------- spinning badge on inner heroes ---------- */
  $$('.phero').forEach(h=>{
    const b=document.createElement('div'); b.className='spin-badge';
    b.innerHTML=`<svg viewBox="0 0 200 200"><defs><path id="cp" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><text><textPath href="#cp">KoL Records ✦ Paris ✦ Label indépendant ✦ Booking ✦ </textPath></text></svg><img src="kol-logo.png" alt="">`;
    h.appendChild(b);
  });

  /* ---------- marquees: duplicate tracks ---------- */
  $$('.marquee').forEach(m=>{const t=$('.track',m); if(!t) return; for(let i=0;i<2;i++){const c=t.cloneNode(true);c.setAttribute('aria-hidden','true');m.appendChild(c);} });

  /* ---------- shortlist (booking basket) ---------- */
  const SL_KEY='kol_shortlist';
  const SL = {
    get(){ try{return JSON.parse(localStorage.getItem(SL_KEY))||[]}catch(e){return[]} },
    set(v){ localStorage.setItem(SL_KEY,JSON.stringify(v)); SL.render(); },
    toggle(n){ const s=SL.get(); const i=s.indexOf(n); i>-1?s.splice(i,1):s.push(n); SL.set(s); return i===-1; },
    render(){
      const s=SL.get();
      $$('[data-sl-count]').forEach(e=>{e.textContent=s.length; e.style.display=s.length?'':'none';});
      $$('[data-sl-add]').forEach(b=>{const on=s.includes(b.dataset.slAdd); b.classList.toggle('on',on); b.innerHTML=on?'✓ Dans ma demande':'+ Ajouter';});
      const bar=$('.shortlist'); if(bar){ bar.classList.toggle('on',s.length>0); $('.cnt',bar).textContent=s.length; $('.names',bar).textContent=s.join(' · '); }
      document.dispatchEvent(new CustomEvent('sl:change',{detail:s}));
    }
  };
  window.KOL_SL = SL;
  document.addEventListener('click',e=>{const b=e.target.closest('[data-sl-add]'); if(!b) return; e.preventDefault(); e.stopPropagation(); SL.toggle(b.dataset.slAdd);});

  /* ---------- reveal animations ---------- */
  function splitWords(el){
    const html = el.innerHTML;
    const tmp = document.createElement('div'); tmp.innerHTML = html;
    const walk = node => {
      [...node.childNodes].forEach(n=>{
        if (n.nodeType===3){
          const frag=document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(p=>{ if(!p) return; if(/^\s+$/.test(p)) frag.appendChild(document.createTextNode(p)); else {const s=document.createElement('span');s.className='w';s.textContent=p;frag.appendChild(s);} });
          node.replaceChild(frag,n);
        } else if (n.nodeType===1 && !n.classList.contains('w')) walk(n);
      });
    };
    walk(tmp); el.innerHTML = tmp.innerHTML;
  }

  function init(){
    SL.render();
    if (!hasGSAP){ $$('.reveal').forEach(e=>{e.style.opacity=1;e.style.transform='none'}); return; }

    // big titles: line by line
    $$('[data-split]').forEach(el=>{
      const lines = el.innerHTML.split(/<br\s*\/?>/i);
      el.innerHTML = lines.map(l=>`<span class="split-line"><span>${l}</span></span>`).join('');
      gsap.from($$('.split-line > span',el),{yPercent:110,rotate:3,duration:1.3,ease:'expo.out',stagger:.09,delay:el.dataset.delay?+el.dataset.delay:0,
        scrollTrigger: el.closest('.hero,.phero') ? null : {trigger:el,start:'top 85%'}});
    });
    $$('.reveal').forEach(el=>{
      gsap.to(el,{opacity:1,y:0,duration:1.1,ease:'expo.out',delay:el.dataset.delay?+el.dataset.delay:0,scrollTrigger:{trigger:el,start:'top 90%'}});
    });
    $$('[data-stagger]').forEach(g=>{
      gsap.from(g.children,{opacity:0,y:50,duration:1,ease:'expo.out',stagger:.07,scrollTrigger:{trigger:g,start:'top 85%'}});
    });
    // manifesto words light-up on scroll
    $$('.manifesto').forEach(m=>{
      splitWords(m);
      gsap.to($$('.w',m),{opacity:1,stagger:.05,ease:'none',scrollTrigger:{trigger:m,start:'top 75%',end:'bottom 45%',scrub:true}});
    });
    // counters
    $$('[data-count]').forEach(el=>{
      const end = parseFloat(el.dataset.count); const dec = (el.dataset.count.split('.')[1]||'').length;
      const o={v:0};
      gsap.to(o,{v:end,duration:2.2,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 90%'},onUpdate:()=>{el.textContent=o.v.toFixed(dec).replace('.',',')},onComplete:()=>{el.textContent=el.dataset.count.replace('.',',')}});
    });
    // parallax images
    $$('[data-parallax]').forEach(el=>{
      gsap.fromTo(el,{yPercent:-(+el.dataset.parallax||10)},{yPercent:+el.dataset.parallax||10,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:true}});
    });
    // horizontal pinned sections
    $$('[data-hscroll]').forEach(sec=>{
      const track = $('.h-track',sec);
      if (innerWidth < 800){ track.style.overflowX='auto'; track.style.width='auto'; return; }
      const dist = () => track.scrollWidth - innerWidth;
      gsap.to(track,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:sec,start:'top top',end:()=>'+='+dist(),pin:true,scrub:1,invalidateOnRefresh:true}});
    });
    // skew on velocity for marquees
    $$('.mq-band').forEach(b=>{
      ScrollTrigger.create({trigger:b,onUpdate:s=>{gsap.to(b,{skewY:gsap.utils.clamp(-4,4,s.getVelocity()/-300),duration:.4,overwrite:true});}});
    });
  }

  /* ---------- hover image list ---------- */
  window.KOL_floatList = function(list){
    const fi = document.createElement('div'); fi.className='float-img'; document.body.appendChild(fi);
    let fx=0,fy=0,cx=0,cy=0;
    addEventListener('mousemove',e=>{fx=e.clientX;fy=e.clientY});
    (function l(){cx+=(fx-cx)*.12;cy+=(fy-cy)*.12;fi.style.left=cx+'px';fi.style.top=cy+'px';requestAnimationFrame(l)})();
    $$('a[data-img]',list).forEach(a=>{
      a.addEventListener('mouseenter',()=>{ if(!a.dataset.img) return; const im=new Image(); im.src=a.dataset.img; fi.appendChild(im); if(hasGSAP) gsap.from(im,{clipPath:'inset(100% 0 0 0)',duration:.6,ease:'expo.out'}); while(fi.children.length>3) fi.firstChild.remove(); fi.classList.add('on'); });
      a.addEventListener('mouseleave',()=>fi.classList.remove('on'));
    });
  };

  /* ---------- preloader (home, once per session) ---------- */
  function preloader(done){
    const ld = $('.loader');
    if (!ld || !hasGSAP || sessionStorage.getItem('kol_loaded')){ if(ld) ld.remove(); done(); return; }
    sessionStorage.setItem('kol_loaded','1');
    const cnt = $('.ld-count',ld), bar=$('.ld-bar i',ld), nm=$('.ld-names span',ld);
    const names = ['Snoop Dogg','Coolio','Lil Wayne','Ricky Martin','OneRepublic','Gims','Amel Bent','Slimane','KoL Records'];
    let i=0; const iv=setInterval(()=>{nm.textContent=names[i%names.length];i++;},190);
    const o={v:0};
    gsap.timeline({onComplete:()=>{clearInterval(iv);ld.remove();}})
      .to(o,{v:100,duration:2,ease:'power3.inOut',onUpdate:()=>{cnt.textContent=String(Math.round(o.v)).padStart(3,'0');bar.style.transform=`scaleX(${o.v/100})`;}})
      .add(()=>{clearInterval(iv);nm.textContent='KoL Records';done();})
      .to(ld,{clipPath:'inset(0 0 100% 0)',duration:1,ease:'expo.inOut'});
  }

  const start = () => { if (page==='home') preloader(init); else init(); };
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
  window.addEventListener('load',()=>hasGSAP && ScrollTrigger.refresh());
})();
