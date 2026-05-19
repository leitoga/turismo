// =============================================
// banners.js v4 — Home referencia IDs de paquetes
// =============================================
const STORAGE_KEY = "hv_banners_v4";

async function cargarBanners() {
  const local = localStorage.getItem(STORAGE_KEY);
  if (local) {
    const data = JSON.parse(local);
    // Validar estructura correcta
    if (data.paquetes && Array.isArray(data.paquetes) &&
        data.home && data.home.slider && data.home.banners) {
      return data;
    }
    localStorage.removeItem(STORAGE_KEY);
  }
  const res = await fetch("data/banners.json");
  const data = await res.json();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

function guardarBanners(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getBanners() {
  const local = localStorage.getItem(STORAGE_KEY);
  return local ? JSON.parse(local) : { home: { slider: [], banners: [] }, paquetes: [] };
}

// Obtener paquete por ID
function getPaqueteById(id) {
  const data = getBanners();
  return data.paquetes.find(b => b.id === id) || null;
}

// Resolver IDs de home a objetos paquete
function resolverHome(data) {
  const find = id => data.paquetes.find(p => p.id === id) || null;
  return {
    slider: data.home.slider.map(find).filter(Boolean),
    banners: data.home.banners.map(find).filter(Boolean)
  };
}
