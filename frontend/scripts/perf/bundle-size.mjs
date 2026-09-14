// 사용법: node scripts/perf/bundle-size.mjs <baseDist> <headDist>
// dist/assets 파일의 gzip 크기를 유형별로 합산해 base/head/Δ markdown을 출력한다.
import { measure, renderBundleTable } from './bundle-core.mjs';

const [baseDist, headDist] = process.argv.slice(2);
if (!baseDist || !headDist) {
  console.error('usage: node bundle-size.mjs <baseDist> <headDist>');
  process.exit(1);
}
const base = measure(baseDist);
const head = measure(headDist);

console.log(renderBundleTable(base, head));
