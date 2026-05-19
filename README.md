# Agencia de Viajes

Sitio web estático para una agencia de viajes. Frontend en HTML/CSS/JS vanilla con datos en JSON y panel de administración.

## Estructura

```
.
├── index.html          → Home con slider + grid de destinos destacados
├── paquetes.html       → Catálogo con filtros (categoría, precio, incluye)
├── producto.html       → Detalle de paquete (hero, qué incluye, itinerario, galería)
├── admin.html          → Panel de administración (login: admin / viajes2025)
├── css/
│   ├── style.css       → Estilos generales
│   ├── producto.css    → Estilos del detalle de producto
│   └── admin.css       → Estilos del panel admin
├── js/
│   └── banners.js      → Carga y persistencia de paquetes (localStorage)
├── data/
│   └── banners.json    → Datos iniciales de paquetes
└── img/
    └── logo.png        → Logo del sitio
```

## Uso

Para correr localmente necesitás un servidor estático (no abrir con file://, porque `fetch()` no funciona con archivos locales):

```bash
# Con Python
python3 -m http.server 8000

# Con Node
npx serve

# Con PHP
php -S localhost:8000
```

Abrir http://localhost:8000

## Admin

- URL: `admin.html`
- Usuario: `admin`
- Contraseña: `viajes2025`

Los cambios se guardan en `localStorage` del navegador. Para resetear: botón "↺ Resetear" en el topbar.

## Deploy

El sitio es 100% estático, podés subirlo tal cual a:
- GitHub Pages
- Netlify
- Vercel
- Cualquier hosting estático
