# Dirección visual — El Vacío

## Identidad

El sitio oficial de **El Vacío** debe sentirse como entrar al cuarto desde donde se transmite el podcast: una estación de radio abandonada, liminal y todavía encendida por una señal defectuosa.

La escena principal combina:

- espacios liminales y backrooms;
- cabinas de radio analógicas;
- televisores CRT y equipos antiguos;
- interferencia, ruido, eco y transmisiones perdidas;
- gráficos low-poly y estética de videojuegos antiguos;
- lenguaje de portales web de principios de los años 2000.

## Recursos revisados

No existen aún las carpetas solicitadas `/public/assets/hosts`, `/public/assets/environments` ni `/references`. Los recursos oficiales disponibles están en `/public/images/references`:

- `cabina -de-radio.jpg`: cabina cálida con consolas, señal **AL AIRE**, CRT, micrófono y equipos analógicos.
- `estudio-principal.jpg`: espacio central gris, mesa blanca, pantallas CRT y ventanas sobreexpuestas.
- `planta-interior.jpg`: encuadre vertical/liminal de interior de concreto con vegetación low-poly.
- `sala-superior.jpg`: sala liminal con lámpara cálida, ventanas sobreexpuestas y ruido ambiental.
- `television-ctr.jpg`: CRT en primer plano, cian apagado, concreto y luz blanca intensa.

## Paleta

La paleta se extrae de los recursos oficiales:

| Token | Uso | Color |
| --- | --- | --- |
| `--void-black` | fondo base | `#050505` |
| `--concrete` | concreto oscuro | `#3c3a34` |
| `--concrete-light` | paneles y texto secundario | `#b8b5aa` |
| `--overexposed` | blanco sobreexpuesto | `#f4f1e7` |
| `--tungsten` | luces, avisos | `#d6a13a` |
| `--aged-orange` | alertas suaves | `#b5602b` |
| `--muted-cyan` | señal CRT | `#7fa5a6` |
| `--on-air` | indicador AL AIRE | `#d1372d` |

## Tratamiento visual

- Marcos rectangulares, líneas de interfaz antigua y etiquetas técnicas.
- Superposición de ruido y scanlines con CSS ligero.
- Bordes duros, sombras densas y textura de concreto.
- Movimiento ambiental lento: encendido CRT, parpadeos controlados y cámara sutil.
- Sin glassmorphism ni botones SaaS.

## Tipografía

- **Michroma**: logotipo, títulos y mensajes importantes.
- **Oxanium**: navegación, botones, controles y etiquetas.
- **Orbitron**: números, frecuencias, relojes y estados técnicos.
- **Coda**: frases especiales y elementos con personalidad.
- **Arial/Helvetica/sans-serif** fallback legible para párrafos extensos.

## Pendientes visuales reales

- Incorporar imágenes oficiales de Andrés e Iván cuando existan en `/public/assets/hosts`.
- Incorporar ambientes oficiales si se agregan a `/public/assets/environments`.
- Reemplazar el encuadre actual basado en `estudio-principal.jpg` solo si se entrega una escena oficial específica para homepage.
