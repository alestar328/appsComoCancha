#!/usr/bin/env node
'use strict';

/**
 * Fase 1 — Descubrimiento y calificacion de prospectos.
 *
 * Busca negocios por rubro y distrito con Google Places API (New), los
 * clasifica segun su presencia web y les asigna un puntaje. No envia nada a
 * nadie: solo consulta y escribe archivos locales.
 *
 *   node tools/prospector/buscar.js --rubro "pollerías" --distrito "Los Olivos"
 *   node tools/prospector/buscar.js --rubro "chifas" --distrito "Comas,Ate" --min-resenas 100
 */

const fs = require('fs');
const path = require('path');

const ENDPOINT = 'https://places.googleapis.com/v1/places:searchText';

// Los campos pedidos determinan el SKU que cobra Google: telefono y web suben
// la busqueda al tier Enterprise. Pedir menos abarata, pero sin la web no hay
// nada que calificar.
const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.nationalPhoneNumber',
  'places.websiteUri',
  'places.rating',
  'places.userRatingCount',
  'places.primaryTypeDisplayName',
  'places.businessStatus',
  'places.googleMapsUri',
  'places.location',
  'nextPageToken',
].join(',');

// Un "sitio web" que en realidad es una red social: el negocio ya invirtio en
// presencia digital y choco con el limite de la plataforma.
const REDES = [
  'facebook.com', 'fb.com', 'fb.me', 'instagram.com', 'tiktok.com',
  'linktr.ee', 'beacons.ai', 'wa.me', 'api.whatsapp.com',
  'twitter.com', 'x.com', 'youtube.com',
];

// Presencia alquilada a un tercero: reservas, delivery, directorios, o el sitio
// gratuito de Google Business. Mismo dolor que las redes, y mas facil de
// argumentar porque suelen pagar comision por cada pedido.
const PLATAFORMAS = [
  'mesa247.pe', 'opentable.com', 'tripadvisor.com', 'tripadvisor.com.pe',
  'pedidosya.com.pe', 'rappi.com.pe', 'didi-food.com', 'ubereats.com',
  'business.site', 'negocio.site', 'sites.google.com',
  'wixsite.com', 'blogspot.com', 'wordpress.com',
];

// Sucursales de cadena: tienen web corporativa aunque Google no la vincule a
// esta ficha, y las decisiones no se toman en el local. Falsos positivos.
//
// Van como regex y no como subcadenas porque en Peru varios nombres de marca
// coinciden con vocabulario del rubro: "a la leña" y "a la brasa" son metodos
// de coccion que aparecen en decenas de nombres independientes. Por eso "La
// Leña" se ancla al inicio del nombre.
const CADENAS = [
  /\bnorky'?s?\b/i,
  /\broky'?s?\b/i,
  /\bpardos\b/i,
  /\bbembos\b/i,
  /\bkfc\b/i,
  /\bpopeyes\b/i,
  /\bchina wok\b/i,
  /\bpapa john/i,
  /\bdomino'?s\b/i,
  /\bpizza hut\b/i,
  /\br[uú]stica\b/i,
  /\bchili'?s\b/i,
  /\bdon belisario\b/i,
  /\bvilla chicken\b/i,
  /\bprimos chicken\b/i,
  /\botto grill\b/i,
  /^la le[nñ]a(\s|$)/i,
  /\bmcdonald/i,
  /\bburger king\b/i,
  /\bstarbucks\b/i,
  /\btanta\b/i,
  /\bsegundo muelle\b/i,
  /\bpunto azul\b/i,
  /\bembarcadero 41\b/i,
  /\bla panka\b/i,
  /\bdelicass\b/i,
];

function cargarEnv() {
  const candidatos = [
    path.join(process.cwd(), '.env.local'),
    path.join(__dirname, '..', '..', '.env.local'),
  ];
  for (const p of candidatos) {
    if (!fs.existsSync(p)) continue;
    for (const linea of fs.readFileSync(p, 'utf8').split('\n')) {
      const m = linea.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
    return p;
  }
  return null;
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (!argv[i].startsWith('--')) continue;
    const clave = argv[i].slice(2);
    const sig = argv[i + 1];
    if (sig === undefined || sig.startsWith('--')) {
      args[clave] = true;
    } else {
      args[clave] = sig;
      i += 1;
    }
  }
  return args;
}

function clasificar(websiteUri) {
  if (!websiteUri) return 'sin-web';
  let host;
  try {
    host = new URL(websiteUri).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return 'sin-web';
  }
  const coincide = (lista) => lista.some((d) => host === d || host.endsWith(`.${d}`));
  if (coincide(REDES)) return 'solo-redes';
  if (coincide(PLATAFORMAS)) return 'web-de-terceros';
  return 'con-web';
}

