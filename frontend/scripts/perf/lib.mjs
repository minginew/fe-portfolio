import fs from 'node:fs';
import path from 'node:path';

export const METRICS = [
  'score',
  'FCP',
  'LCP',
  'TBT',
  'CLS',
  'SI',
  'totalKB',
  'reqs',
  'jsKB',
  'cssKB',
  'fontKB',
  'imgKB',
  'ttfb',
  'loadDelay',
  'loadTime',
  'renderDelay',
];

// 유효한 숫자만 사용. 짝수 개면 가운데 두 값의 평균. 유효값이 없으면 NaN
export const median = (arr) => {
  const s = arr.filter(Number.isFinite).sort((x, y) => x - y);
  if (s.length === 0) return NaN;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 1 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

export const fmt = (v, digits = 0) => (Number.isFinite(v) ? v.toFixed(digits) : 'n/a');

// Lighthouse LHR 객체 하나 → 지표 레코드
export function extract(lhr) {
  const a = lhr.audits;
  const requests = a['network-requests']?.details?.items ?? [];
  const byType = {};
  for (const r of requests) {
    const t = r.resourceType || 'Other';
    byType[t] = (byType[t] || 0) + (r.transferSize || 0);
  }
  const lcpPhases = a['largest-contentful-paint-element']?.details?.items?.[1]?.items ?? [];
  const phase = (name) => lcpPhases.find((p) => p.phase === name)?.timing ?? NaN;
  return {
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
  };
}

// results 디렉터리 → { slug: Run[] }
export function collect(dir) {
  const groups = {};
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const slug = file.replace(/_\d+\.json$/, '');
    const lhr = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    (groups[slug] ||= []).push(extract(lhr));
  }
  return groups;
}

// { slug: Run[] } → { slug: { n, lcpEl, ...중앙값 } }
export function summarize(groups) {
  const out = {};
  for (const [slug, runs] of Object.entries(groups)) {
    const s = { n: runs.length, lcpEl: runs[0]?.lcpEl ?? '' };
    for (const m of METRICS) s[m] = median(runs.map((r) => r[m]));
    out[slug] = s;
  }
  return out;
}

export const summarizeDir = (dir) => summarize(collect(dir));

export const escapeCell = (s) => String(s).replace(/[|`]/g, ' ');
