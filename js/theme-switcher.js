// Theme switcher — barra demo para alternar entre diseños
(function() {
  const DESIGNS = [
    { id: 1, file: 'css/style-1.css', label: 'Diseño 1', subtitle: 'Nómade', enabled: true },
    { id: 2, file: 'css/style-2.css', label: 'Diseño 2', subtitle: 'Wayfar', enabled: true },
    { id: 3, file: 'css/style-3.css', label: 'Diseño 3', subtitle: 'Escape', enabled: true },
    { id: 4, label: 'Presupuesto', subtitle: 'Inversión', enabled: true, link: 'presupuesto.html' },
  ];
  const STORAGE_KEY = 'tw_design';
  const LINK_ID = 'theme-css';

  function getActive() {
    // Si estamos en la página de presupuesto, marcar la opción 4 activa
    if (location.pathname.endsWith('presupuesto.html')) {
      return DESIGNS.find(d => d.id === 4);
    }
    const saved = parseInt(localStorage.getItem(STORAGE_KEY)) || 1;
    return DESIGNS.find(d => d.id === saved && d.enabled) || DESIGNS[0];
  }

  function setTheme(id) {
    const d = DESIGNS.find(x => x.id === id);
    if (!d || !d.enabled) return;
    // Si es un link, navegar
    if (d.link) {
      window.location.href = d.link;
      return;
    }
    // Si estamos en presupuesto.html y elegimos un diseño, volver al sitio
    if (location.pathname.endsWith('presupuesto.html')) {
      localStorage.setItem(STORAGE_KEY, id);
      window.location.href = 'index.html';
      return;
    }
    const link = document.getElementById(LINK_ID);
    if (link && d.file) link.href = d.file;
    localStorage.setItem(STORAGE_KEY, id);
    document.documentElement.dataset.theme = id;
    render();
  }

  function render() {
    const active = getActive();
    const bar = document.getElementById('theme-switcher-bar');
    if (!bar) return;
    bar.innerHTML = `
      <div class="ts-inner">
        <span class="ts-label">DEMO</span>
        ${DESIGNS.map(d => `
          <button class="ts-btn ${d.id === active.id ? 'active' : ''} ${!d.enabled ? 'disabled' : ''}"
                  ${!d.enabled ? 'disabled' : ''}
                  onclick="__themeSwitcher(${d.id})">
            <span class="ts-btn-label">${d.label}</span>
            <span class="ts-btn-sub">${d.subtitle}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  function mount() {
    // Asegurar que el link al CSS de tema existe (solo si NO estamos en presupuesto)
    const inPresupuesto = location.pathname.endsWith('presupuesto.html');
    if (!inPresupuesto) {
      let link = document.getElementById(LINK_ID);
      if (!link) {
        link = document.createElement('link');
        link.id = LINK_ID;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      const active = getActive();
      if (active.file) link.href = active.file;
      document.documentElement.dataset.theme = active.id;
    }

    // Barra
    if (!document.getElementById('theme-switcher-bar')) {
      const bar = document.createElement('div');
      bar.id = 'theme-switcher-bar';
      document.body.insertBefore(bar, document.body.firstChild);
    }
    render();
  }

  // Estilos de la barra (inyectados, no dependen del tema)
  const style = document.createElement('style');
  style.textContent = `
    /* La barra ocupa una franja fija arriba; el resto del contenido baja */
    html { padding-top: 44px; }
    body { position: relative; }
    /* Headers fixed con top:0 hay que correrlos abajo de la barra */
    header.header { top: 44px !important; }

    #theme-switcher-bar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 9999;
      height: 44px;
      background: rgba(15, 23, 35, 0.92);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 4px 24px rgba(0,0,0,0.18);
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
    }
    .ts-inner { display: flex; align-items: center; gap: 4px; }
    .ts-label {
      font-size: 9px;
      letter-spacing: 0.22em;
      color: rgba(255,255,255,0.5);
      padding: 0 14px 0 4px;
      font-weight: 700;
    }
    .ts-btn {
      background: transparent;
      border: none;
      color: rgba(255,255,255,0.72);
      padding: 5px 14px;
      border-radius: 999px;
      cursor: pointer;
      font-family: inherit;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
      transition: all 0.18s ease;
      line-height: 1.15;
    }
    .ts-btn:hover:not(.disabled):not(.active) {
      background: rgba(255,255,255,0.08);
      color: #fff;
    }
    .ts-btn.active {
      background: #fff;
      color: #0F2A3F;
    }
    .ts-btn.disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .ts-btn-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.01em;
    }
    .ts-btn-sub {
      font-size: 9px;
      opacity: 0.7;
      font-weight: 400;
      letter-spacing: 0.04em;
    }
    @media (max-width: 640px) {
      html { padding-top: 38px; }
      header.header { top: 38px !important; }
      #theme-switcher-bar { height: 38px; padding: 0 0.5rem; }
      .ts-label { display: none; }
      .ts-btn { padding: 4px 9px; }
      .ts-btn-sub { display: none; }
      .ts-btn-label { font-size: 10px; }
    }
  `;
  document.head.appendChild(style);

  // Exponer la función para los onclick
  window.__themeSwitcher = setTheme;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
