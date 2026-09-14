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

// budget: { pages: { slug: { LCP: ms, totalKB: kb, ... } } } — head 값이 예산을 넘는 항목 목록
export function checkBudget(head, budget) {
  const violations = [];
  for (const [slug, limits] of Object.entries(budget?.pages ?? {})) {
    const h = head[slug];
    if (!h) continue;
    for (const [metric, limit] of Object.entries(limits)) {
      if (Number.isFinite(h[metric]) && h[metric] > limit) {
        violations.push(`${slug}: ${metric} ${fmt(h[metric], metric === 'CLS' ? 3 : 0)} > budget ${limit}`);
      }
    }
  }
  return violations;
}
