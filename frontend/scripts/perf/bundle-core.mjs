import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

export const TYPE_OF = (name) => {
  const ext = path.extname(name).toLowerCase();
  if (ext === '.js') return 'JS';
  if (ext === '.css') return 'CSS';
  if (['.woff2', '.woff', '.ttf', '.otf'].includes(ext)) return 'font';
  if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.avif'].includes(ext)) return 'image';
  return 'other';
};

// 해시 제거: index-CF_7sixD.js → index.js
export const stripHash = (name) => name.replace(/-[A-Za-z0-9_-]{8}(\.[a-z0-9]+)$/i, '$1');

export function measure(dist) {
  const dir = path.join(dist, 'assets');
  const files = {};
  const byType = {};
  for (const f of fs.readdirSync(dir)) {
    const buf = fs.readFileSync(path.join(dir, f));
    const gz = zlib.gzipSync(buf).length;
    files[stripHash(f)] = gz;
    const t = TYPE_OF(f);
    byType[t] = (byType[t] || 0) + gz;
  }
  return { files, byType };
}

const kb = (b) => (b / 1024).toFixed(1);
const signed = (d) => (d > 0 ? '+' : '') + kb(d);

// base/head measure() 결과 → markdown 표(유형별 합계 + 파일별 변화 상위 10)
export function renderBundleTable(base, head) {
  const lines = [];
  lines.push('| type | base KB (gz) | head KB (gz) | Δ KB |');
  lines.push('|---|---|---|---|');
  for (const t of ['JS', 'CSS', 'font', 'image', 'other']) {
    const b = base.byType[t] || 0;
    const h = head.byType[t] || 0;
    lines.push(`| ${t} | ${kb(b)} | ${kb(h)} | ${signed(h - b)} |`);
  }
  const names = new Set([...Object.keys(base.files), ...Object.keys(head.files)]);
  const changes = [...names]
    .map((n) => ({ n, b: base.files[n] || 0, h: head.files[n] || 0 }))
    .map((x) => ({ ...x, d: x.h - x.b }))
    .filter((x) => x.d !== 0)
    .sort((a, b) => Math.abs(b.d) - Math.abs(a.d))
    .slice(0, 10);
  if (changes.length) {
    lines.push('');
    lines.push('| file | base KB | head KB | Δ KB |');
    lines.push('|---|---|---|---|');
    for (const c of changes) lines.push(`| ${c.n} | ${kb(c.b)} | ${kb(c.h)} | ${signed(c.d)} |`);
  }
  return lines.join('\n');
}
