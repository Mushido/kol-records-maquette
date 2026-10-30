/* KoL — lecteur Spotify partagé (dock flottant)
   KOL_PLAY(uri, titre, sousTitre) : lance un artiste / album / titre Spotify.
   Événement 'kol:playing' { uri, playing } pour synchroniser l'interface. */
(function(){
  window.onSpotifyIframeApiReady = function(API){ window.__SPOTIFY_API = API; document.dispatchEvent(new Event('spotify-ready')); };
  const s = document.createElement('script'); s.src = 'https://open.spotify.com/embed/iframe-api/v1'; s.async = true; document.head.appendChild(s);

  let ctrl = null, pending = null, cur = null, dock;
  const emit = (uri, playing) => document.dispatchEvent(new CustomEvent('kol:playing', { detail: { uri, playing } }));

  function build(){
    dock = document.createElement('div');
    dock.className = 'kdock';
    dock.innerHTML = `<div class="kdock-top"><div class="kdisc"></div><div class="kdock-t"><small>En écoute</small><b>—</b></div><button class="kdock-x" aria-label="Fermer le lecteur">×</button></div><div class="kdock-embed"></div>`;
    document.body.appendChild(dock);
    dock.querySelector('.kdock-x').addEventListener('click', () => { if (ctrl) ctrl.pause(); dock.classList.remove('on','playing'); emit(cur, false); cur = null; });
    const init = API => API.createController(dock.querySelector('.kdock-embed'), { uri: 'spotify:artist:7hJcb9fa4alzcOq3EaNPoG', width: '100%', height: 80 }, c => {
      ctrl = c;
      c.addListener('playback_update', e => { const p = !e.data.isPaused; dock.classList.toggle('playing', p); emit(cur, p); });
      c.addListener('ready', () => { if (pending) { c.loadUri(pending); setTimeout(() => c.play(), 350); pending = null; } });
    });
    if (window.__SPOTIFY_API) init(window.__SPOTIFY_API); else document.addEventListener('spotify-ready', () => init(window.__SPOTIFY_API), { once: true });
  }

  window.KOL_PLAY = (uri, title, sub) => {
    if (!dock) build();
    if (cur === uri && ctrl) { ctrl.togglePlay(); return; }
    cur = uri;
    dock.querySelector('.kdock-t b').textContent = title;
    dock.querySelector('.kdock-t small').textContent = sub || 'En écoute';
    dock.classList.add('on');
    emit(uri, true);
    if (!ctrl) { pending = uri; return; }
    ctrl.loadUri(uri); setTimeout(() => ctrl.play(), 350);
  };
  window.KOL_CURRENT = () => cur;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
