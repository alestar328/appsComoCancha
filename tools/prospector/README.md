# Prospector

Encuentra y califica negocios en Lima que necesitan lo que vendemos: web,
tienda online o app.

Son dos herramientas de **lectura**. Consultan APIs de Google y sitios web
públicos, y escriben archivos locales. No envían correos, no escriben a nadie,
no tocan el sitio en producción.

Sin dependencias — usan el `fetch` nativo de Node 18+.

| Script | Qué hace |
|---|---|
| `buscar.js` | **Fase 1.** Descubre negocios por rubro y distrito, los clasifica y les da puntaje. |
| `medir.js` | **Fase 2.** Audita los sitios de quienes sí tienen web y genera la evidencia. |

## Configuración

### 1. Crear la API key

1. Entra a [console.cloud.google.com](https://console.cloud.google.com) y crea un proyecto.
2. Activa la facturación. Places API la exige incluso dentro del crédito gratuito.
3. **APIs y servicios → Biblioteca** → habilita estas dos:
   - **Places API (New)** — para la fase 1. Ojo: la que dice solo "Places API",
     sin "(New)", es la versión antigua y estos scripts no la usan.
   - **PageSpeed Insights API** — para la fase 2. Es gratuita.
4. **APIs y servicios → Credenciales → Crear credenciales → Clave de API**.
5. En *Restricciones de API*, marca **ambas**. Deja la restricción de aplicación
   en **Ninguna**: el filtro por sitio web solo funciona para navegadores, y el
   de IP se rompe cada vez que tu router cambia de dirección.
6. En **Facturación → Presupuestos y alertas**, ponle un tope mensual con avisos.

Si `PageSpeed Insights API` no aparece en la lista de restricciones, es que aún
no la habilitaste en el paso 3 — ese desplegable solo muestra APIs ya activas.

### 2. Guardar la clave

En el `.env.local` de la raíz del proyecto:

```
GOOGLE_MAPS_API_KEY="tu-clave"
```

Ese archivo está en `.gitignore` y nunca se sube.

## Fase 1 — Descubrimiento

```bash
node tools/prospector/buscar.js --rubro "pollerías" --distrito "Los Olivos"
node tools/prospector/buscar.js --rubro "chifas" --distrito "Comas,Ate" --min-resenas 100
```

| Flag | Qué hace |
|---|---|
| `--rubro` | Categoría a buscar. Obligatorio. |
| `--distrito` | Uno o varios separados por coma. Obligatorio. |
| `--max` | Máximo por distrito. Default 60, tope de Google. |
| `--min-resenas` | Descarta los que tengan menos. |
| `--min-puntaje` | Descarta los que puntúen menos. |
| `--incluir-cadenas` | Conserva sucursales de cadena (por defecto se descartan). |
| `--incluir-cerrados` | Conserva los no operativos. |
| `--out` | Nombre base de los archivos de salida. |

### Clasificación

| Valor | Qué significa | Ángulo de venta |
|---|---|---|
| `sin-web` | Google no tiene web registrada | No existe fuera de Maps |
| `web-de-terceros` | Su "web" es mesa247, PedidosYa, un sitio de Google Business… | Presencia alquilada, y suele pagar comisión por pedido |
| `solo-redes` | Su "web" es Facebook, Instagram, Linktree… | Ya invirtió en digital y chocó con el techo de la plataforma |
| `con-web` | Sitio propio | Pasa a fase 2, donde se mide si ese sitio sirve |

### Puntaje

De 0 a 90. Pondera tres cosas: cuánto duele el problema que resolvemos
(clasificación), si el negocio tiene con qué pagar (reseñas en escala
logarítmica, más un bono por buen rating), y si podemos alcanzarlo por WhatsApp.

Las sucursales de cadena puntúan 0: tienen web corporativa aunque Google no la
vincule a esa ficha, y la decisión no se toma en el local.

Ojo con el filtro de cadenas: usa regex con límites de palabra, no subcadenas,
porque en Perú varios nombres de marca coinciden con vocabulario del rubro.
`"a la leña"` es un método de cocción que aparece en decenas de nombres
independientes, por eso `La Leña` está anclado al inicio del nombre.

### Canal de contacto

El móvil peruano son 9 dígitos empezando en 9 y admite WhatsApp, que es el canal
que convierte en Lima. El fijo `(01)` es llamada o visita. No es el mismo pitch
ni el mismo esfuerzo, así que conviene trabajarlos por separado.

## Fase 2 — Medición

```bash
node tools/prospector/medir.js --archivo salida/chifas-Comas-2026-08-27.json
node tools/prospector/medir.js --archivo salida/x.json --sin-psi
```

| Flag | Qué hace |
|---|---|
| `--archivo` | JSON de la fase 1. Obligatorio. |
| `--incluir-terceros` | Mide también los `solo-redes` y `web-de-terceros`. |
| `--sin-psi` | Solo revisión HTTP, sin PageSpeed. Rápido y gratis. |
| `--concurrencia` | Sitios en paralelo. Default 4. |
| `--out` | Nombre base de salida. |

Por defecto solo mide el grupo `con-web`. Los `sin-web` no necesitan fase 2: su
evidencia es justamente la ausencia.

Comprueba, en este orden de gravedad:

| Hallazgo | Gravedad | Por qué vende |
|---|---|---|
| Sitio caído o dominio vencido | 100 | El mejor argumento posible, y verificable en 5 segundos |
| Sin HTTPS | 85 | Chrome muestra "No seguro" en la barra |
| Sin viewport móvil | 80 | Se ve descuadrada en celular, donde está el tráfico |
| PageSpeed < 25 | 75 | Lento de forma demostrable |
| PageSpeed < 40 | 65 | |
| PageSpeed < 70 | 40 | Mejorable pero no urgente |
| Bloqueó el chequeo | 25 | Indeterminado — hay que abrirlo a mano |
| PageSpeed ≥ 70 | 5 | Su web funciona: descartar |

La columna `diagnostico` trae la frase concreta lista para usar en un mensaje.

### Sobre los sitios que bloquean

Un `401`, `403` o `429` casi nunca significa que el sitio esté roto: suele ser un
CDN o un WAF rechazando a un cliente desconocido. El script reintenta con
User-Agent de navegador y, si sigue bloqueado, lo marca como **indeterminado**
en vez de afirmar que está caído.

Esto importa: mandarle a un dueño "su web está caída" cuando él la abre y
funciona perfecto destruye la credibilidad del mensaje y quema el lead.

## Costos y límites

- **Places** se factura por petición, no por resultado. Cada página de 20 es una
  llamada. Un rubro en un distrito con resultados completos son 3 llamadas.
- Text Search devuelve **máximo 60 resultados** por consulta. Para cubrir un
  distrito grande conviene afinar el rubro —"cevichería", "pollería", "chifa" en
  vez de "restaurantes"— antes que subir `--max`.
- Pedir `websiteUri` y `nationalPhoneNumber` sube la consulta al tier Enterprise.
  Es deliberado: sin esos campos no hay nada que calificar.
- **PageSpeed Insights es gratuita**, pero con cuota por minuto. Si aparecen
  errores de cuota, baja `--concurrencia`.
- El script imprime cuántas llamadas facturables hizo. El dato real está en
  **Facturación → Informes** filtrando por SKU.

## Dónde apuntar

La primera prueba fue "restaurantes en Miraflores": 20 resultados, de los cuales
19 ya tenían web propia y varios eran restaurantes de primer nivel con agencia
detrás. Google ordena por prominencia, así que un rubro genérico en un distrito
saturado devuelve justo los negocios que menos nos necesitan.

Cambiar a rubro específico en distritos de alto volumen dio la vuelta al
resultado: 75% sin web, contra 5% en Miraflores. El volumen está en la cola
larga, no en la cabeza.
