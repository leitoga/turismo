# Agencia de Viajes — Demo con 3 diseños

Sitio web estático con panel de administración y 3 diseños visuales intercambiables.

## Estructura

```
.
├── index.html             → Home
├── paquetes.html          → Catálogo con filtros
├── producto.html          → Detalle de paquete
├── admin.html             → Panel de administración
├── presupuesto.html       → Página de planes/precios
├── css/
│   ├── style-1.css        → Diseño 1 — Nómade
│   ├── style-2.css        → Diseño 2 — Wayfar
│   ├── style-3.css        → Diseño 3 — Escape
│   ├── producto.css       → Estilos detalle (común)
│   └── admin.css          → Estilos del admin (Apple-style)
├── js/
│   ├── banners.js
│   └── theme-switcher.js  → Barra de cambio de diseño
├── data/banners.json
└── img/logo.png
```

## Uso local

```bash
python3 -m http.server 8000
# o
npx serve
```

## Admin

`admin.html` → usuario `admin` / contraseña `viajes2025`

## Para producción

Cuando elijas un diseño definitivo, comentá `<script src="js/theme-switcher.js">` en los HTMLs y borrá los CSS que no uses.

## Deploy

100% estático: GitHub Pages, Netlify, Vercel, etc.
