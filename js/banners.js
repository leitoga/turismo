// =============================================
// banners.js v4 — Home referencia IDs de paquetes
// =============================================
const STORAGE_KEY = "hv_banners_v4";

// Items por defecto si los datos viejos no tienen items_incluye
const ITEMS_INCLUYE_DEFAULT = [
  {id: "vuelo_internacional", label: "Vuelo internacional"},
  {id: "vuelo_cabotaje", label: "Vuelo de cabotaje"},
  {id: "traslado_aeropuerto", label: "Traslado aeropuerto/hotel"},
  {id: "transporte_ciudades", label: "Transporte entre ciudades"},
  {id: "hotel", label: "Hotel"},
  {id: "desayuno", label: "Régimen de desayuno"},
  {id: "media_pension", label: "Media pensión (desayuno + cena)"},
  {id: "pension_completa", label: "Pensión completa"},
  {id: "all_inclusive", label: "All inclusive"},
  {id: "excursiones", label: "Excursiones incluidas"},
  {id: "guia_espanol", label: "Guía en español"},
  {id: "entradas_atracciones", label: "Entradas a atracciones"},
  {id: "seguro_viaje", label: "Seguro de viaje"},
  {id: "asistencia_24hs", label: "Asistencia al viajero 24hs"},
  {id: "gestion_visa", label: "Gestión de visa"},
  {id: "documentacion", label: "Documentación de viaje"}
];

function normalizarDatos(data) {
  if (!data.items_incluye || !Array.isArray(data.items_incluye) || data.items_incluye.length === 0) {
    data.items_incluye = ITEMS_INCLUYE_DEFAULT.map(x => ({...x}));
  }
  // Garantizar 4 slots en slider y 6 en banners
  if (data.home && Array.isArray(data.home.slider)) {
    while (data.home.slider.length < 4) data.home.slider.push('');
  }
  if (data.home && Array.isArray(data.home.banners)) {
    while (data.home.banners.length < 6) data.home.banners.push('');
  }
  return data;
}

async function cargarBanners() {
  const local = localStorage.getItem(STORAGE_KEY);
  if (local) {
    const data = JSON.parse(local);
    // Validar estructura correcta
    if (data.paquetes && Array.isArray(data.paquetes) &&
        data.home && data.home.slider && data.home.banners) {
      return normalizarDatos(data);
    }
    localStorage.removeItem(STORAGE_KEY);
  }
  const res = await fetch("data/banners.json");
  const data = normalizarDatos(await res.json());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

function guardarBanners(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getBanners() {
  const local = localStorage.getItem(STORAGE_KEY);
  return local ? normalizarDatos(JSON.parse(local)) : { home: { slider: [], banners: [] }, paquetes: [], items_incluye: ITEMS_INCLUYE_DEFAULT.map(x => ({...x})) };
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

// Devuelve los items que están efectivamente tildados como "incluye"
// en al menos un paquete (los chips del filtro de la web)
function getItemsIncluyeEnUso(data) {
  const usados = new Set();
  (data.paquetes || []).forEach(p => {
    (p.incluye || []).forEach(id => usados.add(id));
  });
  return (data.items_incluye || []).filter(it => usados.has(it.id));
}

// Mapa id → label, para producto.html
function getLabelsIncluye(data) {
  const map = {};
  (data.items_incluye || []).forEach(it => { map[it.id] = it.label; });
  return map;
}
