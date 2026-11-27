import fs from 'node:fs';
import path from 'node:path';

// 문자열 'service_role'은 JWT payload 안에서 base64url로 인코딩돼 있어 grep으로 잡히지 않는다.
// JWT를 찾아 payload를 디코딩한 뒤 role을 확인한다.
const JWT = /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g;
// 신형 Supabase 비밀 키 형식
const SECRET_KEY = /sb_secret_[A-Za-z0-9_-]{8,}/g;

export function jwtRole(token) {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString('utf8'));
    return payload.role ?? null;
  } catch {
    return null;
  }
}

export function scanText(text) {
  const found = [];
  for (const [token] of text.matchAll(JWT)) {
    if (jwtRole(token) === 'service_role') found.push({ kind: 'service_role JWT', token });
  }
  for (const [token] of text.matchAll(SECRET_KEY)) {
    found.push({ kind: 'sb_secret key', token });
  }
  return found;
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

export function scanDir(dir) {
  return walk(dir).flatMap((file) =>
    scanText(fs.readFileSync(file, 'utf8')).map((f) => ({ ...f, file: path.relative(dir, file) }))
  );
}

// 로그에 키 전체가 남지 않도록 앞부분만 보여 준다.
export function mask(token) {
  return `${token.slice(0, 12)}…(${token.length}자)`;
}
