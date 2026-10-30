/* KoL Records — moteur commun (nav, curseur, transitions, animations, shortlist) */
(function(){
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => [...c.querySelectorAll(s)];
  const page = document.body.dataset.page || '';
  const hasGSAP = !!window.gsap;
  if (hasGSAP && window.ScrollTrigger){ gsap.registerPlugin(ScrollTrigger); ScrollTrigger.config({ignoreMobileResize:true}); gsap.config({force3D:true}); }
  const isTouch = matchMedia('(hover:none)').matches;

  /* ---------- shared layout ---------- */
  const NAV = [
    ['index.html','Accueil','home'],['label.html','Le Label','label'],['artistes.html','Artistes','artistes'],
    ['legendes.html','Légendes','legend'],['booking.html','Booking','booking'],['clients.html','Références','clients'],['contact.html','Contact','contact']
  ];
  const LEG = [
    ['Snoop Dogg','snoop-dogg.html','https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Snoop_Dogg_2019_by_Glenn_Francis.jpg/330px-Snoop_Dogg_2019_by_Glenn_Francis.jpg','Press kit · L—01'],
    ['Lil Wayne','lil-wayne.html','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Lil_Wayne_Feb._2020.jpg/330px-Lil_Wayne_Feb._2020.jpg','Press kit · L—02'],
    ['Gims','gims.html','https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/NDLE2025Gims_1.jpg/330px-NDLE2025Gims_1.jpg','Press kit · L—03']];
  window.KOL_LEG = LEG;
  const navEl = document.createElement('header');
  navEl.className = 'nav';
  navEl.innerHTML = `
    <a href="index.html" class="logo" aria-label="KoL Records"><img src="kol-logo.png" alt="KoL Records"></a>
    <nav class="links">${NAV.map(([h,t,k])=>k==='legend' ? `<span class="nav-dd"><a href="${h}" class="${k===page?'active':''} legend-link">${t}<i class="chev"></i></a><span class="dd">${LEG.map(l=>`<a href="${l[1]}"><img src="${l[2]}" alt=""><span><b>${l[0]}</b><small>${l[3]}</small></span></a>`).join('')}<a href="legendes.html" class="all">Toutes les légendes →</a></span></span>` : `<a href="${h}" class="${k===page?'active':''}">${t}</a>`).join('')}</nav>
    <div class="right">
      <a href="booking.html" class="btn btn-accent btn-hide-m" data-magnetic>Booker un artiste <span class="badge" data-sl-count>0</span></a>
      <button class="burger" aria-label="Menu"><span></span><span></span></button>
    </div>`;
  document.body.prepend(navEl);
  const mm = document.createElement('div');
  mm.className = 'mobile-menu';
  mm.innerHTML = `<div>${NAV.map(([h,t,k],i)=>`<a class="big" href="${h}"><small>0${i+1}</small>${t}</a>`+(k==='legend'?`<div class="mm-sub">${LEG.map(l=>`<a href="${l[1]}">${l[0]}</a>`).join('')}</div>`:'')).join('')}</div>
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
    lenis = new Lenis({lerp:.13, smoothWheel:true, wheelMultiplier:1.05, touchMultiplier:1.4});
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
  let navTick=false;
  window.addEventListener('scroll', ()=>{ if(!navTick){ navTick=true; requestAnimationFrame(()=>{ onScroll(); navTick=false; }); } }, {passive:true});

  /* ---------- cursor ---------- */
  const ring = $('.ring',cur), dot = $('.dot',cur), lbl = $('.lbl',cur);
  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  let curRun=false;
  const curLoop=()=>{ rx+=(mx-rx)*.22; ry+=(my-ry)*.22; const t=`translate3d(${rx}px,${ry}px,0)`; ring.style.transform=t; lbl.style.transform=t; if(Math.abs(mx-rx)+Math.abs(my-ry)>.3) requestAnimationFrame(curLoop); else curRun=false; };
  if (!isTouch) addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate3d(${mx}px,${my}px,0)`; if(!curRun){curRun=true;requestAnimationFrame(curLoop);} },{passive:true});
  else cur.style.display='none';
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

  /* ---------- prefetch internal pages ---------- */
  const pre=new Set();
  document.addEventListener('mouseover',e=>{const a=e.target.closest('a[href$=".html"],a[href*=".html?"]'); if(!a) return; const h=a.getAttribute('href'); if(pre.has(h)||/^https?:/.test(h)) return; pre.add(h); const l=document.createElement('link'); l.rel='prefetch'; l.href=h; document.head.appendChild(l);},{passive:true});

  /* ---------- page transitions ---------- */
  const curtain = $('.curtain');
  if (hasGSAP){
    if (sessionStorage.getItem('kol_vinyl_in') || sessionStorage.getItem('kol_vinyl_back')) gsap.set(curtain,{scaleY:0});
    else { gsap.set(curtain,{scaleY:1,transformOrigin:'top'}); gsap.to(curtain,{scaleY:0,duration:.75,ease:'expo.inOut'}); }
  } else curtain.style.transform='scaleY(0)';
  document.addEventListener('click',e=>{
    const a = e.target.closest('a');
    if (!a || a.target==='_blank' || e.metaKey || e.ctrlKey) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || /^https?:/.test(href)) return;
    e.preventDefault();
    document.documentElement.classList.remove('menu-open');
    if (hasGSAP){ gsap.set(curtain,{transformOrigin:'bottom'}); gsap.to(curtain,{scaleY:1,duration:.5,ease:'expo.in',onComplete:()=>location.href=href}); }
    else location.href = href;
  });

  /* ---------- spinning badge on inner heroes ---------- */
  $$('.phero').forEach(h=>{
    const b=document.createElement('div'); b.className='spin-badge';
    b.innerHTML=`<svg viewBox="0 0 200 200"><defs><path id="cp" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><text><textPath href="#cp">KoL Records ✦ Paris ✦ Label indépendant ✦ Booking ✦ </textPath></text></svg><img src="kol-logo.png" alt="">`;
    h.appendChild(b);
  });

  /* ---------- retour navigateur (page restaurée depuis le cache) : on nettoie les transitions ---------- */
  addEventListener('pageshow',e=>{ if(!e.persisted) return;
    if(hasGSAP){ gsap.killTweensOf(curtain); gsap.set(curtain,{scaleY:0}); } else curtain.style.transform='scaleY(0)';
    document.documentElement.classList.remove('menu-open','lenis-stopped'); if(window.__lenis) window.__lenis.start();
    const ov=document.getElementById('kolExit'); if(ov) ov.style.opacity='0'; });

  /* ---------- marquees: duplicate tracks ---------- */
  $$('.marquee').forEach(m=>{const t=$('.track',m); if(!t) return; for(let i=0;i<2;i++){const c=t.cloneNode(true);c.setAttribute('aria-hidden','true');m.appendChild(c);} });

  /* ---------- pause CSS animations hors écran ---------- */
  if ('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>es.forEach(en=>en.target.classList.toggle('is-off',!en.isIntersecting)),{rootMargin:'100px'});
    $$('.marquee,.hero-wall .col,.spin-badge').forEach(el=>io.observe(el));
  }

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
  window.KOL_TOAST = (html) => { let t=$('.toast'); if(!t){ t=document.createElement('div'); t.className='toast'; document.body.appendChild(t);} t.innerHTML=html; t.classList.add('on'); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove('on'),3200); };
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
        scrollTrigger: el.closest('.hero,.phero') ? null : {trigger:el,start:'top 88%',once:true}});
    });
    $$('.reveal').forEach(el=>{
      const inHero = !!el.closest('.hero,.phero,.lhero');
      gsap.to(el,{opacity:1,y:0,duration:1.1,ease:'expo.out',delay:(el.dataset.delay?+el.dataset.delay:0)+(inHero?.3:0),scrollTrigger: inHero ? null : {trigger:el,start:'top 95%',once:true}});
    });
    $$('[data-stagger]').forEach(g=>{
      const kids=[...g.children]; gsap.fromTo(kids,{opacity:0,y:50},{opacity:1,y:0,duration:1,ease:'expo.out',stagger:.06,immediateRender:false,clearProps:'transform,opacity',scrollTrigger:{trigger:g,start:'top 92%',once:true}});
      // filet de sécurité : si l'animation n'a pas tourné, on rend visible
      setTimeout(()=>{ if(g.getBoundingClientRect().top<innerHeight) kids.forEach(k=>{ if(getComputedStyle(k).opacity==='0'){ k.style.opacity=''; k.style.transform=''; } }); },2500);
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
      gsap.to(o,{v:end,duration:2,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 90%',once:true},onUpdate:()=>{el.textContent=o.v.toFixed(dec).replace('.',',')},onComplete:()=>{el.textContent=el.dataset.count.replace('.',',')}});
    });
    // parallax images
    $$('[data-parallax]').forEach(el=>{
      gsap.fromTo(el,{yPercent:-(+el.dataset.parallax||10)},{yPercent:+el.dataset.parallax||10,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:true}});
    });
    // carrousels glissables (sans blocage du scroll)
    $$('[data-hscroll]').forEach(sec=>{
      const row = $('.drag-row',sec) || sec; const prog = $('.row-prog i',sec);
      let down=false, sx=0, sl=0, moved=0, vx=0, lx=0, raf=null;
      const upd=()=>{ if(prog) prog.style.transform='scaleX('+Math.max(.08,(row.scrollLeft)/(row.scrollWidth-row.clientWidth||1))+')'; };
      row.addEventListener('scroll',upd,{passive:true}); upd();
      row.addEventListener('pointerdown',e=>{ if(e.pointerType!=='mouse') return; down=true; moved=0; sx=e.clientX; lx=e.clientX; sl=row.scrollLeft; vx=0; cancelAnimationFrame(raf); });
      addEventListener('pointermove',e=>{ if(!down) return; const dx=e.clientX-sx; moved=Math.max(moved,Math.abs(dx)); if(moved>5) row.classList.add('dragging'); row.scrollLeft=sl-dx; vx=e.clientX-lx; lx=e.clientX; });
      addEventListener('pointerup',()=>{ if(!down) return; down=false; setTimeout(()=>row.classList.remove('dragging'),30);
        let v=-vx*1.6; const glide=()=>{ row.scrollLeft+=v; v*=.93; if(Math.abs(v)>.5) raf=requestAnimationFrame(glide); }; glide(); });
      row.addEventListener('click',e=>{ if(moved>5){ e.preventDefault(); e.stopPropagation(); } },true);
      $$('[data-row]',sec).forEach(b=>b.addEventListener('click',()=>row.scrollBy({left:(+b.dataset.row)*row.clientWidth*.7,behavior:'smooth'})));
      gsap.from($$('.h-track > *',sec),{x:120,opacity:0,duration:1.2,ease:'expo.out',stagger:.07,scrollTrigger:{trigger:sec,start:'top 75%',once:true}});
    });
    // skew on velocity for marquees
    $$('.mq-band').forEach(b=>{
      const sk=gsap.quickTo(b,'skewY',{duration:.5,ease:'power3'});
      ScrollTrigger.create({trigger:b,onUpdate:s=>sk(gsap.utils.clamp(-3,3,s.getVelocity()/-400)),onLeave:()=>sk(0),onLeaveBack:()=>sk(0)});
    });
  }

  /* ---------- hover image list ---------- */
  window.KOL_floatList = function(list){
    if (isTouch) return;
    const fi = document.createElement('div'); fi.className='float-img'; fi.innerHTML='<div class="in"></div>'; document.body.appendChild(fi);
    const box = fi.firstChild;
    let fx=0,fy=0,cx=0,cy=0,run=false;
    const l=()=>{cx+=(fx-cx)*.14;cy+=(fy-cy)*.14;fi.style.transform=`translate3d(${cx}px,${cy}px,0)`; if(fi.classList.contains('on')||Math.abs(fx-cx)>.5) requestAnimationFrame(l); else run=false;};
    addEventListener('mousemove',e=>{fx=e.clientX;fy=e.clientY; if(!run&&fi.classList.contains('on')){run=true;requestAnimationFrame(l);}},{passive:true});
    $$('a[data-img]',list).forEach(a=>{ if(a.dataset.img){ const p=new Image(); p.src=a.dataset.img; }
      a.addEventListener('mouseenter',()=>{ if(!a.dataset.img) return; const im=new Image(); im.decoding='async'; im.src=a.dataset.img; box.appendChild(im); if(hasGSAP) gsap.from(im,{clipPath:'inset(100% 0 0 0)',duration:.6,ease:'expo.out'}); while(box.children.length>3) box.firstChild.remove(); fi.classList.add('on'); if(!run){run=true;requestAnimationFrame(l);} });
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
      .to(o,{v:100,duration:1.3,ease:'power3.inOut',onUpdate:()=>{cnt.textContent=String(Math.round(o.v)).padStart(3,'0');bar.style.transform=`scaleX(${o.v/100})`;}})
      .add(()=>{clearInterval(iv);nm.textContent='KoL Records';done();})
      .to(ld,{clipPath:'inset(0 0 100% 0)',duration:.8,ease:'expo.inOut'});
  }

  const start = () => { if (page==='home') preloader(init); else init(); };
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
  window.addEventListener('load',()=>hasGSAP && ScrollTrigger.refresh());
  document.addEventListener('DOMContentLoaded',()=>$$('img').forEach(i=>{i.decoding='async';}));
})();
