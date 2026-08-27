#!/usr/bin/env node
'use strict';

/**
 * Fase 1 — Descubrimiento de prospectos.
 *
 * Busca negocios por rubro y distrito con Google Places API (New) y los
 * clasifica segun su presencia web. No envia nada a nadie: solo consulta y
 * escribe archivos locales.
 *
 *   node tools/prospector/buscar.js --rubro "restaurantes" --distrito "Miraflores"
 *   node tools/prospector/buscar.js --rubro "dentistas" --distrito "San Isidro,Surco"
 */

const fs = require('fs');
const path = require('path');

const ENDPOINT = 'https://places.googleapis.com/v1/places:searchText';

// Los campos pedidos determinan el SKU que cobra Google: telefono y web suben
// la busqueda al tier Pro. Pedir menos campos abarata, pero sin la web no hay
// nada que calificar en la fase 2.
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

// Un "sitio web" que en realidad es una red social es el mejor prospecto que
// existe para nosotros: el negocio ya invirtio en presencia digital y choco
// con el limite de la plataforma.
const REDES = [
  'facebook.com', 'fb.com', 'fb.me', 'instagram.com', 'tiktok.com',
  'linktr.ee', 'beacons.ai', 'wa.me', 'api.whatsapp.com',
  'twitter.com', 'x.com', 'youtube.com', 'business.site',
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
  const esRed = REDES.some((r) => host === r || host.endsWith(`.${r}`));
  return esRed ? 'solo-redes' : 'con-web';
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
      encontrados.push({
        id: p.id,
        nombre: p.displayName?.text || '',
        rubro: p.primaryTypeDisplayName?.text || rubro,
        distrito,
        direccion: p.formattedAddress || '',
        telefono: p.nationalPhoneNumber || '',
        web: p.websiteUri || '',
        clasificacion: clasificar(p.websiteUri),
        rating: p.rating ?? '',
        resenas: p.userRatingCount ?? '',
        estado: p.businessStatus || '',
        maps: p.googleMapsUri || '',
        lat: p.location?.latitude ?? '',
        lng: p.location?.longitude ?? '',
      });
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
Fase 1 — Descubrimiento de prospectos

  --rubro     Categoria a buscar. Obligatorio.   Ej: "restaurantes"
  --distrito  Uno o varios separados por coma.   Ej: "Miraflores,San Isidro"
  --max       Maximo por distrito (default 60, tope duro de Google)
  --out       Nombre base de los archivos de salida

Ejemplo:
  node tools/prospector/buscar.js --rubro "dentistas" --distrito "San Isidro,Surco"
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

  const vistos = new Set();
  const leads = [];
  let llamadasTotales = 0;

  for (const distrito of distritos) {
    process.stdout.write(`Buscando "${rubro}" en ${distrito}... `);
    try {
      const { encontrados, llamadas } = await buscarDistrito(apiKey, rubro, distrito, max);
      llamadasTotales += llamadas;
      let nuevos = 0;
      for (const lead of encontrados) {
        if (vistos.has(lead.id)) continue;   // los distritos limitrofes se solapan
        vistos.add(lead.id);
        leads.push(lead);
        nuevos += 1;
      }
      console.log(`${encontrados.length} resultados, ${nuevos} nuevos`);
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
    console.log('\nSin resultados. Nada que escribir.');
    return;
  }

  // Los mejores prospectos primero: sin web, luego solo redes, y dentro de cada
  // grupo los de mas resenas, que son negocios activos con clientes reales.
  const orden = { 'sin-web': 0, 'solo-redes': 1, 'con-web': 2 };
  leads.sort((a, b) => {
    const d = orden[a.clasificacion] - orden[b.clasificacion];
    return d !== 0 ? d : (Number(b.resenas) || 0) - (Number(a.resenas) || 0);
  });

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

  const cuenta = (c) => leads.filter((l) => l.clasificacion === c).length;
  const conTelefono = leads.filter((l) => l.telefono).length;

  console.log(`
--- Resumen ---
Total de negocios      ${leads.length}
  sin-web              ${cuenta('sin-web')}\t<- pitch: "no apareces en Google"
  solo-redes           ${cuenta('solo-redes')}\t<- pitch: "dependes de Facebook"
  con-web              ${cuenta('con-web')}\t<- pasan a fase 2 para medirlos
Con telefono           ${conTelefono}
Llamadas a la API      ${llamadasTotales}

CSV   ${rutaCsv}
JSON  ${rutaJson}
`);
}

main().catch((err) => {
  console.error(`\nFallo inesperado: ${err.message}`);
  process.exit(1);
});
