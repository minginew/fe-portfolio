// 사용법: node scripts/perf/compare.mjs <baseDir> <headDir> [budget.json]
// base/head 결과의 중앙값을 나란히 놓고 Δ를 출력한다. 예산을 넘으면 exit 1.
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
  const violations = checkBudget(head, budget);
  if (violations.length) {
    console.log('\n**예산 초과**');
    for (const v of violations) console.log(`- ${v}`);
    process.exit(1);
  }
  console.log('\n예산 내 ✅');
}
