// 사용법: node scripts/perf/compare.mjs <baseDir> <headDir> [budget.json]
// base/head 결과의 중앙값을 나란히 놓고 Δ를 출력한다. gate.fail 지표가 예산을 넘으면 exit 1, gate.warn은 표시만.
import fs from 'node:fs';
import { summarizeDir } from './lib.mjs';
import { checkBudget, renderTable } from './compare-core.mjs';

const [baseDir, headDir, budgetPath] = process.argv.slice(2);
if (!baseDir || !headDir) {
  console.error('usage: node compare.mjs <baseDir> <headDir> [budget.json]');
  process.exit(1);
}

const base = summarizeDir(baseDir);
const head = summarizeDir(headDir);
console.log(renderTable(base, head));

if (budgetPath) {
  const budget = JSON.parse(fs.readFileSync(budgetPath, 'utf8'));
  const { fail, warn } = checkBudget(head, budget);
  if (warn.length) {
    console.log('\n**⚠ LCP 예산 초과 — 참고용, 게이트 아님** (CI 3회 중앙값 노이즈 ±600ms, 판단은 로컬 5회)');
    for (const v of warn) console.log(`- ${v}`);
  }
  if (fail.length) {
    console.log('\n**전송량 예산 초과**');
    for (const v of fail) console.log(`- ${v}`);
    process.exit(1);
  }
  console.log('\n전송량 예산 내 ✅');
}
