#!/usr/bin/env node
'use strict';

/**
 * Fase 2 — Medicion y evidencia.
 *
 * Toma un archivo de la fase 1 y audita los sitios de los leads que tienen web
 * propia: si responden, si usan HTTPS, si estan preparados para movil, y que
 * tan rapido cargan segun PageSpeed Insights.
 *
 * El resultado es un diagnostico concreto y verificable por prospecto, que es
 * lo que separa un mensaje util de un correo generico.
 *
 *   node tools/prospector/medir.js --archivo salida/chifas-Comas-2026-08-27.json
 *   node tools/prospector/medir.js --archivo salida/x.json --sin-psi
 */

const fs = require('fs');
const path = require('path');

const PSI = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const UA = 'Mozilla/5.0 (compatible; ProspectorBot/1.0; auditoria de sitio)';
const UA_NAVEGADOR = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
  + '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const TIMEOUT_HTTP = 15000;
const TIMEOUT_PSI = 90000;

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
    if (sig === undefined || sig.startsWith('--')) args[clave] = true;
    else { args[clave] = sig; i += 1; }
  }
  return args;
}

async function conTimeout(url, opciones, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...opciones, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

/**
 * Revision directa del sitio. No cuesta nada y encuentra lo mas vendible:
 * dominios vencidos, sitios caidos y paginas sin viewport movil.
 */
async function pedir(url, userAgent) {
  return conTimeout(url, {
    redirect: 'follow',
    headers: { 'User-Agent': userAgent, 'Accept': 'text/html,*/*' },
  }, TIMEOUT_HTTP);
}

async function revisarSitio(url) {
  const r = {
    httpEstado: '', httpsOk: 'no', tiempoMs: '', tieneViewport: '',
    urlFinal: '', error: '', bloqueado: 'no',
  };

  const inicio = Date.now();
  try {
    let res = await pedir(url, UA);

    // 401/403/429 casi nunca significan sitio roto: son CDN o WAF rechazando a
    // un cliente desconocido. Un navegador real si pasa, asi que reintentamos
    // con UA de Chrome antes de concluir nada. Afirmar "su web esta caida"
    // cuando el dueño la abre y funciona destruye la credibilidad del mensaje.
    if ([401, 403, 429].includes(res.status)) {
      res = await pedir(url, UA_NAVEGADOR);
      if ([401, 403, 429].includes(res.status)) r.bloqueado = 'si';
    }

    r.tiempoMs = Date.now() - inicio;
    r.httpEstado = res.status;
    r.urlFinal = res.url || url;
    r.httpsOk = r.urlFinal.startsWith('https://') ? 'si' : 'no';

    if (res.ok) {
      // Solo el inicio del HTML: el <meta viewport> va en el <head>.
      const html = (await res.text()).slice(0, 200000);
      r.tieneViewport = /<meta[^>]+name=["']?viewport/i.test(html) ? 'si' : 'no';
    }
  } catch (err) {
    r.tiempoMs = Date.now() - inicio;
    r.error = err.name === 'AbortError' ? 'timeout' : (err.cause?.code || err.message);
    r.httpEstado = 'sin-respuesta';
  }
  return r;
}

async function medirPSI(url, apiKey) {
  const r = { psiMovil: '', psiLcpSeg: '', psiCls: '', cruxLcpSeg: '', psiError: '' };
  const q = new URLSearchParams({ url, strategy: 'mobile', category: 'performance' });
  if (apiKey) q.set('key', apiKey);

  try {
    const res = await conTimeout(`${PSI}?${q}`, {}, TIMEOUT_PSI);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      r.psiError = data?.error?.message || `HTTP ${res.status}`;
      return r;
    }

    const cat = data?.lighthouseResult?.categories?.performance;
    if (typeof cat?.score === 'number') r.psiMovil = Math.round(cat.score * 100);

    const lcp = data?.lighthouseResult?.audits?.['largest-contentful-paint']?.numericValue;
    if (typeof lcp === 'number') r.psiLcpSeg = (lcp / 1000).toFixed(1);

    const cls = data?.lighthouseResult?.audits?.['cumulative-layout-shift']?.numericValue;
    if (typeof cls === 'number') r.psiCls = cls.toFixed(2);

    // CrUX: datos de usuarios reales, mas persuasivos que el laboratorio.
    const crux = data?.loadingExperience?.metrics?.LARGEST_CONTENTFUL_PAINT_MS?.percentile;
    if (typeof crux === 'number') r.cruxLcpSeg = (crux / 1000).toFixed(1);
  } catch (err) {
    r.psiError = err.name === 'AbortError' ? 'timeout' : err.message;
  }
  return r;
}

/**
 * Traduce las mediciones a una frase concreta que se pueda poner en un mensaje.
 * El orden importa: primero lo mas grave y mas facil de demostrar.
 */
function diagnosticar(l) {
  if (l.httpEstado === 'sin-respuesta') {
    return l.error === 'timeout'
      ? 'Su web no llega a cargar: se corta antes de responder'
      : `Su web no responde (${l.error}): el dominio pudo haber vencido`;
  }
  // Mismo orden que gravedad(), a proposito: si las dos funciones priorizan
  // distinto, el mensaje termina contando un hallazgo menor que el que la
  // gravedad esta puntuando, y la lista se lee al reves de como se vende.
  if (l.bloqueado === 'si') {
    return l.httpsOk === 'no'
      ? 'Su web no usa HTTPS: Chrome la marca como "No seguro" al entrar'
      : `Su web rechaza la revision automatica (HTTP ${l.httpEstado}): hay que abrirla a mano antes de afirmar nada`;
  }
  if (Number(l.httpEstado) >= 400) {
    return `Su web devuelve error ${l.httpEstado}: los clientes que la visitan no ven nada`;
  }
  if (l.httpsOk === 'no') {
    return 'Su web no usa HTTPS: Chrome la marca como "No seguro" al entrar';
  }
  if (l.tieneViewport === 'no') {
    return 'Su web no esta adaptada a celular: se ve descuadrada en movil';
  }
  if (l.psiMovil !== '' && Number(l.psiMovil) < 40) {
    const lcp = l.cruxLcpSeg || l.psiLcpSeg;
    return `Rendimiento movil ${l.psiMovil}/100${lcp ? `, tarda ${lcp}s en mostrar el contenido` : ''}`;
  }
  if (l.psiMovil !== '' && Number(l.psiMovil) < 70) {
    return `Rendimiento movil ${l.psiMovil}/100: mejorable, pero no es urgente`;
  }
  if (l.psiMovil !== '') return `Sitio en buen estado (${l.psiMovil}/100): no es prospecto`;
  if (l.psiError) return `Sin dato de velocidad (${l.psiError}): revisar a mano`;
  return 'Responde bien en lo basico; falta medir velocidad (correr sin --sin-psi)';
}

/** Gravedad 0-100 del hallazgo, para reordenar dentro del grupo con-web. */
function gravedad(l) {
  // Sin respuesta va primero: ahi httpsOk vale 'no' por inicializacion, no
  // porque lo hayamos medido, y colarlo antes rebajaria un dominio vencido al
  // nivel de uno que simplemente no tiene certificado.
  if (l.httpEstado === 'sin-respuesta') return 100;
  // Si bloquearon, el esquema de la URL final si es dato real: vale como
  // hallazgo. Lo demas queda indeterminado.
  if (l.bloqueado === 'si') return l.httpsOk === 'no' ? 85 : 25;
  if (Number(l.httpEstado) >= 400) return 100;
  if (l.httpsOk === 'no') return 85;
  if (l.tieneViewport === 'no') return 80;
  if (l.psiMovil === '') return 30;
  if (Number(l.psiMovil) < 25) return 75;
  if (Number(l.psiMovil) < 40) return 65;
  if (Number(l.psiMovil) < 70) return 40;
  return 5;
}

function aCSV(filas) {
  if (filas.length === 0) return '';
  const cols = [...new Set(filas.flatMap((f) => Object.keys(f)))];
  const escapar = (v) => {
    const s = String(v ?? '');
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [cols.join(','), ...filas.map((f) => cols.map((c) => escapar(f[c])).join(','))].join('\n');
}

/** Pool de concurrencia simple: N tareas en vuelo, sin dependencias externas. */
async function enLotes(items, n, tarea) {
  const resultados = new Array(items.length);
  let siguiente = 0;
  const obreros = Array.from({ length: Math.min(n, items.length) }, async () => {
    while (siguiente < items.length) {
      const i = siguiente;
      siguiente += 1;
      resultados[i] = await tarea(items[i], i);
    }
  });
  await Promise.all(obreros);
  return resultados;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help || !args.archivo) {
    console.log(`
Fase 2 — Medicion y evidencia

  --archivo            JSON de la fase 1. Obligatorio.
  --incluir-terceros   Mide tambien los 'solo-redes' y 'web-de-terceros'
  --sin-psi            Solo revision HTTP, sin PageSpeed (rapido y gratis)
  --concurrencia       Sitios en paralelo. Default 4.
  --out                Nombre base de salida. Default: <archivo>-medido

Ejemplo:
  node tools/prospector/medir.js --archivo salida/chifas-Comas-2026-08-27.json
`);
    process.exit(args.help ? 0 : 1);
  }

  const ruta = path.isAbsolute(String(args.archivo))
    ? String(args.archivo)
    : path.join(__dirname, String(args.archivo).replace(/^tools[\\/]prospector[\\/]/, ''));

  if (!fs.existsSync(ruta)) {
    console.error(`No existe el archivo: ${ruta}`);
    process.exit(1);
  }

  cargarEnv();
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const usarPsi = !args['sin-psi'];

  if (usarPsi && !apiKey) {
    console.log('Aviso: sin GOOGLE_MAPS_API_KEY, PageSpeed corre con cuota anonima muy baja.\n');
  }

  const todos = JSON.parse(fs.readFileSync(ruta, 'utf8'));
  const objetivo = todos.filter((l) => {
    if (!l.web) return false;
    if (l.clasificacion === 'con-web') return true;
    return Boolean(args['incluir-terceros']);
  });

  if (objetivo.length === 0) {
    console.log('Ningun lead de este archivo tiene web propia que medir.');
    console.log('Los "sin-web" no necesitan fase 2: su evidencia es justamente la ausencia.');
    return;
  }

  console.log(`Midiendo ${objetivo.length} sitios de ${todos.length} leads${usarPsi ? ' (con PageSpeed)' : ' (solo HTTP)'}...\n`);

  const concurrencia = Number(args.concurrencia) || 4;
  let hechos = 0;

  const medidos = await enLotes(objetivo, concurrencia, async (lead) => {
    const http = await revisarSitio(lead.web);
    // PSI solo si el sitio respondio: no tiene sentido medir lo que no carga.
    const respondio = http.httpEstado !== 'sin-respuesta' && Number(http.httpEstado) < 400;
    const psi = usarPsi && respondio
      ? await medirPSI(lead.web, apiKey)
      : { psiMovil: '', psiLcpSeg: '', psiCls: '', cruxLcpSeg: '', psiError: '' };

    const out = { ...lead, ...http, ...psi };
    out.diagnostico = diagnosticar(out);
    out.gravedad = gravedad(out);

    hechos += 1;
    process.stdout.write(`  [${String(hechos).padStart(3)}/${objetivo.length}] ${String(out.gravedad).padStart(3)}  ${lead.nombre.slice(0, 30).padEnd(32)} ${out.diagnostico.slice(0, 60)}\n`);
    return out;
  });

  medidos.sort((a, b) => b.gravedad - a.gravedad || b.puntaje - a.puntaje);

  const base = args.out ? String(args.out) : `${path.basename(ruta, '.json')}-medido`;
  const dir = path.join(__dirname, 'salida');
  const rutaCsv = path.join(dir, `${base}.csv`);
  const rutaJson = path.join(dir, `${base}.json`);
  fs.writeFileSync(rutaCsv, '﻿' + aCSV(medidos), 'utf8');
  fs.writeFileSync(rutaJson, JSON.stringify(medidos, null, 2), 'utf8');

  const bloqueados = medidos.filter((l) => l.bloqueado === 'si').length;
  const caidos = medidos.filter((l) => l.bloqueado !== 'si'
    && (l.httpEstado === 'sin-respuesta' || Number(l.httpEstado) >= 400)).length;
  const sinHttps = medidos.filter((l) => l.httpsOk === 'no').length;
  const sinViewport = medidos.filter((l) => l.tieneViewport === 'no').length;
  const lentos = medidos.filter((l) => l.psiMovil !== '' && Number(l.psiMovil) < 40).length;
  const sanos = medidos.filter((l) => l.gravedad <= 5).length;

  console.log(`
--- Hallazgos ---
Sitios medidos         ${medidos.length}
  caidos o con error   ${caidos}\t<- el mejor argumento posible
  sin HTTPS            ${sinHttps}\t<- Chrome los marca "No seguro"
  sin viewport movil   ${sinViewport}\t<- rotos en celular
  PageSpeed < 40       ${lentos}\t<- lentos de forma demostrable
  sanos (descartar)    ${sanos}\t<- su web funciona bien

CSV   ${rutaCsv}
JSON  ${rutaJson}
`);
}

main().catch((err) => {
  console.error(`\nFallo inesperado: ${err.message}`);
  process.exit(1);
});
