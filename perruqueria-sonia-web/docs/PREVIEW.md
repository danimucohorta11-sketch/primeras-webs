# Ver la web desde Claude (sin Vercel)

**Enlace actual:** https://claude.ai/artifact/FVD2fgcRVg7pu1JhESrLnW
(artifact «Perruqueria Sònia · Badalona», slug `75502e05-b467-472f-830c-0a93cd6f15d3`, privado del dueño)

## Cuando el cliente pida verla
1. Si no ha cambiado nada: darle el enlace de arriba.
2. Si la web ha cambiado: regenerar y republicar EN EL MISMO artifact (mismo enlace):
   ```bash
   cd perruqueria-sonia-web && npm install && bash scripts/preview-artifact.sh
   ```
   Después `publish_files` con el `slug` de arriba, `base_version` (de `get_artifact`), `mode: "replace"`
   y todos los archivos de `preview-artifact/` (cada uno con `as` = su ruta relativa).
3. Si el artifact ya no existe: publicarlo nuevo y actualizar el enlace de este archivo y de `../CLAUDE.md`.

## Limitaciones del visor (en Vercel funciona todo)
- El mapa de Google no carga; el botón «Abrir en Google Maps» sí.
- Los enlaces tel: y WhatsApp pueden no abrirse desde el visor.
- El enlace «Aviso legal» del pie no navega en esta vista.
