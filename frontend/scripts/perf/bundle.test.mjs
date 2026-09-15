// @vitest-environment node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { afterAll, describe, expect, it } from 'vitest';
import { TYPE_OF, stripHash, measure, renderBundleTable } from './bundle-core.mjs';

const tmpDirs = [];

function makeDist(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bundle-size-test-'));
  tmpDirs.push(root);
  const assets = path.join(root, 'assets');
  fs.mkdirSync(assets, { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(assets, name), content);
  }
  return root;
}

const baseDist = makeDist({
  'index-AAAAAAAA.js': 'a'.repeat(1000),
  'style-CCCCCCCC.css': 'body{color:red}'.repeat(20),
  'font-DDDDDDDD.woff2': 'f'.repeat(500),
});
const headDist = makeDist({
  'index-BBBBBBBB.js': 'a'.repeat(2000),
  'style-CCCCCCCC.css': 'body{color:red}'.repeat(20),
  'font-DDDDDDDD.woff2': 'f'.repeat(500),
});

afterAll(() => {
  for (const dir of tmpDirs) fs.rmSync(dir, { recursive: true, force: true });
});

describe('stripHash', () => {
  it('해시를 제거해 논리 파일명으로', () => expect(stripHash('index-CF_7sixD.js')).toBe('index.js'));
});

describe('TYPE_OF', () => {
  it('확장자로 유형을 분류한다', () => {
    expect(TYPE_OF('index-AAAAAAAA.js')).toBe('JS');
    expect(TYPE_OF('style-CCCCCCCC.css')).toBe('CSS');
    expect(TYPE_OF('font-DDDDDDDD.woff2')).toBe('font');
  });
});

describe('measure', () => {
  it('유형별 gzip 합계를 집계한다', () => {
    const base = measure(baseDist);
    const head = measure(headDist);
    expect(base.byType.JS).toBe(zlib.gzipSync('a'.repeat(1000)).length);
    expect(head.byType.JS).toBe(zlib.gzipSync('a'.repeat(2000)).length);
    expect(head.byType.JS).toBeGreaterThan(base.byType.JS);
    expect(base.files['index.js']).toBe(zlib.gzipSync('a'.repeat(1000)).length);
    expect(head.files['index.js']).toBe(zlib.gzipSync('a'.repeat(2000)).length);
  });
});

describe('renderBundleTable', () => {
  it('head의 JS가 더 크면 JS 행에 양수 Δ를 출력한다', () => {
    const table = renderBundleTable(measure(baseDist), measure(headDist));
    const jsRow = table.split('\n').find((line) => line.startsWith('| JS |'));
    expect(jsRow).toBeDefined();
    expect(jsRow).toMatch(/\| \+\d+\.\d \|$/);
  });
});
