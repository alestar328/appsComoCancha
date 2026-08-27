# Prospector — Fase 1

Descubre negocios por rubro y distrito en Lima usando Google Places API (New),
y los clasifica según su presencia web.

Es una herramienta de **lectura**: consulta la API de Google y escribe archivos
locales. No envía correos, no escribe a nadie, no toca el sitio en producción.

No tiene dependencias — usa el `fetch` nativo de Node 18+.

## Configuración

### 1. Crear la API key

1. Entra a [console.cloud.google.com](https://console.cloud.google.com) y crea un proyecto.
2. Activa la facturación. Places API la exige incluso dentro del crédito gratuito.
3. **APIs y servicios → Biblioteca** → busca y habilita **Places API (New)**.
   Ojo: la que dice solo "Places API", sin "(New)", es la versión antigua y este
   script no la usa.
4. **APIs y servicios → Credenciales → Crear credenciales → Clave de API**.
5. Restringe la clave: en *Restricciones de API* déjala solo con Places API (New).
   Como el script corre desde tu máquina, no le pongas restricción por HTTP referrer.

### 2. Guardar la clave

En el `.env.local` de la raíz del proyecto:

```
GOOGLE_MAPS_API_KEY="tu-clave"
```

Ese archivo está en `.gitignore` y nunca se sube.

## Uso

```bash
node tools/prospector/buscar.js --rubro "restaurantes" --distrito "Miraflores"
node tools/prospector/buscar.js --rubro "dentistas" --distrito "San Isidro,Surco,San Borja"
node tools/prospector/buscar.js --rubro "gimnasios" --distrito "Miraflores" --max 20
```

| Flag | Qué hace |
|---|---|
| `--rubro` | Categoría a buscar. Obligatorio. |
| `--distrito` | Uno o varios separados por coma. Obligatorio. |
| `--max` | Máximo por distrito. Default 60, que es el tope de Google. |
| `--out` | Nombre base de los archivos de salida. |

Los resultados salen en `salida/` como CSV y JSON. El CSV lleva BOM para que
Excel muestre bien las tildes. Esa carpeta está ignorada por git.

## Cómo leer la salida

Cada negocio queda etiquetado en la columna `clasificacion`:

| Valor | Qué significa | Ángulo de venta |
|---|---|---|
| `sin-web` | Google no tiene web registrada | No existe fuera de Maps |
| `solo-redes` | Lo que figura como web es Facebook, Instagram, Linktree… | Ya invirtió en presencia digital y chocó con el límite de la plataforma |
| `con-web` | Tiene sitio propio | Pasa a fase 2, donde se mide si ese sitio sirve |

El orden del archivo ya viene priorizado: primero `sin-web`, luego `solo-redes`,
y dentro de cada grupo los de más reseñas — negocios activos con clientes reales,
no fichas abandonadas.

Vale la pena mirar también la columna `estado`: `CLOSED_TEMPORARILY` o
`CLOSED_PERMANENTLY` son ruido que conviene descartar antes de contactar.

## Costos y límites

- Text Search devuelve **como máximo 60 resultados** por consulta, en 3 páginas
  de 20. Para cubrir un distrito grande, conviene partir el rubro en términos más
  específicos ("cevichería", "pollería", "café") en vez de subir `--max`.
- El script imprime cuántas llamadas hizo. Cada página es una llamada facturable.
- Pedir `websiteUri` y `nationalPhoneNumber` sube la consulta a un SKU más caro,
  pero sin esos campos no hay nada que calificar después.
- Google da un crédito mensual gratuito. Confirma los precios vigentes en la
  [tabla oficial](https://developers.google.com/maps/billing-and-pricing/pricing)
  antes de lanzar tandas grandes, y ponle un presupuesto con alerta al proyecto
  de Google Cloud.

## Alcance

Esto es solo descubrimiento. La fase 2 —medir con PageSpeed Insights los que
tienen web, y generar la evidencia del diagnóstico— todavía no está construida.
