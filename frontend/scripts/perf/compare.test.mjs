// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { checkBudget, delta, renderTable } from './compare-core.mjs';

describe('delta', () => {
  it('head - base', () => expect(delta(100, 130)).toBe(30));
  it('한쪽이 NaN이면 NaN', () => expect(delta(NaN, 1)).toBeNaN());
});

describe('renderTable', () => {
  it('부호 있는 Δ를 출력한다', () => {
    const base = { portfolio: { LCP: 5000, FCP: 4000, TBT: 10, CLS: 0, totalKB: 100, jsKB: 50, fontKB: 10, imgKB: 5 } };
    const head = {
      portfolio: { LCP: 4500, FCP: 4100, TBT: 10, CLS: 0.01, totalKB: 90, jsKB: 40, fontKB: 10, imgKB: 5 },
    };
    const out = renderTable(base, head);
    expect(out).toContain('| portfolio | 5000 | 4500 | -500 | 4000 | 4100 | +100 |');
    expect(out).toContain('0.000 | 0.010 | +0.010');
  });
  it('base에 없는 페이지는 n/a', () => {
    const out = renderTable({}, { p: { LCP: 1 } });
    expect(out).toContain('| p | n/a | 1 | n/a |');
  });
});

describe('checkBudget', () => {
  const budget = {
    gate: { fail: ['totalKB'], warn: ['LCP'] },
    pages: { portfolio: { LCP: 6000, totalKB: 1000 } },
  };
  it('예산 내면 둘 다 빈 배열', () =>
    expect(checkBudget({ portfolio: { LCP: 5000, totalKB: 900 } }, budget)).toEqual({ fail: [], warn: [] }));
  it('전송량 초과는 fail', () =>
    expect(checkBudget({ portfolio: { LCP: 5000, totalKB: 1100 } }, budget)).toEqual({
      fail: ['portfolio: totalKB 1100 > budget 1000'],
      warn: [],
    }));
  it('LCP 초과는 warn (게이트 아님)', () =>
    expect(checkBudget({ portfolio: { LCP: 6500, totalKB: 900 } }, budget)).toEqual({
      fail: [],
      warn: ['portfolio: LCP 6500 > budget 6000'],
    }));
  it('gate에 없는 지표는 무시', () => {
    const b = { gate: { fail: [], warn: [] }, pages: { portfolio: { LCP: 6000 } } };
    expect(checkBudget({ portfolio: { LCP: 9999 } }, b)).toEqual({ fail: [], warn: [] });
  });
  it('예산에 없는 페이지는 무시', () =>
    expect(checkBudget({ other: { LCP: 99999, totalKB: 99999 } }, budget)).toEqual({ fail: [], warn: [] }));
});
