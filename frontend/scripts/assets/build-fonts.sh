#!/bin/bash
# 사용법: VENV=<python venv 경로> scripts/assets/build-fonts.sh
# Google Fonts의 MuseoModerno 가변 TTF(OFL)를 받아 라틴 서브셋 woff2를 만든다.
# 산출: src/assets/fonts/MuseoModerno-latin.woff2 (가변, wght 100-900)
#       정적 4종(300/400/500/700)은 크기 비교용으로만 만들고 보관하지 않음(임시 디렉터리에만 생성)
set -euo pipefail
cd "$(dirname "$0")/../.."
VENV=${VENV:?venv 경로 필요}
OUT=src/assets/fonts
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
LATIN="U+0020-007E,U+00A0-00FF,U+2013-2014,U+2018-201D,U+2026,U+20A9"

# google/fonts 커밋 고정 — 재실행 시 동일 산출물 보장 (2026-09-15)
curl -fsSL -o "$TMP/MuseoModerno.ttf" \
  "https://raw.githubusercontent.com/google/fonts/809e4d8b8d7e9364a914909bb777679606c178b8/ofl/museomoderno/MuseoModerno%5Bwght%5D.ttf"
curl -fsSL -o "$OUT/OFL.txt" "https://raw.githubusercontent.com/google/fonts/809e4d8b8d7e9364a914909bb777679606c178b8/ofl/museomoderno/OFL.txt"

"$VENV/bin/pyftsubset" "$TMP/MuseoModerno.ttf" --unicodes="$LATIN" --flavor=woff2 \
  --layout-features='*' --output-file="$OUT/MuseoModerno-latin.woff2"

for W in 300 400 500 700; do
  "$VENV/bin/fonttools" varLib.instancer -q "$TMP/MuseoModerno.ttf" wght=$W -o "$TMP/static-$W.ttf"
  "$VENV/bin/pyftsubset" "$TMP/static-$W.ttf" --unicodes="$LATIN" --flavor=woff2 \
    --layout-features='*' --output-file="$TMP/MuseoModerno-$W-latin.woff2"
done
ls -l "$OUT"/*.woff2 "$TMP"/*.woff2
