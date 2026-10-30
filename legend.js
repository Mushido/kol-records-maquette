/* KoL Legends — Snoop Dogg · animations cinématiques */
(function(){
  const $ = (s,c=document)=>c.querySelector(s);
  const $$ = (s,c=document)=>[...c.querySelectorAll(s)];

  const LD = window.LEGEND || {};
  const TL = LD.tl || [], D = LD.albums || [], S = LD.singles || [];
  window.KOL_TRACKS = LD.tracks || window.KOL_TRACKS || [];

  const splitChars = el => { const t = el.textContent; el.innerHTML = [...t].map(c => c===' ' ? ' ' : `<span class="ch">${c}</span>`).join(''); return $$('.ch',el); };
  const splitWords = el => {
    const walk = node => [...node.childNodes].forEach(n=>{
      if (n.nodeType===3){ const f=document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(p=>{ if(!p) return; if(/^\s+$/.test(p)) f.appendChild(document.createTextNode(p)); else { const s=document.createElement('span'); s.className='w'; s.textContent=p; f.appendChild(s);} }); node.replaceChild(f,n); }
      else if (n.nodeType===1) walk(n);
    });
    walk(el); return $$('.w',el);
  };

  document.addEventListener('DOMContentLoaded', () => {
    if (!window.gsap) { const g=$('#gate'); if(g) g.remove(); return; }
    const L = window.__lenis;
    const mobile = innerWidth < 800;
    const touch = matchMedia('(hover:none)').matches;

    /* ---------- flèche de sortie vers la page Légendes ---------- */
    const exitBtn=document.createElement('a'); exitBtn.className='lk-back'; exitBtn.href='legendes.html'; exitBtn.innerHTML='<i>←</i>Légendes'; exitBtn.setAttribute('aria-label','Retour aux légendes');
    const exitOv=document.createElement('div'); exitOv.id='kolExit';
    document.body.appendChild(exitOv); document.body.appendChild(exitBtn);
    const leave=()=>{ const me=location.pathname.split('/').pop()||'snoop-dogg.html'; sessionStorage.setItem('kol_vinyl_back',me); if(L) L.stop();
      const g=document.getElementById('gate'), gv2=document.getElementById('gVinyl');
      if(g && gv2){ const r=gv2.getBoundingClientRect(); const s=Math.hypot(innerWidth,innerHeight)*1.08/r.width;
        gsap.timeline({onComplete:()=>location.href='legendes.html'}).to('#gTitle, #enter, .g-top, .g-bot',{opacity:0,duration:.3}).to(gv2,{scale:s,duration:.8,ease:'expo.in',force3D:true},0).to(exitOv,{opacity:1,duration:.35},'-=.3'); }
      else gsap.to(exitOv,{opacity:1,duration:.45,ease:'power2.in',onComplete:()=>location.href='legendes.html'}); };
    exitBtn.addEventListener('click',e=>{ e.preventDefault(); e.stopPropagation(); leave(); },true);
    addEventListener('keydown',e=>{ if(e.key==='Escape' && document.getElementById('gate')) leave(); });

    /* ---------- build DOM ---------- */
    $('#tlTrack').innerHTML = TL.map(t=>`<div class="tlc"><div class="y">${t[0]}</div><div class="d">${t[1]}</div><h4>${t[2]}</h4><p>${t[3]}</p></div>`).join('');
    $('#cfStage').innerHTML = D.map((a,i)=>`<div class="cf-item" data-i="${i}" data-cursor="Écouter">
        <div class="vinyl disc"><div class="vl"><b style="font-size:12px">${a[1]}</b></div></div>
        <div class="sleeve" style="--c1:${a[5]};--c2:${a[6]};color:${a[7]}">${(window.KOL_ALBUMS&&window.KOL_ALBUMS[i]&&window.KOL_ALBUMS[i].cover)?`<img class="cv" src="${window.KOL_ALBUMS[i].cover}" alt="${a[0]}" loading="lazy" draggable="false">`:''}
          <span class="ar">Snoop Dogg</span>${a[3]?'<span class="st">★</span>':''}
          <span class="tt">${a[0]}</span><span class="yr">${a[1]}</span>
        </div><div class="refl" style="--c2:${a[6]}"></div></div>`).join('');
    $('#hymns').innerHTML = S.map((s,i)=>`<div class="hrow" data-i="${i}" data-cursor="Écouter" role="button" tabindex="0"><span class="n">${String(i+1).padStart(2,'0')}</span><span class="t">${s[0]}</span><span class="f">${s[1]&&s[1]!=='—'?s[1]+' · ':''}${s[2]}${s[4]?' · '+(LD.cert||'RIAA')+' '+s[4]:''}</span><span class="eq"><i></i><i></i><i></i><i></i><i></i></span><span class="pk">#${s[3]}<small>${LD.singlesChart||'Hot 100'}</small></span></div>`).join('');
    const titles = S.map(s=>s[0]);
    $('#hyRow').innerHTML = [...titles,...titles].map(t=>`<span>${t}</span>`).join('');

    /* ---------- progress + chapters ---------- */
    gsap.to('#lgProg',{scaleX:1,ease:'none',scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:.3}});
    const chNum=$('#chapter .num'), chLbl=$('#chapter .lbl2');
    let chCur=-1;
    const setChapter = (i,name) => {
      if (i===chCur) return; chCur=i;
      [ [chNum,String(i+1).padStart(2,'0')], [chLbl,name] ].forEach(([box,txt])=>{
        [...box.children].slice(0,-1).forEach(o=>{ gsap.killTweensOf(o); o.remove(); });
        const old=box.lastElementChild;
        const n=document.createElement('span'); n.textContent=txt; box.appendChild(n);
        gsap.fromTo(n,{yPercent:100},{yPercent:0,duration:.6,ease:'expo.out'});
        if(old) gsap.to(old,{yPercent:-100,duration:.6,ease:'expo.out',onComplete:()=>old.remove()});
      });
    };
    /* ---------- counters ---------- */
    $$('[data-cnt]').forEach(el=>{
      const end=parseFloat(el.dataset.cnt), dec=(el.dataset.cnt.split('.')[1]||'').length, o={v:0};
      gsap.to(o,{v:end,duration:2.2,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 75%',once:true},
        onUpdate:()=>el.textContent=o.v.toFixed(dec).replace('.',','),onComplete:()=>el.textContent=el.dataset.cnt.replace('.',',')});
    });

    /* ---------- HERO ---------- */
    const photo=$('#lhPhoto'), col=$('#lhCol');
    const words = $$('.lh-word'), hm=$$('.hm');
    gsap.set(photo,{clipPath:'inset(50% 50% 50% 50% round 10px)'});
    gsap.set(words,{yPercent:110,opacity:0});
    gsap.set(hm,{opacity:0,y:20});
    const spot={tx:50,ty:40,cx:50,cy:40,run:false,apply(){ col.style.setProperty('--x',this.cx+'%'); col.style.setProperty('--y',this.cy+'%'); }};
    const spotLoop=()=>{ spot.cx+=(spot.tx-spot.cx)*.18; spot.cy+=(spot.ty-spot.cy)*.18; spot.apply(); if(Math.abs(spot.tx-spot.cx)+Math.abs(spot.ty-spot.cy)>.1) requestAnimationFrame(spotLoop); else spot.run=false; };
    if (!touch){
      photo.addEventListener('mousemove',e=>{ const r=photo.getBoundingClientRect(); spot.tx=(e.clientX-r.left)/r.width*100; spot.ty=(e.clientY-r.top)/r.height*100; if(!spot.run){spot.run=true;requestAnimationFrame(spotLoop);} });
      photo.addEventListener('mouseenter',()=>photo.classList.add('hot'));
      photo.addEventListener('mouseleave',()=>photo.classList.remove('hot'));
    } else photo.addEventListener('click',()=>photo.classList.toggle('hot'));
    const heroIn = () => {
      const t=gsap.timeline();
      t.to(photo,{clipPath:'inset(0% 0% 0% 0% round 10px)',duration:1.6,ease:'expo.inOut'})
       .fromTo(photo.querySelectorAll('img'),{scale:1.35},{scale:1,duration:2,ease:'expo.out'},'<.2')
       .to('.lh-word.w1',{yPercent:0,opacity:1,duration:1.4,ease:'expo.out'},'<.3')
       .to('.lh-word.w2',{yPercent:0,opacity:1,duration:1.4,ease:'expo.out'},'<.12')
       .to(hm,{opacity:1,y:0,duration:1,stagger:.08,ease:'expo.out'},'<.5')
       .add(()=>{ spot.tx=56; spot.ty=32; spot.cx=56; spot.cy=32; spot.apply(); photo.classList.add('hot'); setTimeout(()=>{ if(!photo.matches(':hover')) photo.classList.remove('hot'); },1600); },'-=.4');
    };
    const heroST = {trigger:'.lh',start:'top top',end:'bottom top',scrub:.5};
    gsap.to('.lh-word.w1',{xPercent:-35,ease:'none',scrollTrigger:heroST});
    gsap.to('.lh-word.w2',{xPercent:35,ease:'none',scrollTrigger:{...heroST}});
    gsap.to(photo,{yPercent:18,scale:.82,rotate:-4,ease:'none',scrollTrigger:{...heroST}});
    gsap.to('.lh .hm',{opacity:0,ease:'none',scrollTrigger:{trigger:'.lh',start:'top top',end:'35% top',scrub:true}});

    /* ---------- GATE ---------- */
    const gate=$('#gate');
    if (gate){
      if (L) L.stop();
      document.documentElement.style.overflow='hidden';
      const gv=$('#gVinyl'), gChars=[]; $$('#gTitle > div').forEach(d=>{ const gold=d.classList.contains('gold-text'); d.classList.remove('gold-text'); splitChars(d).forEach(c=>{ if(gold) c.classList.add('gold-text'); gChars.push(c);}); });
      const fromVinyl = !!sessionStorage.getItem('kol_vinyl_in'); sessionStorage.removeItem('kol_vinyl_in');
      const gvR = gv.getBoundingClientRect(); const big = Math.hypot(innerWidth,innerHeight)*1.08/(gvR.width||1);
      gsap.timeline()
        .from(gv, fromVinyl ? {scale:big,duration:1.5,ease:'expo.out',force3D:true} : {scale:.2,opacity:0,rotate:-200,duration:1.8,ease:'expo.out'})
        .from(gChars,{yPercent:130,rotateX:-90,opacity:0,filter:'blur(12px)',duration:1.3,ease:'expo.out',stagger:.05},'<.3')
        .from('.g-top, .g-bot',{opacity:0,y:10,duration:.8},'<.6')
        .from('#enter',{opacity:0,y:20,duration:.8,ease:'expo.out'},'<.2');
      if(!touch) gate.addEventListener('mousemove',e=>{ gsap.to(gv,{x:(e.clientX/innerWidth-.5)*40,y:(e.clientY/innerHeight-.5)*40,duration:1,ease:'power3'}); gsap.to('#gTitle',{x:(e.clientX/innerWidth-.5)*-24,y:(e.clientY/innerHeight-.5)*-16,duration:1,ease:'power3'}); });
      const enter = () => {
        gate.style.pointerEvents='none';
        gsap.timeline({onComplete:()=>{ gate.remove(); document.documentElement.style.overflow=''; if(L) L.start(); ScrollTrigger.refresh(); }})
          .to(gChars,{yPercent:-130,opacity:0,duration:.6,ease:'expo.in',stagger:.02})
          .to('#enter, .g-top, .g-bot',{opacity:0,duration:.3},'<')
          .to(gv,{scale:9,duration:1.1,ease:'expo.in'},'<.2')
          .to(gate,{opacity:0,duration:.5},'-=.35')
          .add(heroIn,'-=.45');
      };
      $('#enter').addEventListener('click',enter);
      gv.addEventListener('click',enter);
      addEventListener('keydown',e=>{ if(e.key==='Enter' && document.body.contains(gate)) enter(); },{once:true});
    } else heroIn();

    /* ---------- ZOOM (sans blocage) ---------- */
    const zt=$('#zt'), zo=$('#zo');
    const setOrigin=()=>{ const s=gsap.getProperty(zt,'scale'); gsap.set(zt,{scale:1}); const a=zt.getBoundingClientRect(), b=zo.getBoundingClientRect(); zt.style.transformOrigin=`${b.left-a.left+b.width/2}px ${b.top-a.top+b.height*0.52}px`; gsap.set(zt,{scale:s}); };
    setOrigin(); ScrollTrigger.addEventListener('refreshInit',setOrigin);
    gsap.from(zt,{yPercent:50,opacity:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:'#zoom',start:'top 70%',once:true}});
    gsap.to(zt,{scale:mobile?14:18,ease:'power2.in',scrollTrigger:{trigger:'#zoom',start:'top top',end:'bottom top',scrub:true}});
    gsap.to('#zs',{opacity:0,y:40,ease:'none',scrollTrigger:{trigger:'#zoom',start:'top top',end:'30% top',scrub:true}});
    gsap.to('.zoom .zbg',{opacity:1,ease:'none',scrollTrigger:{trigger:'#zoom',start:'top 60%',end:'top top',scrub:true}});

    /* ---------- STACK ---------- */
    const cards=$$('.scard');
    cards.forEach((c,i)=>{
      const next=cards[i+1]; if(!next) return;
      const ov=document.createElement('i'); ov.className='dim'; c.appendChild(ov);
      const st={trigger:next,start:'top bottom',end:'top top',scrub:true};
      gsap.fromTo(c,{scale:1},{scale:.9,ease:'none',scrollTrigger:st});
      gsap.fromTo(ov,{opacity:0},{opacity:.6,ease:'none',scrollTrigger:{...st}});
    });
    cards.forEach(c=>{ gsap.from(c.querySelectorAll('.k,.lab,.src'),{y:40,opacity:0,stagger:.08,duration:1,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 60%',once:true}});
      gsap.from(c.querySelector('.ghost'),{xPercent:30,ease:'none',scrollTrigger:{trigger:c,start:'top bottom',end:'top top',scrub:true}}); });

    /* ---------- BIO ---------- */
    const bc=document.createElement('i'); bc.className='cover'; $('#bioPic').appendChild(bc);
    gsap.fromTo(bc,{scaleY:1},{scaleY:0,ease:'none',scrollTrigger:{trigger:'#bioPic',start:'top 90%',end:'top 25%',scrub:true}});
    gsap.fromTo('#bioPic img',{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:'.lbio',start:'top bottom',end:'bottom top',scrub:true}});
    const bw=[]; $$('#bioTxt p').forEach(p=>bw.push(...splitWords(p)));
    gsap.to(bw,{opacity:1,stagger:.05,ease:'none',scrollTrigger:{trigger:'#bioTxt',start:'top 70%',end:'bottom 55%',scrub:true}});
    const q=$('#qText'); q.classList.remove('gold-text'); q.style.color='var(--gold)';
    gsap.from(splitChars(q),{yPercent:80,rotate:12,opacity:0,stagger:.018,duration:1,ease:'expo.out',scrollTrigger:{trigger:'#lquote',start:'top 70%',once:true}});

    /* ---------- TIMELINE verticale (sans blocage) ---------- */
    const rail=$('#rail');
    gsap.fromTo(rail,{scaleY:0},{scaleY:1,ease:'none',scrollTrigger:{trigger:'#tlTrack',start:'top 60%',end:'bottom 60%',scrub:true}});
    $$('.tlc').forEach(c=>ScrollTrigger.create({trigger:c,start:'top 62%',toggleClass:{targets:c,className:'on'}}));
    $$('.tlc').forEach((c,i)=>gsap.from(c,{x:(i%2?60:-60),opacity:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}}));

    /* ---------- COVERFLOW ---------- */
    const items=$$('.cf-item'), n=items.length, discs=items.map(i=>i.querySelector('.disc'));
    const cfT=$('#cfTitle'), cfTags=$('#cfTags'), cfCnt=$('#cfCnt'), cfBar=$('#cfBar');
    let cur=-1;
    const info=i=>{ if(i===cur) return; cur=i; const a=D[i];
      cfT.textContent=a[0]; cfCnt.innerHTML=String(i+1).padStart(2,'0')+'<small> / '+n+'</small>';
      cfTags.innerHTML=`<span>${a[1]}</span><span>${LD.chart||'Billboard 200'} · ${a[2]==='—'?'non classé':'n°'+a[2]}</span>${a[4]?`<span class="g">${LD.cert||'RIAA'} ${a[4]}</span>`:''}${a[3]?'<span>★ Album majeur</span>':''}`;
      gsap.fromTo([cfT,cfTags],{y:24,opacity:0},{y:0,opacity:1,duration:.5,ease:'expo.out',stagger:.05,overwrite:true});
    };
    const sp=mobile?120:250, sp2=mobile?55:115;
    const render=p=>{
      items.forEach((el,i)=>{
        const d=i-p, ad=Math.abs(d), s=Math.sign(d);
        const x=s*(ad<1?ad*sp:sp+(ad-1)*sp2), ry=-Math.max(-1,Math.min(1,d))*55, z=-Math.min(ad,1)*240-ad*30, a=Math.max(0,1-ad*1.4);
        el.style.transform=`translate3d(${x}px,0,${z}px) rotateY(${ry}deg)`;
        el.style.zIndex=200-Math.round(ad*10);
        el.style.opacity=ad>6.5?0:1;
        discs[i].style.transform=`translateX(${a*55}%) rotate(${a*220+p*30}deg)`;
      });
      info(Math.round(p));
    };
    render(0);
    const state={p:0}; let target=0, auto=null, inView=false;
    const go=i=>{ target=Math.max(0,Math.min(n-1,i)); gsap.to(state,{p:target,duration:1,ease:'expo.out',overwrite:true,onUpdate:()=>{render(state.p); cfBar.style.transform=`scaleX(${state.p/(n-1)})`;}}); };
    const stopAuto=()=>{ clearInterval(auto); auto=null; };
    const startAuto=()=>{ if(auto) return; auto=setInterval(()=>go(target>=n-1?0:target+1),3200); };
    $('#cfPrev').addEventListener('click',()=>{stopAuto();go(target-1);});
    $('#cfNext').addEventListener('click',()=>{stopAuto();go(target+1);});
    items.forEach((el,i)=>el.addEventListener('click',()=>{ if(dragMoved) return; stopAuto(); go(i); }));
    window.__cfTarget=()=>target;
    addEventListener('keydown',e=>{ if(!inView) return; if(e.key==='ArrowRight'){stopAuto();go(target+1);} if(e.key==='ArrowLeft'){stopAuto();go(target-1);} });
    // glisser (souris / doigt)
    const stage=$('#cfStage'); let dx0=null, p0=0, dragMoved=false;
    stage.addEventListener('pointerdown',e=>{ dx0=e.clientX; p0=state.p; dragMoved=false; stopAuto(); gsap.killTweensOf(state); });
    addEventListener('pointermove',e=>{ if(dx0===null) return; const d=(dx0-e.clientX)/(mobile?140:220); if(Math.abs(dx0-e.clientX)>6) dragMoved=true; state.p=Math.max(0,Math.min(n-1,p0+d)); render(state.p); cfBar.style.transform=`scaleX(${state.p/(n-1)})`; },{passive:true});
    addEventListener('pointerup',()=>{ if(dx0===null) return; dx0=null; go(Math.round(state.p)); setTimeout(()=>dragMoved=false,50); });
    ScrollTrigger.create({trigger:'#cf',start:'top 70%',end:'bottom 30%',onToggle:s=>{ inView=s.isActive; s.isActive?startAuto():stopAuto(); }});
    gsap.from('#cf .head',{y:40,opacity:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:'#cf',start:'top 60%',once:true}});

    /* ---------- SINGLES ---------- */
    gsap.fromTo('#hyRow',{xPercent:0},{xPercent:-35,ease:'none',scrollTrigger:{trigger:'.hy-mq',start:'top bottom',end:'bottom top',scrub:.4}});
    $$('.hrow').forEach((r,i)=>gsap.from(r,{x:i%2?90:-90,opacity:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:r,start:'top 92%',once:true}}));

    /* ---------- EXPAND ---------- */
    const xpChars=splitChars($('#xpH')); $('#xpH').style.overflow='hidden';
    gsap.set('#xpCap .k, #xpCap p',{opacity:0,y:20}); gsap.set(xpChars,{yPercent:110});
    const xpST={trigger:'#xp',start:'top 85%',end:'top 5%',scrub:true};
    gsap.fromTo('#xpIm',{scaleX:.4,scaleY:.56,borderRadius:'40px'},{scaleX:1,scaleY:1,borderRadius:'0px',ease:'none',scrollTrigger:xpST});
    gsap.fromTo('#xpIm img',{scaleX:1.9,scaleY:1.35},{scaleX:1,scaleY:1,ease:'none',scrollTrigger:{...xpST}});
    gsap.to('#xpSide span:first-child',{xPercent:-160,opacity:0,ease:'none',scrollTrigger:{...xpST}});
    gsap.to('#xpSide span:last-child',{xPercent:160,opacity:0,ease:'none',scrollTrigger:{...xpST}});
    gsap.timeline({scrollTrigger:{trigger:'#xp',start:'top 25%',once:true}})
      .to(xpChars,{yPercent:0,stagger:.04,duration:.9,ease:'expo.out'})
      .to('#xpCap .k, #xpCap p',{opacity:1,y:0,duration:.7,stagger:.1,ease:'expo.out'},'<.3');

    /* ---------- MOMENT CARDS tilt ---------- */
    if(!touch) $$('.mcard').forEach(c=>{
      c.addEventListener('mousemove',e=>{ const r=c.getBoundingClientRect(), x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
        c.style.transform=`rotateX(${(.5-y)*10}deg) rotateY(${(x-.5)*12}deg)`; c.style.setProperty('--mx',x*100+'%'); c.style.setProperty('--my',y*100+'%'); });
      c.addEventListener('mouseleave',()=>{ c.style.transform=''; });
    });

    /* ---------- LISTEN ---------- */
    const lv=$('#lVinyl');
    ScrollTrigger.create({trigger:'#listen',start:'top 65%',end:'bottom 20%',onToggle:s=>{ $('#listen').classList.toggle('playing',s.isActive); }});
    gsap.from(lv,{scale:.6,rotate:-120,opacity:0,duration:1.6,ease:'expo.out',scrollTrigger:{trigger:'#listen',start:'top 75%',once:true}});

    /* ---------- GALLERY ---------- */
    $$('#pgal .colm').forEach(c=>gsap.fromTo(c,{yPercent:-(+c.dataset.speed)},{yPercent:+c.dataset.speed,ease:'none',scrollTrigger:{trigger:'#pgal',start:'top bottom',end:'bottom top',scrub:true}}));
    $$('#pgal figure').forEach(f=>{ const fc=document.createElement('i'); fc.className='cover'; f.appendChild(fc); gsap.to(fc,{scaleY:0,duration:1.4,ease:'expo.inOut',scrollTrigger:{trigger:f,start:'top 88%',once:true}});
      gsap.to(f.querySelector('img'),{scale:1,duration:1.8,ease:'expo.out',scrollTrigger:{trigger:f,start:'top 88%',once:true}}); });

    /* ---------- CTA ---------- */
    gsap.fromTo('#ctaMq',{xPercent:10},{xPercent:-30,ease:'none',scrollTrigger:{trigger:'.lcta',start:'top bottom',end:'bottom top',scrub:true}});

    const chSecs=$$('[data-chapter]'); let chTick=false;
    let chTops=[]; const chMeasure=()=>{ chTops=chSecs.map(s=>s.getBoundingClientRect().top+scrollY); }; ScrollTrigger.addEventListener('refresh',chMeasure); chMeasure();
    const chUpd=()=>{ chTick=false; const y=scrollY+innerHeight*.55; let idx=0; chTops.forEach((t,i)=>{ if(t<y) idx=i; }); setChapter(idx,chSecs[idx].dataset.chapter); };
    addEventListener('scroll',()=>{ if(!chTick){ chTick=true; requestAnimationFrame(chUpd);} },{passive:true});
    /* ---------- LECTEUR partagé (titres + albums) ---------- */
    const dock=$('#dock'), rows=$$('.hrow'); let ctrl=null, pending=null, curUri=null;
    const fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
    const highlight=(uri,on)=>{
      rows.forEach((r,k)=>r.classList.toggle('playing',on&&uri==='spotify:track:'+window.KOL_TRACKS[k]));
      $$('.ap-tr').forEach(t=>t.classList.toggle('playing',on&&t.dataset.uri===uri));
      const ab=$('#apPlay'); if(ab) ab.classList.toggle('playing',on&&!!ab.dataset.uri&&curUri===ab.dataset.uri);
    };
    const playUri=(uri,title)=>{
      if(curUri===uri && ctrl){ ctrl.togglePlay(); return; }
      curUri=uri; $('#dockTitle').textContent=title; dock.classList.add('on');
      if(!ctrl){ pending=uri; return; }
      ctrl.loadUri(uri); setTimeout(()=>ctrl.play(),350); highlight(uri,true);
    };
    const initSpotify = API => {
      API.createController($('#dockEmbed'),{uri:LD.artistUri||('spotify:track:'+window.KOL_TRACKS[0]),width:'100%',height:80},c=>{
        ctrl=c;
        c.addListener('playback_update',e=>{ const p=!e.data.isPaused; dock.classList.toggle('playing',p); highlight(e.data.playingURI||curUri,p); });
        c.addListener('ready',()=>{ if(pending){ c.loadUri(pending); setTimeout(()=>c.play(),350); pending=null; } });
      });
    };
    if (window.__SPOTIFY_API) initSpotify(window.__SPOTIFY_API); else document.addEventListener('spotify-ready',()=>initSpotify(window.__SPOTIFY_API),{once:true});
    rows.forEach((r,i)=>{
      r.addEventListener('click',()=>playUri('spotify:track:'+window.KOL_TRACKS[i],S[i][0]));
      r.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); r.click(); } });
    });
    $('#dockClose').addEventListener('click',()=>{ if(ctrl) ctrl.pause(); dock.classList.remove('on','playing'); highlight(null,false); curUri=null; });

    /* ---------- PANNEAU ALBUM (tracklist + écoute) ---------- */
    const AL=window.KOL_ALBUMS||[], ap=$('#albumPanel'), apBox=$('#apBox');
    const openAlbum=i=>{
      const a=AL[i], m=D[i]; if(!a) return;
      apBox.style.setProperty('--ac',a.color||'#2a2a2a');
      $('#apCover').src=a.cover; $('#apCover').alt=a.name;
      $('#apYear').textContent=m[1]+' · '+a.tracks.length+' titres · '+Math.round(a.tracks.reduce((s,t)=>s+t[2],0)/60)+' min';
      $('#apTitle').textContent=a.name;
      $('#apTags').innerHTML=`<span>${LD.chart||'Billboard 200'} · ${m[2]==='—'?'non classé':'n°'+m[2]}</span>${m[4]?`<span class="g">${LD.cert||'RIAA'} ${m[4]}</span>`:''}${m[3]?'<span>★ Album majeur</span>':''}`;
      const au='spotify:album:'+a.id; $('#apPlay').dataset.uri=au; $('#apPlay').onclick=()=>playUri(au,a.name);
      $('#apSpot').href='https://open.spotify.com/album/'+a.id;
      $('#apList').innerHTML=a.tracks.map((t,k)=>`<li class="ap-tr" data-uri="spotify:track:${t[1]}" tabindex="0"><span class="n">${String(k+1).padStart(2,'0')}</span><span class="tt"><b>${t[0]}</b><small>${t[3]}</small></span><span class="eq"><i></i><i></i><i></i><i></i></span><span class="du">${fmt(t[2])}</span></li>`).join('');
      $$('.ap-tr',ap).forEach((li,k)=>{ li.onclick=()=>playUri(li.dataset.uri,a.tracks[k][0]); li.onkeydown=e=>{ if(e.key==='Enter'){ li.click(); } }; });
      highlight(curUri,dock.classList.contains('playing'));
      ap.classList.add('on'); if(L) L.stop();
      gsap.fromTo(apBox,{xPercent:100},{xPercent:0,duration:.8,ease:'expo.out'});
      gsap.fromTo('#apCoverWrap',{scale:.7,rotate:-8,opacity:0},{scale:1,rotate:0,opacity:1,duration:1,ease:'expo.out',delay:.15});
      gsap.fromTo('#apDisc',{xPercent:0,rotate:0},{xPercent:48,rotate:200,duration:1.4,ease:'expo.out',delay:.45});
      gsap.fromTo('.ap-tr',{y:24,opacity:0},{y:0,opacity:1,duration:.6,ease:'expo.out',stagger:.025,delay:.3});
    };
    const closeAlbum=()=>{ if(!ap.classList.contains('on')) return; gsap.to(apBox,{xPercent:100,duration:.5,ease:'expo.in',onComplete:()=>{ ap.classList.remove('on'); if(L) L.start(); }}); };
    $('#apClose').addEventListener('click',closeAlbum);
    ap.addEventListener('click',e=>{ if(e.target===ap) closeAlbum(); });
    addEventListener('keydown',e=>{ if(e.key==='Escape') closeAlbum(); });
    items.forEach((el,i)=>el.addEventListener('click',()=>{ if(dragMoved) return; if(i!==target) setTimeout(()=>openAlbum(i),450); else openAlbum(i); }));
    $('#cfOpen').addEventListener('click',()=>{ stopAuto(); openAlbum(target); });

    ScrollTrigger.sort(); ScrollTrigger.refresh();
    addEventListener('load',()=>ScrollTrigger.refresh());
  });
})();