// Peru: el movil son 9 digitos empezando en 9, el fijo de Lima es (01) + 7.
// Solo el movil admite WhatsApp, que es el canal que convierte en Lima.
function canalDeContacto(telefono) {
  const d = String(telefono || '').replace(/\D/g, '').replace(/^51/, '');
  if (!d) return 'ninguno';
  if (d.length === 9 && d.startsWith('9')) return 'whatsapp';
  return 'llamada';
}

function esCadena(nombre) {
  return CADENAS.some((re) => re.test(nombre));
}

/**
 * Puntaje 0-90. Pondera tres cosas: cuanto duele el problema que resolvemos,
 * si el negocio tiene con que pagar, y si podemos alcanzarlo por WhatsApp.
 */
function puntuar(lead) {
  if (lead.cadena === 'si') return 0;           // la decision no esta en el local

  const base = { 'sin-web': 40, 'web-de-terceros': 32, 'solo-redes': 28, 'con-web': 5 };
  let p = base[lead.clasificacion] ?? 0;

  // Las resenas son el mejor proxy de volumen de clientes. Escala logaritmica:
  // 100 resenas suman ~20, 1000 suman ~30. El salto de 0 a 100 vale mucho mas
  // que el de 1000 a 2000.
  const resenas = Number(lead.resenas) || 0;
  p += Math.min(30, Math.round(Math.log10(resenas + 1) * 10));

  const rating = Number(lead.rating) || 0;
  if (resenas >= 50 && rating >= 4.0) p += 10;
  else if (resenas >= 50 && rating < 3.5) p -= 10;  // su problema no es la web

  if (lead.canal === 'whatsapp') p += 10;
  else if (lead.canal === 'ninguno') p -= 10;

  return Math.max(0, p);
}

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

async function buscarPagina(apiKey, textQuery, pageToken) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': FIELD_MASK,
    },
    body: JSON.stringify({
      textQuery,
      languageCode: 'es',
      regionCode: 'PE',
      pageSize: 20,
      ...(pageToken ? { pageToken } : {}),
    }),
  });

  const cuerpo = await res.json().catch(() => ({}));

  if (!res.ok) {
    const e = new Error(cuerpo?.error?.message || `HTTP ${res.status}`);
    e.status = res.status;
    throw e;
  }
  return cuerpo;
}

async function buscarDistrito(apiKey, rubro, distrito, maxResultados) {
  const query = `${rubro} en ${distrito}, Lima, Peru`;
  const encontrados = [];
  let pageToken;
  let llamadas = 0;

  // Text Search entrega como mucho 60 resultados: 3 paginas de 20.
  do {
    const data = await buscarPagina(apiKey, query, pageToken);
    llamadas += 1;

    for (const p of data.places || []) {
      const lead = {
        id: p.id,
        nombre: p.displayName?.text || '',
        rubro: p.primaryTypeDisplayName?.text || rubro,
        distrito,
        direccion: p.formattedAddress || '',
        telefono: p.nationalPhoneNumber || '',
        canal: canalDeContacto(p.nationalPhoneNumber),
        web: p.websiteUri || '',
        clasificacion: clasificar(p.websiteUri),
        cadena: esCadena(p.displayName?.text || '') ? 'si' : 'no',
        rating: p.rating ?? '',
        resenas: p.userRatingCount ?? '',
        estado: p.businessStatus || '',
        maps: p.googleMapsUri || '',
        lat: p.location?.latitude ?? '',
        lng: p.location?.longitude ?? '',
      };
      lead.puntaje = puntuar(lead);
      encontrados.push(lead);
    }

    pageToken = data.nextPageToken;
    if (pageToken && encontrados.length < maxResultados) await espera(1500);
  } while (pageToken && encontrados.length < maxResultados);

  return { encontrados: encontrados.slice(0, maxResultados), llamadas };
}

