// 사용법: node scripts/security/secret-scan.mjs [dist]
// 빌드 결과물에 관리자 키(service_role JWT, sb_secret_ 키)가 들어 있으면 실패한다.
import { mask, scanDir } from './secret-scan-core.mjs';

const dir = process.argv[2] ?? 'dist';
const found = scanDir(dir);

if (found.length > 0) {
  for (const f of found) console.error(`::error file=${f.file}::${f.kind} found (${mask(f.token)})`);
  process.exit(1);
}
console.log(`secret-scan: ${dir} 이상 없음`);
