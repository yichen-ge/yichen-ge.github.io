// Reference background adapted from kiyotakali.github.io-master (MIT).
// Paper resources are configured on each static article's data attributes.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.publication-card').forEach(article => {
    const resources = [
      ['pdf', 'Paper', article.dataset.paperUrl?.trim(), 'fas fa-file-pdf'],
      ['code', 'Code', article.dataset.codeUrl?.trim(), 'fab fa-github']
    ].filter(([, , url]) => url);
    let group = article.querySelector('.publication-links');
    if (!resources.length) { group?.remove(); return; }
    if (!group) {
      group = document.createElement('div');
      (article.querySelector('.paper-box-text') || article).append(group);
    }
    group.className = 'paper-links publication-links';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', 'Paper resources');
    group.replaceChildren();
    resources.forEach(([kind, label, url, iconClass]) => {
      const link = document.createElement('a');
      link.className = `paper-link paper-link--${kind}`;
      link.href = url;
      const icon = document.createElement('i');
      icon.className = iconClass;
      icon.setAttribute('aria-hidden', 'true');
      const text = document.createElement('span');
      text.textContent = label;
      link.append(icon, text);
      group.append(link);
    });
  });
});
/**
 * Custom scripts for news toggle, publication filtering, sidebar pin, and nav close
 */

// Layered light field: quiet aurora, wave grid and a sparse constellation.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var canvas, ctx, t = 0;
  var TILE = 26, GAP = 1;
  var rafId = null;
  var lastDraw = 0;
  var FRAME_MS = 1000 / 24; // ~24 fps — smooth enough, half the CPU of 60 fps

  function glow(x, y, radius, rgb, opacity) {
    var light = ctx.createRadialGradient(x, y, 0, x, y, radius);
    light.addColorStop(0, 'rgba(' + rgb + ',' + opacity + ')');
    light.addColorStop(1, 'rgba(' + rgb + ',0)');
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function frame(ts) {
    rafId = requestAnimationFrame(frame);
    if (ts - lastDraw < FRAME_MS) return; // skip frame — throttle to 24 fps
    lastDraw = ts;

    var w = canvas.width, h = canvas.height;
    var cols = Math.ceil(w / TILE) + 1;
    var rows = Math.ceil(h / TILE) + 1;
    var pre  = 'rgba(38,88,155,';

    ctx.clearRect(0, 0, w, h);
    // Keep the bright areas near the edges so body text stays easy to read.
    glow(w * (.05 + .04 * Math.sin(t * .5)), h * .2, Math.max(w, h) * .55, '48,142,194', .11);
    glow(w * (.98 + .04 * Math.cos(t * .4)), h * .72, Math.max(w, h) * .5, '87,113,194', .10);
    glow(w * .7, h * (.05 + .04 * Math.sin(t * .35)), Math.max(w, h) * .35, '51,173,176', .065);

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        // Two crossing wave trains + a slow diagonal swell
        var wave = 0.6 * Math.sin(c * 0.21 + t * 0.36) * Math.sin(r * 0.17 + t * 0.28)
                 + 0.4 * Math.sin(c * 0.11 - r * 0.13 + t * 0.19);
        // A lighter grid leaves room for the light field and fine line work.
        var norm = (wave + 1) * 0.5;
        var v    = norm * norm * norm;
        var a    = Math.round((0.003 + v * 0.08) * 100) / 100;
        if (a < 0.01) continue;
        ctx.fillStyle = pre + a + ')';
        ctx.fillRect(c * TILE + GAP, r * TILE + GAP, TILE - GAP, TILE - GAP);
      }
    }

    // Three slow, thin wave fronts add depth without crossing text heavily.
    ctx.lineWidth = .8;
    for (var band = 0; band < 3; band++) {
      ctx.beginPath();
      for (var x = 0; x <= w + 12; x += 12) {
        var y = h * (.18 + band * .31) + Math.sin(x / 230 + t * .55 + band) * 24
              + Math.cos(x / 390 - t * .3) * 18;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(65,126,180,.10)';
      ctx.stroke();
    }

    // Deterministic point placement keeps resizing stable and avoids flicker.
    var count = w < 768 ? 16 : 30;
    var points = [];
    for (var i = 0; i < count; i++) {
      var px = ((i * .61803398875 + .13) % 1) * w + Math.sin(t * .35 + i) * 7;
      var py = ((i * .41421356237 + .19) % 1) * h + Math.cos(t * .3 + i * 2) * 7;
      points.push([px, py]);
      var pulse = .12 + .08 * (.5 + .5 * Math.sin(t * 1.2 + i));
      ctx.beginPath();
      ctx.arc(px, py, i % 5 === 0 ? 2 : 1.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(47,107,167,' + pulse + ')';
      ctx.fill();
    }
    ctx.lineWidth = .6;
    for (var n = 0; n < points.length; n++) {
      for (var m = n + 1; m < points.length; m++) {
        var dx = points[n][0] - points[m][0], dy = points[n][1] - points[m][1];
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 160) continue;
        ctx.strokeStyle = 'rgba(53,113,167,' + (.07 * (1 - distance / 160)) + ')';
        ctx.beginPath(); ctx.moveTo(points[n][0], points[n][1]);
        ctx.lineTo(points[m][0], points[m][1]); ctx.stroke();
      }
    }

    t += 0.007; // slow, calm wave speed
  }

  var resizeTimer;
  function resize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var newW = window.innerWidth;
      var newH = window.innerHeight;
      // Skip height-only changes ≤ 90px — those are caused by the mobile
      // address bar appearing/disappearing, not a real layout change.
      // Resetting canvas.height in that case blanks the canvas for one frame,
      // producing the visible "shake" on iOS Safari.
      if (newW === canvas.width && Math.abs(newH - canvas.height) <= 90) return;
      canvas.width  = newW;
      canvas.height = newH;
    }, 120);
  }

  // Pause animation when tab is hidden to save CPU/battery
  function onVisibilityChange() {
    if (document.hidden) {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    } else {
      if (!rafId) rafId = requestAnimationFrame(frame);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    canvas = document.createElement('canvas');
    canvas.id = 'ambient-background';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;' +
                           'z-index:0;pointer-events:none;will-change:transform;' +
                           '-webkit-backface-visibility:hidden;backface-visibility:hidden;';
    document.body.insertBefore(canvas, document.body.firstChild);
    ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibilityChange);
    rafId = requestAnimationFrame(frame);
  });
})();


