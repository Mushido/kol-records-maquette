/* KoL — Affiche d'événement générée en direct
   KOL_POSTER.render(el, data) / KOL_POSTER.download(data)
   data = { names:[...], event, date, city, venue } */
(function(){
  const all = () => [...(window.KOL ? KOL.roster : []), ...(window.KOL ? KOL.legends : [])];
  const find = n => all().find(a => a.n === n);
  const esc = s => String(s || '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const fmtDate = d => { if (!d) return ''; const x = new Date(d + 'T12:00:00'); return isNaN(x) ? d : x.toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long', year:'numeric' }); };

  function render(el, data){
    const names = data.names || [];
    const head = names[0], second = names.slice(1, 4), third = names.slice(4);
    const hi = head && find(head) && find(head).img;
    const prev = el.dataset.sig || '';
    const sig = JSON.stringify([names, data.event, data.date, data.city, data.venue]);
    if (prev === sig) return; el.dataset.sig = sig;
    const headSize = head ? Math.max(14, Math.min(26, 150 / Math.max(5, head.length))) : 16;
    el.innerHTML = `
      <div class="pst-bg">${hi ? `<img src="${hi}" alt="" crossorigin="anonymous">` : ''}</div>
      <div class="pst-in">
        <div class="pst-top"><span>KoL Records présente</span><span>${esc(data.city || 'Votre ville')}</span></div>
        <div class="pst-ev">${esc(data.event || 'Votre événement')}</div>
        <div class="pst-date">${esc(fmtDate(data.date) || 'Date à définir')}${data.venue ? ' · ' + esc(data.venue) : ''}</div>
        <div class="pst-lineup">
          ${head ? `<div class="pst-h" style="font-size:${headSize}cqw">${esc(head)}</div>` : `<div class="pst-empty">Ajoutez des artistes<br>pour composer l’affiche</div>`}
          ${second.length ? `<div class="pst-s">${second.map(esc).join('<i>✦</i>')}</div>` : ''}
          ${third.length ? `<div class="pst-t">${third.map(esc).join(' · ')}</div>` : ''}
        </div>
        <div class="pst-bot"><span>Booking · KoL Records</span><span>Maquette d’affiche</span></div>
      </div>`;
    if (window.gsap) gsap.from(el.querySelectorAll('.pst-ev,.pst-date,.pst-h,.pst-s,.pst-t,.pst-empty'), { y: 18, opacity: 0, duration: .6, ease: 'expo.out', stagger: .05 });
  }

  async function download(data){
    const W = 1200, H = 1600, c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
    try { await document.fonts.load('100px Anton'); await document.fonts.load('italic 60px "Instrument Serif"'); } catch(e){}
    const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1a140a'); g.addColorStop(1, '#060606'); x.fillStyle = g; x.fillRect(0, 0, W, H);
    const names = data.names || [], head = names[0], hi = head && find(head) && find(head).img;
    if (hi) {
      try {
        const im = new Image(); im.crossOrigin = 'anonymous'; im.src = hi; await im.decode();
        const r = Math.max(W / im.width, H * .72 / im.height), iw = im.width * r, ih = im.height * r;
        x.save(); x.globalAlpha = .55; x.filter = 'grayscale(1) contrast(1.1)'; x.drawImage(im, (W - iw) / 2, 0, iw, ih); x.restore();
        const f = x.createLinearGradient(0, H * .25, 0, H * .78); f.addColorStop(0, 'rgba(6,6,6,0)'); f.addColorStop(1, 'rgba(6,6,6,1)'); x.fillStyle = f; x.fillRect(0, 0, W, H);
      } catch(e){}
    }
    x.fillStyle = '#d6b46a'; x.font = '600 26px "Inter Tight", sans-serif'; x.textBaseline = 'top';
    x.fillText('KOL RECORDS PRÉSENTE', 70, 70); x.textAlign = 'right'; x.fillText(String(data.city || 'VOTRE VILLE').toUpperCase(), W - 70, 70); x.textAlign = 'center';
    x.fillStyle = '#efeae0'; x.font = 'italic 92px "Instrument Serif", serif'; x.fillText(data.event || 'Votre événement', W / 2, 150, W - 140);
    x.fillStyle = '#d6b46a'; x.font = '500 30px "Inter Tight", sans-serif';
    x.fillText(((fmtDate(data.date) || 'Date à définir') + (data.venue ? ' · ' + data.venue : '')).toUpperCase(), W / 2, 270, W - 140);
    let y = 1040;
    if (head) { let fs = 240; x.font = fs + 'px Anton'; while (x.measureText(head.toUpperCase()).width > W - 120 && fs > 80) { fs -= 8; x.font = fs + 'px Anton'; } x.fillStyle = '#efeae0'; x.fillText(head.toUpperCase(), W / 2, y); y += fs + 40; }
    const s = names.slice(1, 4); if (s.length) { let fs = 84; x.font = fs + 'px Anton'; const t = s.join('  ✦  ').toUpperCase(); while (x.measureText(t).width > W - 120 && fs > 40) { fs -= 4; x.font = fs + 'px Anton'; } x.fillStyle = '#d6b46a'; x.fillText(t, W / 2, y); y += fs + 30; }
    const t3 = names.slice(4); if (t3.length) { x.font = '44px Anton'; x.fillStyle = '#cfc9bd'; x.fillText(t3.join(' · ').toUpperCase(), W / 2, y, W - 120); }
    x.fillStyle = 'rgba(239,234,224,.6)'; x.font = '500 22px "Inter Tight", sans-serif'; x.textAlign = 'left'; x.fillText('BOOKING · KOL RECORDS · KOLRECORDS.COM', 70, H - 90); x.textAlign = 'right'; x.fillText('MAQUETTE D’AFFICHE', W - 70, H - 90);
    try {
      const a = document.createElement('a'); a.download = 'affiche-' + (data.event || 'evenement').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.png'; a.href = c.toDataURL('image/png'); a.click();
    } catch(e){ alert('Téléchargement impossible : une image n’autorise pas l’export.'); }
  }
  window.KOL_POSTER = { render, download };
})();
