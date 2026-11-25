#!/usr/bin/env bash
# Genera una copia estática de la web lista para publicarla como página de Claude (artifact).
# Uso: bash scripts/preview-artifact.sh [carpeta_destino]   (por defecto: ./preview-artifact)
# Después se publica el contenido de la carpeta con publish_files (ver docs/PREVIEW.md).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$ROOT/preview-artifact}"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

cp -r "$ROOT/src" "$ROOT/public" "$ROOT/package.json" "$ROOT/tsconfig.json" "$ROOT/next.config.ts" "$WORK/"
cp -al "$ROOT/node_modules" "$WORK/node_modules" 2>/dev/null || cp -r "$ROOT/node_modules" "$WORK/node_modules"
cd "$WORK"

# Rutas que no aplican a una copia estática
rm -f src/app/robots.ts src/app/sitemap.ts src/app/opengraph-image.tsx
# Imágenes con ruta relativa
sed -i 's#src: `/images/#src: `images/#; s#src: "/images/#src: "images/#g' src/content/images.ts
python3 -I -c "import json;p='src/content/blur.json';d=json.load(open(p));json.dump({k.lstrip('/'):v for k,v in d.items()},open(p,'w'))"

STATIC_PREVIEW=1 npx next build > build.log 2>&1 || { cat build.log; exit 1; }

# El servidor de páginas reserva los nombres que empiezan por "_": _next -> assets
rm -rf "$OUT" && cp -r out "$OUT" && cd "$OUT"
mv _next assets
rm -rf _not-found _not-found.* __next.* legal/__next.* 404.html
rm -f assets/static/*/_*.js
grep -rl "_next/static" . | xargs sed -i 's#_next/static#assets/static#g'
grep -rl '"./_next/"' assets | xargs sed -i 's#"\./_next/"#"./assets/"#g'
echo "Copia lista en: $OUT ($(find . -type f | wc -l) archivos)"
