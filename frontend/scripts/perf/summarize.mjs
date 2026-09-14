// 사용법: node scripts/perf/summarize.mjs <results-dir>
// Lighthouse JSON들을 페이지별로 묶어 중앙값을 markdown 표로 출력한다.
import { fmt, escapeCell, summarizeDir } from './lib.mjs';

const dir = process.argv[2];
if (!dir) {
  console.error('usage: node summarize.mjs <results-dir>');
  process.exit(1);
}

const summary = summarizeDir(dir);

console.log('| page | n | score | FCP | LCP | TBT | CLS | SI | total KB | reqs | JS KB | CSS KB | font KB | img KB |');
console.log('|---|---|---|---|---|---|---|---|---|---|---|---|---|---|');
for (const [slug, s] of Object.entries(summary)) {
  console.log(
    `| ${slug} | ${s.n} | ${fmt(s.score)} | ${fmt(s.FCP)} | ${fmt(s.LCP)} | ${fmt(s.TBT)} | ${fmt(s.CLS, 3)} | ${fmt(s.SI)} | ${fmt(s.totalKB)} | ${fmt(s.reqs)} | ${fmt(s.jsKB)} | ${fmt(s.cssKB)} | ${fmt(s.fontKB)} | ${fmt(s.imgKB)} |`
  );
}
console.log('');
console.log('| page | LCP element | TTFB | load delay | load | render delay |');
console.log('|---|---|---|---|---|---|');
for (const [slug, s] of Object.entries(summary)) {
  console.log(
    `| ${slug} | \`${escapeCell(s.lcpEl)}\` | ${fmt(s.ttfb)} | ${fmt(s.loadDelay)} | ${fmt(s.loadTime)} | ${fmt(s.renderDelay)} |`
  );
}
