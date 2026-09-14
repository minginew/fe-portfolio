// 사용법: node scripts/perf/summarize.mjs <results-dir>
// Lighthouse JSON들을 페이지별로 묶어 중앙값을 markdown 표로 출력한다.
import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) {
  console.error('usage: node summarize.mjs <results-dir>');
  process.exit(1);
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
const groups = {};

for (const file of files) {
  const slug = file.replace(/_\d+\.json$/, '');
  const lhr = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  const a = lhr.audits;
  const requests = a['network-requests']?.details?.items ?? [];
  const byType = {};
  for (const r of requests) {
    const t = r.resourceType || 'Other';
    byType[t] = (byType[t] || 0) + (r.transferSize || 0);
  }
  const lcpPhases = a['largest-contentful-paint-element']?.details?.items?.[1]?.items ?? [];
  const phase = (name) => lcpPhases.find((p) => p.phase === name)?.timing ?? NaN;
  (groups[slug] ||= []).push({
    score: Math.round((lhr.categories.performance?.score ?? 0) * 100),
    FCP: a['first-contentful-paint'].numericValue,
    LCP: a['largest-contentful-paint'].numericValue,
    TBT: a['total-blocking-time'].numericValue,
    CLS: a['cumulative-layout-shift'].numericValue,
    SI: a['speed-index'].numericValue,
    totalKB: a['total-byte-weight'].numericValue / 1024,
    reqs: requests.length,
    jsKB: (byType.Script || 0) / 1024,
    cssKB: (byType.Stylesheet || 0) / 1024,
    fontKB: (byType.Font || 0) / 1024,
    imgKB: (byType.Image || 0) / 1024,
    ttfb: phase('TTFB'),
    loadDelay: phase('Load Delay'),
    loadTime: phase('Load Time'),
    renderDelay: phase('Render Delay'),
    lcpEl: a['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node?.snippet?.slice(0, 60) ?? '',
  });
}

// 유효한 숫자만 사용. 짝수 개면 가운데 두 값의 평균. 유효값이 없으면 NaN → 표에 'n/a'
const median = (arr) => {
  const s = arr.filter(Number.isFinite).sort((x, y) => x - y);
  if (s.length === 0) return NaN;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 1 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};
const fmt = (v, digits = 0) => (Number.isFinite(v) ? v.toFixed(digits) : 'n/a');

console.log('| page | n | score | FCP | LCP | TBT | CLS | SI | total KB | reqs | JS KB | CSS KB | font KB | img KB |');
console.log('|---|---|---|---|---|---|---|---|---|---|---|---|---|---|');
for (const [slug, runs] of Object.entries(groups)) {
  const m = (k) => median(runs.map((r) => r[k]));
  console.log(
    `| ${slug} | ${runs.length} | ${fmt(m('score'))} | ${fmt(m('FCP'))} | ${fmt(m('LCP'))} | ${fmt(m('TBT'))} | ${fmt(m('CLS'), 3)} | ${fmt(m('SI'))} | ${fmt(m('totalKB'))} | ${fmt(m('reqs'))} | ${fmt(m('jsKB'))} | ${fmt(m('cssKB'))} | ${fmt(m('fontKB'))} | ${fmt(m('imgKB'))} |`
  );
}
console.log('');
console.log('| page | LCP element | TTFB | load delay | load | render delay |');
console.log('|---|---|---|---|---|---|');
for (const [slug, runs] of Object.entries(groups)) {
  const m = (k) => median(runs.map((r) => r[k]));
  console.log(
    `| ${slug} | \`${runs[0].lcpEl.replace(/[|`]/g, ' ')}\` | ${fmt(m('ttfb'))} | ${fmt(m('loadDelay'))} | ${fmt(m('loadTime'))} | ${fmt(m('renderDelay'))} |`
  );
}
