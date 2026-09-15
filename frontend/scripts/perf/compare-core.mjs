import { fmt } from './lib.mjs';

export const COLUMNS = [
  ['LCP', 0],
  ['FCP', 0],
  ['TBT', 0],
  ['CLS', 3],
  ['totalKB', 0],
  ['jsKB', 0],
  ['fontKB', 0],
  ['imgKB', 0],
];

export function delta(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return NaN;
  return b - a;
}

// base/head 요약({ slug: Summary })을 나란히 놓은 markdown 표
export function renderTable(base, head) {
  const lines = [];
  lines.push('| page | ' + COLUMNS.map(([m]) => `${m} base | ${m} head | Δ`).join(' | ') + ' |');
  lines.push('|---|' + COLUMNS.map(() => '---|---|---').join('|') + '|');
  for (const slug of Object.keys(head)) {
    const b = base[slug] ?? {};
    const h = head[slug];
    const cells = COLUMNS.map(([m, d]) => {
      const dv = delta(b[m], h[m]);
      const sign = Number.isFinite(dv) && dv > 0 ? '+' : '';
      return `${fmt(b[m], d)} | ${fmt(h[m], d)} | ${sign}${fmt(dv, d)}`;
    });
    lines.push(`| ${slug} | ${cells.join(' | ')} |`);
  }
  return lines.join('\n');
}

// budget: { gate: { fail: [metric], warn: [metric] }, pages: { slug: { metric: limit } } }
// head 값이 예산을 넘는 항목을 fail/warn으로 나눠 돌려준다. gate에 없는 metric은 무시
// - fail: 결정적 지표(전송량)만. 같은 코드면 바이트 차이 0
// - warn: LCP 등 CI 3회 중앙값으로 ±600ms 흔들리는 지표 — 표시만 하고 게이트로 쓰지 않음 (PR #79 오탐)
export function checkBudget(head, budget) {
  const fail = [];
  const warn = [];
  const gate = budget?.gate ?? { fail: [], warn: [] };
  for (const [slug, limits] of Object.entries(budget?.pages ?? {})) {
    const h = head[slug];
    if (!h) continue;
    for (const [metric, limit] of Object.entries(limits)) {
      if (!(Number.isFinite(h[metric]) && h[metric] > limit)) continue;
      const line = `${slug}: ${metric} ${fmt(h[metric], metric === 'CLS' ? 3 : 0)} > budget ${limit}`;
      if (gate.fail?.includes(metric)) fail.push(line);
      else if (gate.warn?.includes(metric)) warn.push(line);
    }
  }
  return { fail, warn };
}
