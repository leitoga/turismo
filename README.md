# Agencia de Viajes — Demo con 3 diseños

Sitio web estático para una agencia de viajes con panel de administración y 3 diseños visuales intercambiables.

## Estructura

```
.
├── index.html             → Home (cambia según diseño)
├── paquetes.html          → Catálogo con filtros
├── producto.html          → Detalle de paquete
├── admin.html             → Panel de administración
├── presupuesto.html       → Página de presupuesto / planes
├── css/
│   ├── style-1.css        → Diseño 1 — Nómade (editorial · navy + teal + crema)
│   ├── style-2.css        → Diseño 2 — Wayfar (cosmic · dark + púrpura · orbital)
│   ├── style-3.css        → Diseño 3 — Escape (light · púrpura · collage)
│   ├── producto.css       → Estilos del detalle (común)
│   └── admin.css          → Estilos del panel admin (Apple-style)
├── js/
│   ├── banners.js         → Carga y persistencia de paquetes
│   └── theme-switcher.js  → Barra de cambio de diseño (demo)
├── data/
│   └── banners.json       → Datos iniciales de paquetes
└── img/
    └── logo.png
```

## Uso

Necesitás un servidor estático (no `file://`):

```bash
python3 -m http.server 8000
# o
npx serve
```

Abrir http://localhost:8000

## Admin

- URL: `admin.html`
- Usuario: `admin`
- Contraseña: `viajes2025`

### Funciones
- **🏠 Home** — asignar paquetes al slider y banners destacados
- **📦 Paquetes** — crear/editar/eliminar paquetes
- **🏷️ Ítems** — gestionar servicios (incluye/no incluye)

## Switcher de diseño

La barra fija arriba permite cambiar entre los 3 diseños y ver el presupuesto. Para producción, **comentá** la línea `<script src="js/theme-switcher.js"></script>` en los HTMLs y borrá los CSS que no uses.

## Deploy

100% estático. Subilo a GitHub Pages, Netlify, Vercel o cualquier hosting.
