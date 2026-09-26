#!/usr/bin/env sh
# Веб-шрифты: WOFF2 с латиницей, кириллицей и знаками (₽, «», —, стрелки), все оси и OpenType-фичи сохранены.
# TTF в tokens/fonts остаются исходниками для iOS / Android. Нужен fonttools с brotli: pip install fonttools brotli
set -e
cd "$(dirname "$0")/../tokens/fonts"
RANGES="U+0000-024F,U+0300-036F,U+0400-052F,U+1E00-1EFF,U+2000-206F,U+20A0-20CF,U+2100-214F,U+2190-21FF,U+2200-22FF,U+2500-25FF,U+2713-2717,U+FEFF,U+FFFD"
for f in Inter-Variable RobotoSlab-Variable; do
  pyftsubset "$f.ttf" --unicodes="$RANGES" --layout-features='*' --flavor=woff2 --output-file="$f.woff2"
done
ls -la *.woff2
