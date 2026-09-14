// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { median, fmt, summarize } from './lib.mjs';

describe('median', () => {
  it('홀수 개면 가운데 값', () => expect(median([3, 1, 2])).toBe(2));
  it('짝수 개면 가운데 두 값의 평균', () => expect(median([10, 20])).toBe(15));
  it('NaN·undefined는 무시', () => expect(median([NaN, 5, undefined, 7])).toBe(6));
  it('유효값이 없으면 NaN', () => expect(median([NaN])).toBeNaN());
});

describe('fmt', () => {
  it('숫자는 자릿수대로', () => expect(fmt(1234.56)).toBe('1235'));
  it('NaN은 n/a', () => expect(fmt(NaN)).toBe('n/a'));
});

describe('summarize', () => {
  it('페이지별 중앙값과 n', () => {
    const s = summarize({
      p: [
        { LCP: 100, FCP: 1 },
        { LCP: 300, FCP: 2 },
        { LCP: 200, FCP: 3 },
      ],
    });
    expect(s.p.n).toBe(3);
    expect(s.p.LCP).toBe(200);
    expect(s.p.FCP).toBe(2);
    expect(s.p.TBT).toBeNaN();
  });
});
