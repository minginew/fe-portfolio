// @vitest-environment node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { jwtRole, mask, scanDir, scanText } from './secret-scan-core.mjs';

const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
const fakeJwt = (role) => `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ iss: 'supabase', role })}.c2lnbmF0dXJl`;

const tmpDirs = [];
afterAll(() => tmpDirs.forEach((d) => fs.rmSync(d, { recursive: true, force: true })));

describe('jwtRole', () => {
  it('payload의 role을 읽는다', () => {
    expect(jwtRole(fakeJwt('anon'))).toBe('anon');
    expect(jwtRole(fakeJwt('service_role'))).toBe('service_role');
  });

  it('디코딩할 수 없으면 null', () => {
    expect(jwtRole('eyJx.eyJ!!.abc')).toBeNull();
  });
});

describe('scanText', () => {
  it('anon 키는 통과시킨다', () => {
    expect(scanText(`const key="${fakeJwt('anon')}"`)).toEqual([]);
  });

  it('service_role 키를 찾는다', () => {
    const found = scanText(`a="${fakeJwt('anon')}",b="${fakeJwt('service_role')}"`);
    expect(found).toHaveLength(1);
    expect(found[0].kind).toBe('service_role JWT');
  });

  it('문자열 service_role만으로는 걸리지 않는다', () => {
    expect(scanText('role === "service_role"')).toEqual([]);
  });

  it('신형 sb_secret_ 키를 찾는다', () => {
    expect(scanText('k="sb_secret_abcdEFGH1234_xyz"')[0].kind).toBe('sb_secret key');
  });
});

describe('scanDir', () => {
  it('하위 폴더까지 검사하고 파일 경로를 남긴다', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'secret-scan-test-'));
    tmpDirs.push(root);
    fs.mkdirSync(path.join(root, 'assets'));
    fs.writeFileSync(path.join(root, 'index.html'), '<html></html>');
    fs.writeFileSync(path.join(root, 'assets', 'index.js'), `x="${fakeJwt('service_role')}"`);

    const found = scanDir(root);
    expect(found).toHaveLength(1);
    expect(found[0].file).toBe(path.join('assets', 'index.js'));
  });
});

describe('mask', () => {
  it('키 전체를 출력하지 않는다', () => {
    const token = fakeJwt('service_role');
    expect(mask(token)).not.toContain(token);
  });
});
