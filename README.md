# Informe Interactivo ACA2

Dashboard e informe interactivo en HTML, CSS y JavaScript para el caso `Nexus Renewables — Vientos del Desierto`.

## Estructura

- `index.html`: dashboard principal y menú de navegación.
- `pag1_resumen_ejecutivo_nexus.html`: resumen ejecutivo.
- `pag2_mcda_nexus.html`: laboratorio MCDA.
- `pag3_ingenieria_fiscal_nexus.html`: análisis de ingeniería fiscal.
- `pag4_gobernanza_esg_nexus.html`: gobernanza y métricas ESG.
- `pag5_conclusiones_pitch_nexus.html`: conclusiones y pitch.
- `styles.css`: estilos globales del proyecto.
- `app.js`: utilidades compartidas, inyección de fragmentos y configuración común de gráficas.
- `banner.html`: banner compartido.
- `footer.html`: footer compartido.

## Cómo usarlo

La forma recomendada es abrirlo con un servidor local para que `app.js` pueda cargar `banner.html` y `footer.html`.

Opciones rápidas:

1. Con VS Code, usar `Live Server`.
2. Con Python:

```bash
python3 -m http.server 8000
```

Luego abrir:

```text
http://localhost:8000
```

## Notas técnicas

- El proyecto usa `Chart.js` desde CDN.
- `app.js` intenta cargar `banner.html` y `footer.html` con `fetch`.
- Si el navegador bloquea `fetch` por abrir archivos con `file://`, existe un fallback interno para evitar que la UI se rompa.

## Mantenimiento

- Para cambiar el banner global: editar `banner.html`.
- Para cambiar el footer global: editar `footer.html`.
- Para cambiar estilos compartidos: editar `styles.css`.
- Para cambiar comportamiento común de gráficas: editar `app.js`.

## Sugerencias siguientes

- Consolidar más estilos inline de cada página dentro de `styles.css`.
- Si el proyecto crece, separar configuración de charts por módulos.
- Agregar una carpeta `assets/` si luego se incorporan imágenes, logos o QR reales.
