# Ver la web desde Claude (sin Vercel)

**Enlace actual:** https://claude.ai/artifact/SDosAiS5AiG6QnGCJzik9d
(artifact «Peluquería Bea · Badalona», slug `cc3e45f6-b141-4124-a973-c351c4c080d8`, privado del dueño)

## Cuando el cliente pida verla
1. Si no ha cambiado nada: darle el enlace de arriba.
2. Si la web ha cambiado: regenerar y republicar EN EL MISMO artifact (mismo enlace):
   ```bash
   cd peluqueria-bea-web && npm install && bash scripts/preview-artifact.sh
   ```
   Después `publish_files` con `slug` de arriba, `base_version` (de `get_artifact`), `mode: "replace"`
   y todos los archivos de `preview-artifact/` (cada uno con `as` = su ruta relativa).
3. Si el artifact ya no existe: publicarlo nuevo (sin slug) con título «Peluquería Bea · Badalona»
   y actualizar el enlace de este archivo.

## Limitaciones del visor (en Vercel funciona todo)
- El mapa de Google no carga (el visor bloquea iframes externos); el botón «Abrir en Google Maps» sí.
- Los enlaces tel: y WhatsApp pueden no abrirse desde el visor.
- El enlace «Aviso legal» del pie no navega en esta vista.
