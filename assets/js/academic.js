/* Theme support without the template's unused chart and jQuery bundle. */
(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch (_) { /* The page also works when browser storage is unavailable. */ }

  const applyTheme = () => {
    const dark = preference ? preference === 'dark' : systemTheme.matches;
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(dark));
      toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    if (icon) icon.className = dark ? 'fas fa-moon' : 'fas fa-sun';
    const color = document.querySelector('meta[name="theme-color"]');
    if (color) color.content = dark ? '#171d27' : '#fbfaf8';
  };

  applyTheme();
  systemTheme.addEventListener('change', applyTheme);
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      preference = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', preference); } catch (_) {}
      applyTheme();
    });
  });
})();
