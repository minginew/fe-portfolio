import { afterEach, describe, expect, it, vi } from 'vitest';
import { getKST, getTimeDifference } from '@util/date';

describe('getKST', () => {
  it('UTC 타임스탬프를 KST 날짜/시간으로 나눈다', () => {
    // 2025-09-23T01:02:03Z = KST 2025-09-23 10:02:03
    expect(getKST('2025-09-23T01:02:03Z')).toEqual({ data: '2025-09-23', time: '10:02:03' });
  });

  it('날짜가 KST 기준으로 넘어간다', () => {
    // 2025-09-23T20:00:00Z = KST 2025-09-24 05:00:00
    expect(getKST('2025-09-23T20:00:00Z')?.data).toBe('2025-09-24');
  });

  it('빈 문자열이면 null', () => {
    expect(getKST('')).toBeNull();
  });
});

describe('getTimeDifference', () => {
  afterEach(() => vi.useRealTimers());

  it('현재 시각과의 차이를 시간 단위로 반환한다', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-09-23T12:00:00Z'));
    expect(getTimeDifference('2025-09-23T00:00:00Z')).toBe(12);
  });
});