// Keep section highlighting aligned with the current page and scroll position.
document.addEventListener('DOMContentLoaded', () => {
  const links = [...document.querySelectorAll('.site-nav__link')];
  const entries = links.map(link => {
    const url = new URL(link.href);
    return url.pathname === location.pathname && url.hash
      ? {link, section: document.getElementById(url.hash.slice(1))} : null;
  }).filter(entry => entry && entry.section);
  if (!entries.length) return;
  let scheduled = false;
  const update = () => {
    scheduled = false;
    let active = entries[0];
    for (const entry of entries) {
      if (entry.section.getBoundingClientRect().top <= 150) active = entry;
    }
    for (const link of links) {
      link.classList.toggle('nav-active', link === active.link);
      if (link === active.link) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }, {passive: true});
  update();
});

// Sidebar Pin — JS-based because CSS position:sticky is unreliable with the
// Susy float-based grid layout used by this theme.
(function () {
  var BREAKPOINT = 925;

  function pin() {
    if (window.innerWidth < BREAKPOINT) return;
    var sidebar = document.querySelector('.sidebar');
    if (!sidebar || sidebar.classList.contains('sidebar--pinned')) return;

    var masthead = document.querySelector('.masthead');
    var top = masthead ? Math.round(masthead.getBoundingClientRect().bottom) : 0;
    var rect = sidebar.getBoundingClientRect();

    // Spacer keeps the layout width occupied
    var spacer = document.createElement('div');
    spacer.className = 'sidebar-spacer';
    spacer.style.width = Math.round(rect.width) + 'px';
    spacer.style.flexShrink = '0';
    sidebar.parentNode.insertBefore(spacer, sidebar);

    sidebar.style.top = top + 'px';
    sidebar.style.left = Math.round(rect.left) + 'px';
    sidebar.style.width = Math.round(rect.width) + 'px';
    sidebar.classList.add('sidebar--pinned');
  }

  function unpin() {
    var sidebar = document.querySelector('.sidebar');
    var spacer = document.querySelector('.sidebar-spacer');
    if (sidebar) {
      sidebar.classList.remove('sidebar--pinned');
      sidebar.style.top = sidebar.style.left = sidebar.style.width = '';
    }
    if (spacer && spacer.parentNode) spacer.parentNode.removeChild(spacer);
  }

  document.addEventListener('DOMContentLoaded', function () {
    requestAnimationFrame(pin);
  });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    unpin();
    resizeTimer = setTimeout(function () { requestAnimationFrame(pin); }, 150);
  });
})();
