#!/bin/bash
# 사용법: scripts/perf/measure.sh <label> <runs> <url...>
# Lighthouse(모바일, 시뮬레이션 스로틀링)를 URL마다 N회 실행해 JSON을 results/<label>/에 저장하고 중앙값 표를 출력한다.
set -euo pipefail

if [ "$#" -lt 3 ]; then
  echo "usage: $0 <label> <runs> <url...>" >&2
  exit 1
fi

LABEL=$1
RUNS=$2
shift 2

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
OUT="${OUT:-$SCRIPT_DIR/results}/$LABEL"
mkdir -p "$OUT"

for URL in "$@"; do
  SLUG=$(echo "$URL" | sed -E 's#https?://[^/]+##; s#[^a-zA-Z0-9]+#_#g; s#^_##')
  [ -z "$SLUG" ] && SLUG=root
  for i in $(seq 1 "$RUNS"); do
    npx lighthouse "$URL" \
      --quiet \
      --chrome-flags="--headless=new --no-sandbox" \
      --preset=perf \
      --only-categories=performance \
      --form-factor=mobile \
      --screenEmulation.mobile \
      --throttling-method=simulate \
      --output=json \
      --output-path="$OUT/${SLUG}_$i.json" >/dev/null 2>&1 \
      || echo "run $i failed for $URL" >&2
  done
done

node "$SCRIPT_DIR/summarize.mjs" "$OUT"