function aCSV(filas) {
  if (filas.length === 0) return '';
  const cols = Object.keys(filas[0]);
  const escapar = (v) => {
    const s = String(v ?? '');
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [
    cols.join(','),
    ...filas.map((f) => cols.map((c) => escapar(f[c])).join(',')),
  ].join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help || !args.rubro || !args.distrito) {
    console.log(`
Fase 1 — Descubrimiento y calificacion de prospectos

  --rubro             Categoria a buscar. Obligatorio.   Ej: "pollerías"
  --distrito          Uno o varios separados por coma.   Ej: "Los Olivos,Comas"
  --max               Maximo por distrito (default 60, tope duro de Google)
  --min-resenas       Descarta los que tengan menos. Default 0.
  --min-puntaje       Descarta los que puntuen menos. Default 0.
  --incluir-cadenas   Conserva sucursales de cadena (por defecto se descartan)
  --incluir-cerrados  Conserva los no operativos (por defecto se descartan)
  --out               Nombre base de los archivos de salida

Ejemplo:
  node tools/prospector/buscar.js --rubro "chifas" --distrito "Comas,Ate" --min-resenas 100
`);
    process.exit(args.help ? 0 : 1);
  }

  const envUsado = cargarEnv();
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error('Falta GOOGLE_MAPS_API_KEY.');
    console.error(envUsado ? `Revisado: ${envUsado}` : 'No se encontro ningun .env.local');
    console.error('Agregala como GOOGLE_MAPS_API_KEY="..." y vuelve a correr.');
    process.exit(1);
  }

  const rubro = String(args.rubro);
  const distritos = String(args.distrito).split(',').map((d) => d.trim()).filter(Boolean);
  const max = Math.min(Number(args.max) || 60, 60);
  const minResenas = Number(args['min-resenas']) || 0;
  const minPuntaje = Number(args['min-puntaje']) || 0;

  const vistos = new Set();
  const leads = [];
  const descartes = { cadena: 0, cerrado: 0, resenas: 0, puntaje: 0, duplicado: 0 };
  let llamadasTotales = 0;

  for (const distrito of distritos) {
    process.stdout.write(`Buscando "${rubro}" en ${distrito}... `);
    try {
      const { encontrados, llamadas } = await buscarDistrito(apiKey, rubro, distrito, max);
      llamadasTotales += llamadas;
      let nuevos = 0;

      for (const lead of encontrados) {
        if (vistos.has(lead.id)) { descartes.duplicado += 1; continue; }
        vistos.add(lead.id);

        if (!args['incluir-cadenas'] && lead.cadena === 'si') { descartes.cadena += 1; continue; }
        if (!args['incluir-cerrados'] && lead.estado !== 'OPERATIONAL') { descartes.cerrado += 1; continue; }
        if ((Number(lead.resenas) || 0) < minResenas) { descartes.resenas += 1; continue; }
        if (lead.puntaje < minPuntaje) { descartes.puntaje += 1; continue; }

        leads.push(lead);
        nuevos += 1;
      }
      console.log(`${encontrados.length} resultados, ${nuevos} aceptados`);
    } catch (err) {
      console.log('ERROR');
      console.error(`  ${err.message}`);
      if (err.status === 403) {
        console.error('  -> La API key no tiene habilitada Places API (New), o su restriccion la bloquea.');
      } else if (err.status === 400) {
        console.error('  -> Peticion rechazada: revisa el field mask o el formato de la consulta.');
      } else if (err.status === 429) {
        console.error('  -> Cuota agotada. Espera o revisa los limites en Google Cloud.');
      }
    }
  }

  if (leads.length === 0) {
    console.log('\nSin resultados que pasen los filtros. Nada que escribir.');
    return;
  }

  leads.sort((a, b) => b.puntaje - a.puntaje || (Number(b.resenas) || 0) - (Number(a.resenas) || 0));

  const fecha = new Date().toISOString().slice(0, 10);
  const base = args.out
    ? String(args.out)
    : `${rubro}-${distritos.join('_')}-${fecha}`.replace(/[^\w\-_.]/g, '_');
  const dir = path.join(__dirname, 'salida');
  fs.mkdirSync(dir, { recursive: true });

  const rutaCsv = path.join(dir, `${base}.csv`);
  const rutaJson = path.join(dir, `${base}.json`);
  fs.writeFileSync(rutaCsv, '﻿' + aCSV(leads), 'utf8');  // BOM: Excel lee bien las tildes
  fs.writeFileSync(rutaJson, JSON.stringify(leads, null, 2), 'utf8');

  const cuenta = (campo, valor) => leads.filter((l) => l[campo] === valor).length;
  const descartados = Object.values(descartes).reduce((a, b) => a + b, 0);

  console.log(`
--- Resumen ---
Aceptados              ${leads.length}
  sin-web              ${cuenta('clasificacion', 'sin-web')}\t<- no existe fuera de Maps
  web-de-terceros      ${cuenta('clasificacion', 'web-de-terceros')}\t<- presencia alquilada, paga comision
  solo-redes           ${cuenta('clasificacion', 'solo-redes')}\t<- depende de Facebook / Instagram
  con-web              ${cuenta('clasificacion', 'con-web')}\t<- pasan a fase 2 para medirlos

Canal de contacto
  WhatsApp (movil)     ${cuenta('canal', 'whatsapp')}
  Llamada (fijo)       ${cuenta('canal', 'llamada')}
  Sin telefono         ${cuenta('canal', 'ninguno')}

Puntaje 60+            ${leads.filter((l) => l.puntaje >= 60).length}
Puntaje 70+            ${leads.filter((l) => l.puntaje >= 70).length}

Descartados            ${descartados}  (cadenas ${descartes.cadena}, cerrados ${descartes.cerrado}, duplicados ${descartes.duplicado}, pocas resenas ${descartes.resenas}, bajo puntaje ${descartes.puntaje})
Llamadas a la API      ${llamadasTotales}

CSV   ${rutaCsv}
JSON  ${rutaJson}
`);
}

main().catch((err) => {
  console.error(`\nFallo inesperado: ${err.message}`);
  process.exit(1);
});
